import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

export interface StepperStep {
  label: string;
  selected?: boolean;
}

@Component({
  selector: 'lib-mapfre-steps',
  templateUrl: './mapfre-steps.component.html',
  styleUrls: ['./mapfre-steps.component.scss'],
})
export class MapfreStepsComponent implements OnInit, OnChanges {

  @Input() title: string;
  @Input() steps: number;
  @Input() current: number;
  @Input() diameter: number = 50;
  @Input() stepperSteps: Array<StepperStep>;

  public value: number;
  private stepValue: number;

 constructor() {}

  ngOnInit() {
    this.stepValue = 100 / this.steps;
    this.value = this.stepValue * this.current;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { current } = changes;
    if (current?.currentValue) {
      this.value = this.stepValue * current.currentValue;
    }
  }

}
