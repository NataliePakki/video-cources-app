import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css']
})
export class DurationComponent implements OnInit {
  @Input() model;
  formatDuration = '';

  constructor() { }

  ngOnInit() {
  }

  onKey(value: string) {
    this.formatDuration = value;
  }

}
