import { Component } from '@angular/core';
import { ContactService } from './contact.service';
import { Contact } from './contact';
import { Role } from './role.enum';
import { CommonModule } from '@angular/common';
import { IContact } from './icontact.interface';
import { FormsModule } from '@angular/forms';
import { country } from './country.interface';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  role = Role;
  userRole: Role | undefined;
  contactInfo!: IContact;
  // contact!: ContactInterface;

  title = 'Template driven forms';

  countryList: country[] = [
    { id: '1', name: 'Pakistan' },
    { id: '2', name: 'UAE' },
    { id: '3', name: 'USA' },
  ];

  constructor(private contactService: ContactService) {}

  //Component Lifecycle hooks
  //ngOnInit
  //ngOnDestroy
  ngOnInit() {
    console.log('Contact Component initialized!');

    //Use service to assign value
    this.contactInfo = this.contactService.getInfo();
    // this.contact = this.contactService.getInfo();

    const contactPerson = new Contact('Ram Sharma', '9847341123', 'Baneshwor');
    //contactPerson.displayInfo();

    //Use to modify variable from different class method
    //this.contactInfo = contactPerson.getInfo();

    //Generics
    const output1 = contactPerson.double<string>('Hello');
    const output2 = contactPerson.double<number>(10);
    console.log(output1); // Output: HelloHello
    console.log(output2); // Output: 20

    //Enum
    this.userRole = Role.Admin;
    // console.log(this.userRole); // Output: 0 (Admin)
  }

  ngAfterContentInit() {
    console.log(
      'contact component child components has been projected into the view'
    );
  }

  ngAfterViewInit() {
    console.log('Contact component view has been fully initialized.');
  }

  ngOnDestroy() {
    console.log('Contact Component destroyed!');
  }

  onSubmit(contactForm: any) {
    console.log(contactForm.value);
    alert('Form submitted successfully');
  }
}
