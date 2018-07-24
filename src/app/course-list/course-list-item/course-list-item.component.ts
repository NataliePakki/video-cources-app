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
  starImagePath: string;

  deleteCourse(event: any) {
    event && event.preventDefault();
    this.delete.emit(this.courseListItem.id);
  }
  constructor() {
    this.starImagePath = '../../../assets/images/start_icon.svg';
   }

  ngOnInit() {
  }

}
