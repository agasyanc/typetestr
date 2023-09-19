export default class TestrRange {
  isDrag:boolean = false;
  constructor(range_container:HTMLElement, initPercent:number, call:Function) {
    let range = document.createElement("div");
    range.classList.add("tt-range");
    let knob = document.createElement("div");
    knob.classList.add("tt-range__knob");
    let filler = document.createElement("div")
    filler.classList.add("tt-range__filler");
    filler.style.width=(initPercent*100)+"%";
    range.addEventListener("mousedown", (e) =>{
      let percent = (e.clientX - range.offsetLeft) / range.offsetWidth;
      filler.style.width = (percent * 100) + "%"
      this.isDrag = true;
      call(percent)
    })
    document.addEventListener("mousemove", (e) =>{
      
      if (this.isDrag) {
        let percent = (e.clientX - range.offsetLeft) / range.offsetWidth;
        if (percent >= 0 && percent <= 1){
          filler.style.width = (percent * 100) + "%"
          call(percent)
        }
      }
    })
    document.addEventListener("mouseup", () =>{
      this.isDrag = false;
    })
    range.appendChild(filler)
    filler.appendChild(knob);

    range_container.appendChild(range);
  }
}