export default class TypeTestr {
    constructor(className = "typetestr", defaultFontSize = 18) {
        this.items = [];
        this.items = this.findAndInit(className, defaultFontSize);
    }
    init(className = "typetestr", defaultFontSize = 18) {
        this.items = [];
        this.items = this.findAndInit(className, defaultFontSize);
    }
    findAndInit(className, defaultFontSize) {
        let items = this.find(className);
        return this.initItems(items, defaultFontSize);
    }
    find(className) {
        let items = document.getElementsByClassName(className);
        return items;
    }
    initItems(items, defaultFontSize) {
        let testrItems = [];
        for (let i = 0; i < items.length; i++) {
            let item = new TestrItem(items[i], defaultFontSize);
            testrItems.push(item);
        }
        return testrItems;
    }
}
class TestrItem {
    // element:HTMLElement;
    constructor(element, defaultFontSize) {
        let wrapper = this.wrapElement(element);
        element.setAttribute("contenteditable", "true");
        element.style.fontSize = defaultFontSize.toString() + "px";
        let range = document.createElement("input");
        range.type = "range";
        range.min = "12";
        range.max = "100";
        range.value = defaultFontSize.toString();
        range.oninput = function () {
            element.style.fontSize = range.value + "px";
        };
        wrapper.insertBefore(range, element);
    }
    wrapElement(element) {
        let wrapper = document.createElement("div");
        wrapper.classList.add("typetestr-wrapper");
        element.parentNode.insertBefore(wrapper, element);
        wrapper.appendChild(element);
        return wrapper;
    }
}
