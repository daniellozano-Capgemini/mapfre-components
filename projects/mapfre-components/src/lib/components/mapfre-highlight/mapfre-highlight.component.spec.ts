import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapfreHighlightComponent } from './mapfre-highlight.component';
import { ItemHighlight } from './mapfre-highlight.interface';

describe('MapfreHighlightComponent', () => {
  let component: MapfreHighlightComponent;
  let fixture: ComponentFixture<MapfreHighlightComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MapfreHighlightComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapfreHighlightComponent);
    component = fixture.componentInstance;
    component.item = { header: '', subHeader: '', title: '', amount: { value: 2, decimals: 2 } } as ItemHighlight;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
