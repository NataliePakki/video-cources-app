import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../models/course';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css']
})
export class DurationComponent implements OnInit {
  @Input() model: Course;
  formatDuration = '';

  constructor() { }

  ngOnInit() {
  }

  onKey(value: string) {
    this.formatDuration = value;
  }

}
