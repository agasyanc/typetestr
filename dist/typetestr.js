var f = Object.defineProperty;
var h = (d, t, e) => t in d ? f(d, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : d[t] = e;
var o = (d, t, e) => (h(d, typeof t != "symbol" ? t + "" : t, e), e);
class u {
  constructor(t, e, s) {
    o(this, "isDrag", !1);
    let n = document.createElement("div");
    n.classList.add("tt-range");
    let l = document.createElement("div");
    l.classList.add("tt-range__knob");
    let a = document.createElement("div");
    a.classList.add("tt-range__filler"), a.style.width = e * 100 + "%", n.addEventListener("pointerdown", (i) => {
      n.setPointerCapture(i.pointerId);
      let r = (i.clientX - n.offsetLeft) / n.offsetWidth;
      a.style.width = r * 100 + "%", this.isDrag = !0, s(r);
    }), n.addEventListener("pointermove", (i) => {
      if (this.isDrag) {
        let r = (i.clientX - n.offsetLeft) / n.offsetWidth;
        r >= 0 && r <= 1 && (a.style.width = r * 100 + "%", s(r));
      }
    }), n.addEventListener("pointerup", (i) => {
      n.releasePointerCapture(i.pointerId), this.isDrag = !1;
    }), n.appendChild(a), a.appendChild(l), t.appendChild(n);
  }
}
class m {
  // element:HTMLElement;
  constructor(t, e = 12, s = 144) {
    let n = this.wrapElement(t, "tt-element");
    t.classList.add("tt-element__content"), t.setAttribute("contenteditable", "true");
    const l = window.getComputedStyle(t).fontSize, a = parseFloat(l);
    let i = document.createElement("div");
    i.classList.add("tt-element__range"), n.insertBefore(i, t);
    const r = (a - e) / (s - e);
    new u(i, r, (c) => {
      const p = (s - e) * c + e;
      t.style.fontSize = p + "px";
    });
  }
  wrapElement(t, e) {
    let s = document.createElement("div");
    return s.classList.add(e), t.parentNode.insertBefore(s, t), s.appendChild(t), s;
  }
}
class w {
  constructor(t = "typetestr") {
    o(this, "items", []);
    this.items = this.findAndInit(t);
  }
  init(t = "typetestr") {
    this.items = [], this.items = this.findAndInit(t);
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
      let n = new m(t[s]);
      e.push(n);
    }
    return e;
  }
}
export {
  w as default
};
