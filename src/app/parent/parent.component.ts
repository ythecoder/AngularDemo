import { Component } from '@angular/core';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css',
})
export class ParentComponent {
  parentData: string = 'Hello from Parent';

  childSentData: string = '';

  handleEvent(value: string) {
    console.log('Received:', value);
    this.childSentData = value;
  }
}
