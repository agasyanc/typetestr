# typetestr 

![testr illustraition](test.png)

Font size and variable setting slider for font preview. Mouse wheel and keyboard interaction include.

Get `dist/typetestr.js`. Add script as a module. `let tt = new TypeTestr()`. Script adds rage input and makes element contenteditable.

```ts
import { TypeTestr } from './typetestr.js'
// create new object on page load
let tt = new TypeTestr() // or new TypeTester("my-class-name")
```

In constructor you can specify class name and initial font size:
```ts
new TypeTestr(className:string="typetestr") //"typetestr" — default class name
```
Add `dist/typetestr.css` for styling.

Use dataset for customization, for example
```html
<p class="typetestr" data-typetestr="size:16:100:40, wght:200:1000:300, wdth:75:125:100">text</p>
```

---
Write with vitejs, typescript (es6 module)

run `npm run dev` for development
run `npm run build` for comlile js and css

---
Tested on:

Safari Version 16.3 (18614.4.6.1.6)
Google Chrome Version 110.0.5481.177 (Official Build) (x86_64)