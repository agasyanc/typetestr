import TestrItem from "./testr_item";

export default class TypeTestr {
  items:TestrItem[]=[];
  
  constructor(className:string="typetestr"){
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