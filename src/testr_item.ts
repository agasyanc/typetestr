import Feat from "./feat";
import TestrRange from "./testr_range";
export default class TestrItem{
  feats:Feat[] = [];

  constructor(public element:HTMLElement) {
    let wrapper = this.wrapElement(element, "tt-element");
    this.element.classList.add("tt-element__content");
    this.element.setAttribute("contenteditable", "true");
    // element.style.setProperty('font-variation-settings', 'initial')

    if (this.element.dataset.typetestr){
      const feats_str = this.element.dataset.typetestr.split(',');
      
      for (const feat_str of feats_str) {
        const feat_params_s = feat_str.split(':');

        const feat = new Feat(feat_params_s[0].trim(), parseFloat(feat_params_s[1] || "1"), parseFloat(feat_params_s[2] || "1000"), parseFloat(feat_params_s[3] || "20"))
        
        this.feats.push(feat);
      }
    }
    else this.feats.push(new Feat("size", 16, 100, 16))

    let range_element = document.createElement("div");
    range_element.classList.add("tt-element__range-list");
    wrapper.insertBefore(range_element, this.element);

    for (let feat of this.feats){
      new TestrRange(range_element, feat.get_percent(), feat.get_human_name(), (percent:number)=> this.update(feat, percent) );
      this.update(feat)
    }
  }
  update(feat:Feat, percent:number|null = null){
    
    percent && feat.set_percent(percent);
    let var_strs = []
    for (const feat of this.feats) {
      if (feat.name == "size") {this.element.style.fontSize = feat.value+"px";}
      else {
        var_strs.push(`"${feat.name}" ${feat.value}`)
      }
    }
    this.element.style.fontVariationSettings = var_strs.join(", ");
  }

  wrapElement(elementToWrap:HTMLElement, wrapperClassName:string){
    let wrapper = document.createElement("div");
    wrapper.classList.add(wrapperClassName);

    elementToWrap.parentNode!.insertBefore(wrapper, elementToWrap);
    wrapper.appendChild(elementToWrap);
    return wrapper;
  }
}