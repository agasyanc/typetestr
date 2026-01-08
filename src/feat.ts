export default class Feat {
  known_human_names: any = {
    'wght': 'Weight',
    'wdth': 'Width',
    'ital': 'Italic',
    'slnt': 'Slant',
    'opsz': 'Optical Size',
    'size': 'Size'
  }
  constructor(public name: string, public min: number, public max: number, public value: number) {

  }

  set_percent(percent: number) {
    this.value = (this.max - this.min) * percent + this.min;
  }
  get_percent(): number {
    return (this.value - this.min) / (this.max - this.min);
  }
  get_human_name() {
    return this.known_human_names[this.name] || this.name;
  }

}