import { Injectable } from '@angular/core';
import { IContact } from './icontact.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  // name: string;
  // phone: string;
  // address: string;
  contactInfo: IContact;

  constructor() {
    // this.name = 'Ram Sharma';
    // this.phone = '9847341123';
    // this.address = 'Baneshwor';

    this.contactInfo = {
      name: 'Ram Sharma',
      phone: '9847341123',
      address: 'Baneshwor',
    };
  }

  getInfo(): IContact {
    // return `Name: ${this.contactInfo?.name},Phone: ${this.contactInfo?.phone}
    // Address: ${this.contactInfo?.address}`;
    return this.contactInfo;
  }
}
