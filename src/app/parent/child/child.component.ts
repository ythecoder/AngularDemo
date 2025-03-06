import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css',
})
export class ChildComponent {
  @Input() data!: string;

  @Output() customEvent = new EventEmitter<string>();

  handleEvent(value: string) {
    console.log('Received:', value);
  }

  sendData() {
    this.customEvent.emit('Hello from Child');
  }
}
