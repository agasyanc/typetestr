import TestrItem from "./testr_item";
import TestrRange from "./testr_range";
import Feat from "./feat";

export { TestrItem, TestrRange, Feat };

export class TypeTestr {
  items: TestrItem[] = [];

  constructor(className: string = "typetestr") {
    this.items = this.findAndInit(className);
  }

  findAndInit(className: string): TestrItem[] {
    let items = this.find(className);
    return this.initItems(items);
  }

  find(className: string) {
    let items: HTMLCollectionOf<Element> = document.getElementsByClassName(className);
    return items;
  }

  initItems(items: HTMLCollectionOf<Element>): TestrItem[] {
    let testrItems: TestrItem[] = [];
    for (let i = 0; i < items.length; i++) {
      let item = new TestrItem(items[i] as HTMLElement);
      testrItems.push(item);
    }
    return testrItems;
  }

  destroy() {
    for (const item of this.items) {
      item.destroy();
    }
    this.items = [];
  }
}

export default TypeTestr;