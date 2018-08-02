import { Component, OnInit, Input } from '@angular/core';
import { CourseItemInterface } from '../../models/course-item.model';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
  @Input() model: CourseItemInterface;
  constructor() { }

  ngOnInit() {
  }

}
