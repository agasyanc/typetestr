var l = Object.defineProperty;
var o = (s, t, e) => t in s ? l(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var a = (s, t, e) => (o(s, typeof t != "symbol" ? t + "" : t, e), e);
class u {
  constructor(t = "typetestr") {
    a(this, "items", []);
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
    for (let n = 0; n < t.length; n++) {
      let r = new c(t[n]);
      e.push(r);
    }
    return e;
  }
}
class c {
  // element:HTMLElement;
  constructor(t) {
    let e = this.wrapElement(t, "tt-element");
    t.classList.add("tt-element__content"), t.setAttribute("contenteditable", "true");
    const n = window.getComputedStyle(t).fontSize, r = parseFloat(n);
    let i = document.createElement("div");
    i.classList.add("tt-element__range"), e.insertBefore(i, t), new m(i, r, (d) => {
      t.style.fontSize = d;
    });
  }
  wrapElement(t, e) {
    let n = document.createElement("div");
    return n.classList.add(e), t.parentNode.insertBefore(n, t), n.appendChild(t), n;
  }
}
class m {
  constructor(t, e, n) {
    let r = document.createElement("div");
    r.classList.add("tt-range");
    let i = document.createElement("input");
    i.classList.add("tt-range__input"), i.type = "range", i.min = "12", i.max = "74", i.value = e.toString(), i.oninput = function() {
      n && n(i.value + "px");
    }, r.appendChild(i), t.appendChild(r);
  }
}
export {
  u as default
};
