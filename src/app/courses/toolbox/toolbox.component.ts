import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {
  @Input() findValue = '';
  @Input() find;

  constructor() {}

  findCourse() {
    this.find.next(this.findValue);
  }

  ngOnInit() {}

}
