import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-mapfre-progress',
  templateUrl: './mapfre-progress.component.html',
  styleUrls: ['./mapfre-progress.component.scss'],
})
export class MapfreProgressComponent implements OnInit {
  @Input() objective: string;
  @Input() text: string;
  @Input() percentage: number = 2;

  ngOnInit() {
    // The maximum allowed value is 100
    this.percentage = this.percentage > 100 ? 100 : this.percentage;
    // The minimum allowed value is 2
    this.percentage = this.percentage < 2 ? 2 : this.percentage;
  }

  getProgress() {
    return this.percentage.toString() + '%';
  }
}
