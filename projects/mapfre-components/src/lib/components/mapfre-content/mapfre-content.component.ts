import { Component, Input, OnInit, HostBinding, EventEmitter, Output, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'lib-mapfre-content',
  templateUrl: './mapfre-content.component.html',
  styleUrls: ['./mapfre-content.component.scss'],
})
export class MapfreContentComponent implements OnInit, OnDestroy  {

  @Input() scrollable: boolean;
  @Output() scrollTop = new EventEmitter();
  @HostBinding("class.no-padding") @Input() noPadding: boolean = false;
  @HostBinding('style.overflow') public overflow: string;

  private scrollSubscription$: Subscription;

  constructor(private elRef: ElementRef) {
    this.scrollable = true;
  }

  ngOnInit() {
    if (this.scrollable) this.overflow = 'auto';
    this.setScrollObserver();
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription$) this.scrollSubscription$.unsubscribe();
  }

  /**
   * Set scroll observer when @Output scrollTop is defined
   * @private
   */
  private setScrollObserver() {
    if (this.scrollTop.observers.length) {
      this.scrollSubscription$ = fromEvent(this.elRef.nativeElement, 'scroll')
        .pipe(debounceTime(200))
        .subscribe((event: any) => {
          this.scrollTop.emit({
            scrollTop: event?.target?.scrollTop,
            scrollHeight: event?.target?.scrollHeight,
            offsetHeight: event?.target?.offsetHeight
          });
        });
    }
  }
}
