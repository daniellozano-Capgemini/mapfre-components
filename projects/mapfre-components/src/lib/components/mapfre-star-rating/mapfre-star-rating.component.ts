import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { setIndex } from '@ionic-native/core/decorators/common';

@Component({
  selector: 'lib-mapfre-star-rating',
  templateUrl: './mapfre-star-rating.component.html',
  styleUrls: ['./mapfre-star-rating.component.scss'],
})
export class MapfreStarRatingComponent implements OnInit {
  public color: string = '#d81e05';
  public ratingArr = [];
  public isBold = false;
  @Input() rating: number = 3;
  @Input() totalStars: number = 5;
  @Input() disable: boolean = false;
  @Output() ratingUpdated = new EventEmitter();

  constructor() {}

  ngOnInit() {
    for (let index = 0; index < this.totalStars; index++) {
      this.ratingArr.push({ id: index, property: 'star-disable' });
    }
  }

  onRatingChanged(rating) {
    this.rating = rating;
  }

  onClick(index: number) {
    const rating = index + 1;
    if (!this.disable) {
      this.ratingUpdated.emit(rating);
      this.onRatingChanged(rating);
      this.changeIcon(index);
    }
  }

  changeIcon(index: number) {
    this.ratingArr.forEach(
      (elem) =>
        (elem.property = elem.id <= index ? 'star-primary' : 'star-disable')
    );
  }
}
