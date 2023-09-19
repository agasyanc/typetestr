import TestrRange from "./testr_range";
export default class TestrItem{
  // element:HTMLElement;
  constructor(element:HTMLElement, min:number=12, max:number=144) {
    let wrapper = this.wrapElement(element, "tt-element");
    element.classList.add("tt-element__content");
    
    element.setAttribute("contenteditable", "true")

    const elInitFontSizeStr = window.getComputedStyle(element).fontSize;
    const elInitFontSize = parseFloat(elInitFontSizeStr);
    

    let range_element = document.createElement("div");
    range_element.classList.add("tt-element__range");
    wrapper.insertBefore(range_element, element);
    const initPercent = (elInitFontSize-min)/(max-min);
     
    new TestrRange(range_element, initPercent, (percent:number)=>{
      const newFontSize = (max-min)*percent+min;
      element.style.fontSize = newFontSize+"px";
      // element.style.fontVariationSettings = `"wght" ${percent*900}, "wdth" ${percent*900}`;
      // // element.style.fontVariationSettings = ``;
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