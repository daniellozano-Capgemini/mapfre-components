import { DecimalPipe ,CurrencyPipe} from "@angular/common";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { Spy } from "jasmine-auto-spies";

import { MapfreAmountComponent } from './mapfre-amount.component';

describe('MapfreAmountComponent', () => {
  let component: MapfreAmountComponent;
  let fixture: ComponentFixture<MapfreAmountComponent>;
  const spyObj = jasmine.createSpyObj;

  const decimalPipe: Spy<DecimalPipe> = spyObj('DecimalPipe', ['']);
  const currencyPipe: Spy<CurrencyPipe> = spyObj('CurrencyPipe', ['transform']);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MapfreAmountComponent],
        imports: [IonicModule.forRoot()],
        providers: [
          { provide: CurrencyPipe, useValue: currencyPipe },
          { provide: DecimalPipe, useValue: decimalPipe }
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(MapfreAmountComponent);
      currencyPipe.transform.and.returnValue('1,2')
      component = fixture.componentInstance;
      component.amount = {value : '', decimals:1};
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
