var f = Object.defineProperty;
var g = (d, t, e) => t in d ? f(d, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : d[t] = e;
var a = (d, t, e) => (g(d, typeof t != "symbol" ? t + "" : t, e), e);
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
    const r = this.abortController.signal;
    this.range.addEventListener("keydown", (i) => {
      if (i.key === "ArrowLeft" || i.key === "ArrowRight") {
        let o = parseFloat(this.knob.style.left) / 100;
        const h = i.shiftKey ? 0.1 : 0.01;
        i.key === "ArrowLeft" && (o -= h), i.key === "ArrowRight" && (o += h), o < 0 && (o = 0), o > 1 && (o = 1), this.set_percent(o), this.call(o);
      }
    }, { signal: r }), this.range.addEventListener("pointerdown", (i) => {
      this.range.setPointerCapture(i.pointerId), this.set_width(i.offsetX), this.isDrag = !0;
    }, { signal: r }), this.range.addEventListener("pointermove", (i) => {
      this.isDrag && this.set_width(i.offsetX);
    }, { signal: r }), this.range.addEventListener("pointerup", (i) => {
      try {
        this.range.releasePointerCapture(i.pointerId);
      } catch {
      }
      this.isDrag = !1;
    }, { signal: r }), this.range.addEventListener("wheel", (i) => {
      const o = i.shiftKey ? -i.deltaX / 100 : -i.deltaX / 1e3;
      let h = parseFloat(this.knob.style.left) / 100 + o;
      h < 0 && (h = 0), h > 1 && (h = 1), this.set_percent(h), this.call(h), i.preventDefault();
    }, { signal: r, passive: !1 }), this.range.appendChild(this.filler), this.filler.appendChild(this.knob), this.range_container.appendChild(l), this.range_container.appendChild(this.range), t.appendChild(this.range_container);
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
const c = class c {
  constructor(t, e = {}) {
    a(this, "feats", []);
    a(this, "ranges", []);
    a(this, "wrapper", null);
    a(this, "range_element", null);
    a(this, "hadContentEditable", !1);
    a(this, "isDestroyed", !1);
    this.element = t;
    const s = c.instances.get(t);
    if (s && s.destroy(), c.cleanOrphanedDom(t), c.instances.set(t, this), this.hadContentEditable = t.hasAttribute("contenteditable"), e.wrap && (this.wrapper = this.wrapElement(t, "tt-element")), this.element.classList.add("tt-element__content"), this.element.setAttribute("contenteditable", "true"), this.element.dataset.typetestr) {
      const n = this.element.dataset.typetestr.split(",");
      for (const l of n) {
        const r = l.split(":"), i = new m(
          r[0].trim(),
          parseFloat(r[1] || "1"),
          parseFloat(r[2] || "1000"),
          parseFloat(r[3] || "20")
        );
        this.feats.push(i);
      }
    } else
      this.feats.push(new m("size", 16, 100, 16));
    this.range_element = document.createElement("div"), this.range_element.classList.add("tt-element__range-list"), this.wrapper ? this.wrapper.insertBefore(this.range_element, this.element) : this.element.parentNode && this.element.parentNode.insertBefore(this.range_element, this.element);
    for (let n of this.feats) {
      const l = new u(
        this.range_element,
        n.get_percent(),
        n.get_human_name(),
        (r) => this.update(n, r)
      );
      this.ranges.push(l), this.update(n);
    }
  }
  static getInstance(t) {
    return c.instances.get(t);
  }
  static cleanOrphanedDom(t) {
    var s;
    const e = t.parentElement;
    e && e.classList.contains("tt-element") && (e.querySelectorAll(".tt-element__range-list").forEach((l) => l.remove()), e.parentNode && (e.parentNode.insertBefore(t, e), e.remove())), (s = t.previousElementSibling) != null && s.classList.contains("tt-element__range-list") && t.previousElementSibling.remove(), t.classList.remove("tt-element__content");
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
      this.ranges = [], this.range_element && this.range_element.parentNode && (this.range_element.remove(), this.range_element = null), this.wrapper && this.wrapper.parentNode && (this.wrapper.parentNode.insertBefore(this.element, this.wrapper), this.wrapper.remove(), this.wrapper = null), this.element.classList.remove("tt-element__content"), this.hadContentEditable || this.element.removeAttribute("contenteditable"), c.instances.delete(this.element);
    }
  }
};
a(c, "instances", /* @__PURE__ */ new WeakMap());
let p = c;
class v {
  constructor(t = "typetestr", e = {}) {
    a(this, "items", []);
    this.items = this.findAndInit(t, e);
  }
  findAndInit(t, e = {}) {
    let s = this.find(t);
    return this.initItems(s, e);
  }
  find(t) {
    return document.getElementsByClassName(t);
  }
  initItems(t, e = {}) {
    let s = [];
    for (let n = 0; n < t.length; n++) {
      let l = new p(t[n], e);
      s.push(l);
    }
    return s;
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
  v as TypeTestr,
  v as default
};
