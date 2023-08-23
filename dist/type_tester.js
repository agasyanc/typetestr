"use strict";
var TypeTestr = /** @class */ (function () {
    function TypeTestr(className, defaultFontSize) {
        if (className === void 0) { className = "typetestr"; }
        if (defaultFontSize === void 0) { defaultFontSize = 18; }
        this.items = [];
        this.items = this.findAndInit(className, defaultFontSize);
    }
    TypeTestr.prototype.init = function (className, defaultFontSize) {
        if (className === void 0) { className = "typetestr"; }
        if (defaultFontSize === void 0) { defaultFontSize = 18; }
        this.items = [];
        this.items = this.findAndInit(className, defaultFontSize);
    };
    TypeTestr.prototype.findAndInit = function (className, defaultFontSize) {
        var items = this.find(className);
        return this.initItems(items, defaultFontSize);
    };
    TypeTestr.prototype.find = function (className) {
        var items = document.getElementsByClassName(className);
        return items;
    };
    TypeTestr.prototype.initItems = function (items, defaultFontSize) {
        var testrItems = [];
        for (var i = 0; i < items.length; i++) {
            var item = new TestrItem(items[i], defaultFontSize);
            testrItems.push(item);
        }
        return testrItems;
    };
    return TypeTestr;
}());
var TestrItem = /** @class */ (function () {
    // element:HTMLElement;
    function TestrItem(element, defaultFontSize) {
        var wrapper = this.wrapElement(element);
        element.setAttribute("contenteditable", "true");
        element.style.fontSize = defaultFontSize.toString() + "px";
        var range = document.createElement("input");
        range.type = "range";
        range.min = "12";
        range.max = "100";
        range.value = defaultFontSize.toString();
        range.oninput = function () {
            element.style.fontSize = range.value + "px";
        };
        wrapper.insertBefore(range, element);
    }
    TestrItem.prototype.wrapElement = function (element) {
        var wrapper = document.createElement("div");
        wrapper.classList.add("typetestr-wrapper");
        element.parentNode.insertBefore(wrapper, element);
        wrapper.appendChild(element);
        return wrapper;
    };
    return TestrItem;
}());
var typetester = new TypeTestr();
