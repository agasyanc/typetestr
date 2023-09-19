# typetestr (unfinished yet)

![testr illustraition](test.png)

Simple script for change font size element.

Get `dist/typetestr.js`. Add script as a module. `let tt = new TypeTestr()`. Script adds rage input and makes element contenteditable.

```ts
import TypeTestr from './typetestr.js'
// create new object on page load
let tt = new TypeTestr() // or new TypeTester("my-class-name")
```

In constructor you can specify class name and initial font size:
```ts
new TypeTestr(className:string="typetestr") //"typetestr" — default class name
```
Add `dist/typetestr.css` for styling.

---
Write with vitejs, typescript (es6 module)

run `npm run dev` for development
run `npm run build` for comlile js and css

---
Tested on:

Safari Version 16.3 (18614.4.6.1.6)

Google Chrome Version 110.0.5481.177 (Official Build) (x86_64)