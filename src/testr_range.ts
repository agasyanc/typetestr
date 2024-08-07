export default class TestrRange {
  isDrag:boolean = false;
  range:HTMLElement;
  knob:HTMLElement;
  filler:HTMLElement;

  constructor(container:HTMLElement, initPercent:number, name:string, public call:Function) {
    const range_container = document.createElement('div')
    range_container.classList.add("tt-range__container")
    const name_title = document.createElement('div')
    name_title.classList.add("tt-range__title")
    name_title.textContent = name;
    this.range = document.createElement("div");
    this.range.classList.add("tt-range");
    this.range.tabIndex = 0;
    this.knob = document.createElement("div");
    this.knob.classList.add("tt-range__knob");
    this.filler = document.createElement("div")
    this.filler.classList.add("tt-range__filler");
    this.set_percent(initPercent)
    
    this.range.style.touchAction = "none";

    this.range.addEventListener('keydown', (e:KeyboardEvent)=>{
      if (e.key == "ArrowLeft" || e.key == "ArrowRight"){
        let percent = parseFloat(this.knob.style.left)/100;
        const step = e.shiftKey ? 0.1 : 0.01;
        if (e.key == "ArrowLeft") percent -= step;
        if (e.key == "ArrowRight") percent += step;

        if (percent < 0) percent = 0;
        if (percent > 1) percent = 1;
        this.set_percent(percent)
        this.call(percent)
      }
    })
    
    this.range.addEventListener("pointerdown", (e:PointerEvent) =>{
      this.range.setPointerCapture(e.pointerId);

      this.set_width(e.offsetX)
      this.isDrag = true;
    })
    
    this.range.addEventListener("pointermove", (e:PointerEvent) =>{
      
      if (this.isDrag) {
        this.set_width(e.offsetX)
      }
    })
    this.range.addEventListener("pointerup", (e:PointerEvent) =>{
      this.range.releasePointerCapture(e.pointerId)
      this.isDrag = false;
    })

    this.range.addEventListener('wheel', (e:WheelEvent)=>{
      const step = e.shiftKey ? -e.deltaX/100 : -e.deltaX/1000;
      let percent = parseFloat(this.knob.style.left)/100 + step;
      if (percent < 0) percent = 0;
      if (percent > 1) percent = 1;
      this.set_percent(percent)
      this.call(percent)

      e.preventDefault();
    })

    // this.range.appendChild(name_title);

    this.range.appendChild(this.filler)
    this.filler.appendChild(this.knob);

    range_container.appendChild(name_title)
    range_container.appendChild(this.range)
    
    container.appendChild(range_container);
  }
  set_width(e_offsetX:number){
    const padding_left = parseFloat(window.getComputedStyle(this.range).paddingLeft)
    const padding_right = parseFloat(window.getComputedStyle(this.range).paddingRight)
    
    let percent = (e_offsetX-padding_left) / (this.range.offsetWidth-padding_right-padding_right);
    if (percent >= 0 && percent <= 1){
      this.set_percent(percent)
      this.call(percent)
    }
    
  }
  set_percent(percent:number){
    if (percent < 0 ) percent = 0
    const percent_s = 100 - (percent * 100) + "%"
    this.filler.style.background = "linear-gradient(to left, #c0c0c0 "+percent_s+", blue "+percent_s+")"
    this.knob.style.left = (percent * 100) + "%"
  }
}