export default class TypeTestr {
  items:TestrItem[]=[];
  constructor(className:string="typetestr"){
    this.items = this.findAndInit(className);
  }
  init(className:string="typetestr"){
    this.items = [];
    this.items = this.findAndInit(className);
  }
  findAndInit(className:string):TestrItem[] {
    let items = this.find(className);
    return this.initItems(items);
  }
  find(className:string){
    let items: HTMLCollectionOf<Element> = document.getElementsByClassName(className);
    return items;
  }
  initItems(items:HTMLCollectionOf<Element>):TestrItem[]{
    let testrItems:TestrItem[] = [];
    for(let i = 0; i < items.length; i++){
      let item = new TestrItem(items[i] as HTMLElement);
      testrItems.push(item);
    }
    return testrItems;
  }
}

class TestrItem{
  // element:HTMLElement;
  constructor(element:HTMLElement) {
    let wrapper = this.wrapElement(element, "tt-element");
    element.classList.add("tt-element__content");
    
    element.setAttribute("contenteditable", "true")

    const elInitFontSizeStr = window.getComputedStyle(element).fontSize;
    const elInitFontSize = parseFloat(elInitFontSizeStr); 
    

    let range_element = document.createElement("div");
    range_element.classList.add("tt-element__range");
    wrapper.insertBefore(range_element, element)
    new TestrRange(range_element, elInitFontSize, (value:string)=>{
      element.style.fontSize = value;
    });
    
    
  }
  wrapElement(elementToWrap:HTMLElement, wrapperClassName:string){
    let wrapper = document.createElement("div");
    wrapper.classList.add(wrapperClassName);

    elementToWrap.parentNode!.insertBefore(wrapper, elementToWrap);
    wrapper.appendChild(elementToWrap);
    return wrapper;
  }
}
class TestrRange {
  constructor(range_container:HTMLElement, fontSize:number, call:Function) {
    let range = document.createElement("div");
    range.classList.add("tt-range");
    let input = document.createElement("input");
    input.classList.add("tt-range__input");
    input.type = "range";
    input.min = "12";
    input.max = "74";
    input.value = fontSize.toString();

    input.oninput = function(){
      if (call) call(input.value + "px")
    }
    range.appendChild(input);
    range_container.appendChild(range);
  }
}