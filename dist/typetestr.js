var p = Object.defineProperty;
var f = (r, t, e) => t in r ? p(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var o = (r, t, e) => (f(r, typeof t != "symbol" ? t + "" : t, e), e);
class c {
  constructor(t, e, s, i) {
    o(this, "known_human_names", {
      wght: "Weight",
      wdth: "Width",
      ital: "Italic",
      slnt: "Slant",
      opsz: "Optical Size",
      size: "Size"
    });
    this.name = t, this.min = e, this.max = s, this.value = i;
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
class m {
  constructor(t, e, s, i) {
    o(this, "isDrag", !1);
    o(this, "range");
    o(this, "knob");
    o(this, "filler");
    this.call = i;
    const h = document.createElement("div");
    h.classList.add("tt-range__container");
    const d = document.createElement("div");
    d.classList.add("tt-range__title"), d.textContent = s, this.range = document.createElement("div"), this.range.classList.add("tt-range"), this.range.tabIndex = 0, this.knob = document.createElement("div"), this.knob.classList.add("tt-range__knob"), this.filler = document.createElement("div"), this.filler.classList.add("tt-range__filler"), this.set_percent(e), this.range.style.touchAction = "none", this.range.addEventListener("keydown", (n) => {
      if (n.key == "ArrowLeft" || n.key == "ArrowRight") {
        let a = parseFloat(this.knob.style.left) / 100;
        const l = n.shiftKey ? 0.1 : 0.01;
        n.key == "ArrowLeft" && (a -= l), n.key == "ArrowRight" && (a += l), a < 0 && (a = 0), a > 1 && (a = 1), this.set_percent(a), this.call(a);
      }
    }), this.range.addEventListener("pointerdown", (n) => {
      this.range.setPointerCapture(n.pointerId), this.set_width(n.offsetX), this.isDrag = !0;
    }), this.range.addEventListener("pointermove", (n) => {
      this.isDrag && this.set_width(n.offsetX);
    }), this.range.addEventListener("pointerup", (n) => {
      this.range.releasePointerCapture(n.pointerId), this.isDrag = !1;
    }), this.range.addEventListener("wheel", (n) => {
      const a = n.shiftKey ? -n.deltaX / 100 : -n.deltaX / 1e3;
      let l = parseFloat(this.knob.style.left) / 100 + a;
      l < 0 && (l = 0), l > 1 && (l = 1), this.set_percent(l), this.call(l), n.preventDefault();
    }), this.range.appendChild(this.filler), this.filler.appendChild(this.knob), h.appendChild(d), h.appendChild(this.range), t.appendChild(h);
  }
  set_width(t) {
    const e = parseFloat(window.getComputedStyle(this.range).paddingLeft), s = parseFloat(window.getComputedStyle(this.range).paddingRight);
    let i = (t - e) / (this.range.offsetWidth - s - s);
    i >= 0 && i <= 1 && (this.set_percent(i), this.call(i));
  }
  set_percent(t) {
    t < 0 && (t = 0);
    const e = 100 - t * 100 + "%";
    this.filler.style.background = "linear-gradient(to left, #c0c0c0 " + e + ", blue " + e + ")", this.knob.style.left = t * 100 + "%";
  }
}
class g {
  constructor(t) {
    o(this, "feats", []);
    this.element = t;
    let e = this.wrapElement(t, "tt-element");
    if (this.element.classList.add("tt-element__content"), this.element.setAttribute("contenteditable", "true"), this.element.dataset.typetestr) {
      const i = this.element.dataset.typetestr.split(",");
      for (const h of i) {
        const d = h.split(":"), n = new c(d[0].trim(), parseFloat(d[1] || "1"), parseFloat(d[2] || "1000"), parseFloat(d[3] || "20"));
        this.feats.push(n);
      }
    } else
      this.feats.push(new c("size", 16, 100, 16));
    let s = document.createElement("div");
    s.classList.add("tt-element__range-list"), e.insertBefore(s, this.element);
    for (let i of this.feats)
      new m(s, i.get_percent(), i.get_human_name(), (h) => this.update(i, h)), this.update(i);
  }
  update(t, e = null) {
    e && t.set_percent(e);
    let s = [];
    for (const i of this.feats)
      i.name == "size" ? this.element.style.fontSize = i.value + "px" : s.push(`"${i.name}" ${i.value}`);
    this.element.style.fontVariationSettings = s.join(", ");
  }
  wrapElement(t, e) {
    let s = document.createElement("div");
    return s.classList.add(e), t.parentNode.insertBefore(s, t), s.appendChild(t), s;
  }
}
class _ {
  constructor(t = "typetestr") {
    o(this, "items", []);
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
      let i = new g(t[s]);
      e.push(i);
    }
    return e;
  }
}
export {
  _ as default
};
