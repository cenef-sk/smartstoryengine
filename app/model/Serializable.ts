export class Serializable {
  className: string;
  id: string;
  constructor(id: string, className: string) {
    this.className = className;
    this.id = id;
  }
}
