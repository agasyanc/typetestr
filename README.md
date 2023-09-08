# typetestr (unfinished yet)

![testr illustraition](test.gif)

Simple script for change font size div content.

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
`dist/typetestr.css` adds some styles for hover animation.

---
Write with vitejs, typescript (es6 module)

run `npm run dev` for development
run `npm run build` for comlile js and css