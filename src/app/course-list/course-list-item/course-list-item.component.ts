import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseItem } from '../models/course-item';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.css']
})
export class CourseListItemComponent implements OnInit {
  @Input() courseListItem: CourseItem;
  @Output() delete = new EventEmitter<number>();

  deleteCourse() {
    this.delete.emit(this.courseListItem.id);
  }
  constructor() { }

  ngOnInit() {
  }

}
