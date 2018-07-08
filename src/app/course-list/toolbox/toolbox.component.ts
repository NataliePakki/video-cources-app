import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {
  @Input() findValue = '';
  @Output() find = new EventEmitter<string>();

  constructor() { }

  findCourse() {
    console.log('Find: ' + this.findValue);
    this.find.emit(this.findValue);
  }

  ngOnInit() {
  }

}
