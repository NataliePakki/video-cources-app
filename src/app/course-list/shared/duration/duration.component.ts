import { Component, OnInit, Input } from '@angular/core';
import { CourseItemInterface } from '../../models/course-item.model';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css']
})
export class DurationComponent implements OnInit {
  @Input() model: CourseItemInterface;
  formatDuration = '';

  constructor() { }

  ngOnInit() {
  }

  onKey(value: string) {
    this.formatDuration = value;
  }

}
