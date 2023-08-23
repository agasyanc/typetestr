class TypeTestr {
  items:TestrItem[]=[];
  constructor(className:string="typetestr", defaultFontSize:number=18){
    this.items = this.findAndInit(className, defaultFontSize);
  }
  init(className:string="typetestr", defaultFontSize:number=18){
    this.items = [];
    this.items = this.findAndInit(className, defaultFontSize);
  }
  findAndInit(className:string, defaultFontSize:number):TestrItem[] {
    let items = this.find(className);
    return this.initItems(items, defaultFontSize);

  }
  find(className:string){
    let items: HTMLCollectionOf<Element> = document.getElementsByClassName(className);
    return items;
  }
  initItems(items:HTMLCollectionOf<Element>, defaultFontSize:number):TestrItem[]{
    let testrItems:TestrItem[] = [];
    for(let i = 0; i < items.length; i++){
      let item = new TestrItem(items[i] as HTMLElement, defaultFontSize);
      testrItems.push(item);
    }
    return testrItems;
  }
}

class TestrItem{
  // element:HTMLElement;
  constructor(element:HTMLElement, defaultFontSize:number) {
    let wrapper = this.wrapElement(element);

    element.setAttribute("contenteditable", "true")
    element.style.fontSize = defaultFontSize.toString() + "px";

    let range = document.createElement("input");
    range.type = "range";
    range.min = "12";
    range.max = "100";
    range.value = defaultFontSize.toString();

    range.oninput = function(){
      element.style.fontSize = range.value + "px";
    }

    wrapper.insertBefore(range, element)
  }
  wrapElement(element:HTMLElement){
    let wrapper = document.createElement("div");
    wrapper.classList.add("typetestr-wrapper");

    element.parentNode!.insertBefore(wrapper, element);
    wrapper.appendChild(element);
    return wrapper;
  }
}

let typetester = new TypeTestr();