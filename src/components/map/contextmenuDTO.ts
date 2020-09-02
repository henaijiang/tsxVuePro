class contextmenuDTO {
  icon: string = "";
  name: string = "";
  divider?: boolean = false;
  callback: Function = ()=>{};
  constructor({icon, name, callback, divider = false}: {
    icon: string,
    name: string,
    divider: boolean,
    callback: Function
  }) {
    this.icon = icon;
    this.name = name;
    this.callback = callback;
    this.divider = divider;
  }
}
export { contextmenuDTO }