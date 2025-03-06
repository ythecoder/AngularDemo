export class Contact {
  name: string;
  phone: string;
  address: string;
  constructor(name: string, phone: string, address: string) {
    this.name = name;
    this.phone = phone;
    this.address = address;
  }

  displayInfo(): void {
    console.log(
      `Name: ${this.name},Phone: ${this.phone} 
      Address: ${this.address}`
    );
  }

  getInfo(): string {
    return `Name: ${this.name},Phone: ${this.phone} 
    Address: ${this.address}`;
  }

  
  double<T>(arg: T): T {
    if (typeof arg === 'string') {
      return (arg + arg) as T;
    } else if (typeof arg === 'number') {
      return (arg * 2) as T;
    }
    return arg;
  }
}
