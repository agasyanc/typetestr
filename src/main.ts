import { TypeTestr, TestrItem } from './typetestr.ts'
// create new object on page load
new TypeTestr();

// or create new object and attach to element
const el = document.getElementById("type-element") as HTMLElement;
new TestrItem(el);