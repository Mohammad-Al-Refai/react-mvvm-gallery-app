export class ImageModel {
  id: string = "";
  label: string = "";
  url: string = "";
  setId(value: string) {
    this.id = value;
    return this;
  }
  setLabel(value: string) {
    this.label = value;
    return this;
  }
  setURL(value: string) {
    this.url = value;
    return this;
  }
}
