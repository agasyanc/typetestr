var f = Object.defineProperty;
var g = (o, t, e) => t in o ? f(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[t] = e;
var a = (o, t, e) => (g(o, typeof t != "symbol" ? t + "" : t, e), e);
class m {
  constructor(t, e, s, n) {
    a(this, "known_human_names", {
      wght: "Weight",
      wdth: "Width",
      ital: "Italic",
      slnt: "Slant",
      opsz: "Optical Size",
      size: "Size"
    });
    this.name = t, this.min = e, this.max = s, this.value = n;
  }
  set_percent(t) {
    this.value = (this.max - this.min) * t + this.min;
  }
  get_percent() {
    return (this.value - this.min) / (this.max - this.min);
  }
  get_human_name() {
    return this.known_human_names[this.name] || this.name;
  }
}
class u {
  constructor(t, e, s, n) {
    a(this, "isDrag", !1);
    a(this, "range_container");
    a(this, "range");
    a(this, "knob");
    a(this, "filler");
    a(this, "abortController", new AbortController());
    this.call = n, this.range_container = document.createElement("div"), this.range_container.classList.add("tt-range__container");
    const l = document.createElement("div");
    l.classList.add("tt-range__title"), l.textContent = s, this.range = document.createElement("div"), this.range.classList.add("tt-range"), this.range.tabIndex = 0, this.knob = document.createElement("div"), this.knob.classList.add("tt-range__knob"), this.filler = document.createElement("div"), this.filler.classList.add("tt-range__filler"), this.set_percent(e), this.range.style.touchAction = "none";
    const c = this.abortController.signal;
    this.range.addEventListener("keydown", (i) => {
      if (i.key === "ArrowLeft" || i.key === "ArrowRight") {
        let r = parseFloat(this.knob.style.left) / 100;
        const h = i.shiftKey ? 0.1 : 0.01;
        i.key === "ArrowLeft" && (r -= h), i.key === "ArrowRight" && (r += h), r < 0 && (r = 0), r > 1 && (r = 1), this.set_percent(r), this.call(r);
      }
    }, { signal: c }), this.range.addEventListener("pointerdown", (i) => {
      this.range.setPointerCapture(i.pointerId), this.set_width(i.offsetX), this.isDrag = !0;
    }, { signal: c }), this.range.addEventListener("pointermove", (i) => {
      this.isDrag && this.set_width(i.offsetX);
    }, { signal: c }), this.range.addEventListener("pointerup", (i) => {
      try {
        this.range.releasePointerCapture(i.pointerId);
      } catch {
      }
      this.isDrag = !1;
    }, { signal: c }), this.range.addEventListener("wheel", (i) => {
      const r = i.shiftKey ? -i.deltaX / 100 : -i.deltaX / 1e3;
      let h = parseFloat(this.knob.style.left) / 100 + r;
      h < 0 && (h = 0), h > 1 && (h = 1), this.set_percent(h), this.call(h), i.preventDefault();
    }, { signal: c, passive: !1 }), this.range.appendChild(this.filler), this.filler.appendChild(this.knob), this.range_container.appendChild(l), this.range_container.appendChild(this.range), t.appendChild(this.range_container);
  }
  set_width(t) {
    const e = parseFloat(window.getComputedStyle(this.range).paddingLeft), s = parseFloat(window.getComputedStyle(this.range).paddingRight);
    let n = (t - e) / (this.range.offsetWidth - e - s);
    n >= 0 && n <= 1 && (this.set_percent(n), this.call(n));
  }
  set_percent(t) {
    t < 0 && (t = 0), t > 1 && (t = 1);
    const e = 100 - t * 100 + "%";
    this.filler.style.background = `linear-gradient(to left, var(--tt-track-bg, #c0c0c0) ${e}, var(--tt-track-fill, #2563eb) ${e})`, this.knob.style.left = t * 100 + "%";
  }
  destroy() {
    this.abortController.abort(), this.isDrag = !1, this.range_container.remove();
  }
}
const d = class d {
  constructor(t) {
    a(this, "feats", []);
    a(this, "ranges", []);
    a(this, "wrapper", null);
    a(this, "range_element", null);
    a(this, "hadContentEditable", !1);
    a(this, "isDestroyed", !1);
    this.element = t;
    const e = d.instances.get(t);
    if (e && e.destroy(), d.cleanOrphanedDom(t), d.instances.set(t, this), this.hadContentEditable = t.hasAttribute("contenteditable"), this.wrapper = this.wrapElement(t, "tt-element"), this.element.classList.add("tt-element__content"), this.element.setAttribute("contenteditable", "true"), this.element.dataset.typetestr) {
      const s = this.element.dataset.typetestr.split(",");
      for (const n of s) {
        const l = n.split(":"), c = new m(
          l[0].trim(),
          parseFloat(l[1] || "1"),
          parseFloat(l[2] || "1000"),
          parseFloat(l[3] || "20")
        );
        this.feats.push(c);
      }
    } else
      this.feats.push(new m("size", 16, 100, 16));
    this.range_element = document.createElement("div"), this.range_element.classList.add("tt-element__range-list"), this.wrapper.insertBefore(this.range_element, this.element);
    for (let s of this.feats) {
      const n = new u(
        this.range_element,
        s.get_percent(),
        s.get_human_name(),
        (l) => this.update(s, l)
      );
      this.ranges.push(n), this.update(s);
    }
  }
  static getInstance(t) {
    return d.instances.get(t);
  }
  static cleanOrphanedDom(t) {
    const e = t.parentElement;
    e && e.classList.contains("tt-element") && (e.querySelectorAll(".tt-element__range-list").forEach((n) => n.remove()), e.parentNode && (e.parentNode.insertBefore(t, e), e.remove())), t.classList.remove("tt-element__content");
  }
  update(t, e = null) {
    if (this.isDestroyed)
      return;
    t && e !== null && e !== void 0 && t.set_percent(e);
    let s = [];
    for (const n of this.feats)
      n.name === "size" ? this.element.style.fontSize = n.value + "px" : s.push(`"${n.name}" ${n.value}`);
    s.length > 0 && (this.element.style.fontVariationSettings = s.join(", ")), t && this.element.dispatchEvent(
      new CustomEvent("typetestr:change", {
        bubbles: !0,
        detail: {
          feat: t.name,
          value: t.value,
          percent: t.get_percent()
        }
      })
    );
  }
  wrapElement(t, e) {
    let s = document.createElement("div");
    return s.classList.add(e), t.parentNode && t.parentNode.insertBefore(s, t), s.appendChild(t), s;
  }
  destroy() {
    if (!this.isDestroyed) {
      this.isDestroyed = !0;
      for (const t of this.ranges)
        t.destroy();
      this.ranges = [], this.range_element && this.range_element.parentNode && (this.range_element.remove(), this.range_element = null), this.wrapper && this.wrapper.parentNode && (this.wrapper.parentNode.insertBefore(this.element, this.wrapper), this.wrapper.remove(), this.wrapper = null), this.element.classList.remove("tt-element__content"), this.hadContentEditable || this.element.removeAttribute("contenteditable"), d.instances.delete(this.element);
    }
  }
};
a(d, "instances", /* @__PURE__ */ new WeakMap());
let p = d;
class w {
  constructor(t = "typetestr") {
    a(this, "items", []);
    this.items = this.findAndInit(t);
  }
  findAndInit(t) {
    let e = this.find(t);
    return this.initItems(e);
  }
  find(t) {
    return document.getElementsByClassName(t);
  }
  initItems(t) {
    let e = [];
    for (let s = 0; s < t.length; s++) {
      let n = new p(t[s]);
      e.push(n);
    }
    return e;
  }
  destroy() {
    for (const t of this.items)
      t.destroy();
    this.items = [];
  }
}
export {
  m as Feat,
  p as TestrItem,
  u as TestrRange,
  w as TypeTestr,
  w as default
};
