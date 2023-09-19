var m = Object.defineProperty;
var u = (r, t, e) => t in r ? m(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var o = (r, t, e) => (u(r, typeof t != "symbol" ? t + "" : t, e), e);
class p {
  constructor(t, e, s) {
    o(this, "isDrag", !1);
    let n = document.createElement("div");
    n.classList.add("tt-range");
    let a = document.createElement("div");
    a.classList.add("tt-range__knob");
    let d = document.createElement("div");
    d.classList.add("tt-range__filler"), d.style.width = e * 100 + "%", n.addEventListener("mousedown", (l) => {
      let i = (l.clientX - n.offsetLeft) / n.offsetWidth;
      d.style.width = i * 100 + "%", this.isDrag = !0, s(i);
    }), document.addEventListener("mousemove", (l) => {
      if (this.isDrag) {
        let i = (l.clientX - n.offsetLeft) / n.offsetWidth;
        i >= 0 && i <= 1 && (d.style.width = i * 100 + "%", s(i));
      }
    }), document.addEventListener("mouseup", () => {
      this.isDrag = !1;
    }), n.appendChild(d), d.appendChild(a), t.appendChild(n);
  }
}
class h {
  // element:HTMLElement;
  constructor(t, e = 12, s = 144) {
    let n = this.wrapElement(t, "tt-element");
    t.classList.add("tt-element__content"), t.setAttribute("contenteditable", "true");
    const a = window.getComputedStyle(t).fontSize, d = parseFloat(a);
    let l = document.createElement("div");
    l.classList.add("tt-element__range"), n.insertBefore(l, t);
    const i = (d - e) / (s - e);
    new p(l, i, (c) => {
      const f = (s - e) * c + e;
      t.style.fontSize = f + "px";
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
      let n = new h(t[s]);
      e.push(n);
    }
    return e;
  }
}
export {
  w as default
};
