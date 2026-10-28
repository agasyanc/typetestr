import Feat from "./feat";
import TestrRange from "./testr_range";

export default class TestrItem {
  static instances = new WeakMap<HTMLElement, TestrItem>();

  static getInstance(element: HTMLElement): TestrItem | undefined {
    return TestrItem.instances.get(element);
  }

  feats: Feat[] = [];
  ranges: TestrRange[] = [];
  wrapper: HTMLElement | null = null;
  range_element: HTMLElement | null = null;
  private hadContentEditable: boolean = false;
  private isDestroyed: boolean = false;

  constructor(public element: HTMLElement) {
    // If instance already exists for this element, destroy it cleanly first
    const existing = TestrItem.instances.get(element);
    if (existing) {
      existing.destroy();
    }

    // Clean up any leftover wrapper/ranges from previous runs or restored cache
    TestrItem.cleanOrphanedDom(element);

    TestrItem.instances.set(element, this);

    this.hadContentEditable = element.hasAttribute("contenteditable");

    this.wrapper = this.wrapElement(element, "tt-element");
    this.element.classList.add("tt-element__content");
    this.element.setAttribute("contenteditable", "true");

    if (this.element.dataset.typetestr) {
      const feats_str = this.element.dataset.typetestr.split(',');

      for (const feat_str of feats_str) {
        const feat_params_s = feat_str.split(':');
        const feat = new Feat(
          feat_params_s[0].trim(),
          parseFloat(feat_params_s[1] || "1"),
          parseFloat(feat_params_s[2] || "1000"),
          parseFloat(feat_params_s[3] || "20")
        );
        this.feats.push(feat);
      }
    } else {
      this.feats.push(new Feat("size", 16, 100, 16));
    }

    this.range_element = document.createElement("div");
    this.range_element.classList.add("tt-element__range-list");
    this.wrapper.insertBefore(this.range_element, this.element);

    for (let feat of this.feats) {
      const range = new TestrRange(
        this.range_element,
        feat.get_percent(),
        feat.get_human_name(),
        (percent: number) => this.update(feat, percent)
      );
      this.ranges.push(range);
      this.update(feat);
    }
  }

  static cleanOrphanedDom(element: HTMLElement) {
    const parent = element.parentElement;
    if (parent && parent.classList.contains("tt-element")) {
      const rangeLists = parent.querySelectorAll(".tt-element__range-list");
      rangeLists.forEach((rl) => rl.remove());
      if (parent.parentNode) {
        parent.parentNode.insertBefore(element, parent);
        parent.remove();
      }
    }
    element.classList.remove("tt-element__content");
  }

  update(feat?: Feat, percent: number | null = null) {
    if (this.isDestroyed) return;

    if (feat && percent !== null && percent !== undefined) {
      feat.set_percent(percent);
    }

    let var_strs: string[] = [];
    for (const f of this.feats) {
      if (f.name === "size") {
        this.element.style.fontSize = f.value + "px";
      } else {
        var_strs.push(`"${f.name}" ${f.value}`);
      }
    }
    if (var_strs.length > 0) {
      this.element.style.fontVariationSettings = var_strs.join(", ");
    }

    if (feat) {
      this.element.dispatchEvent(
        new CustomEvent("typetestr:change", {
          bubbles: true,
          detail: {
            feat: feat.name,
            value: feat.value,
            percent: feat.get_percent()
          }
        })
      );
    }
  }

  wrapElement(elementToWrap: HTMLElement, wrapperClassName: string): HTMLElement {
    let wrapper = document.createElement("div");
    wrapper.classList.add(wrapperClassName);

    if (elementToWrap.parentNode) {
      elementToWrap.parentNode.insertBefore(wrapper, elementToWrap);
    }
    wrapper.appendChild(elementToWrap);
    return wrapper;
  }

  destroy() {
    if (this.isDestroyed) return;
    this.isDestroyed = true;

    for (const range of this.ranges) {
      range.destroy();
    }
    this.ranges = [];

    if (this.range_element && this.range_element.parentNode) {
      this.range_element.remove();
      this.range_element = null;
    }

    if (this.wrapper && this.wrapper.parentNode) {
      this.wrapper.parentNode.insertBefore(this.element, this.wrapper);
      this.wrapper.remove();
      this.wrapper = null;
    }

    this.element.classList.remove("tt-element__content");
    if (!this.hadContentEditable) {
      this.element.removeAttribute("contenteditable");
    }

    TestrItem.instances.delete(this.element);
  }
}