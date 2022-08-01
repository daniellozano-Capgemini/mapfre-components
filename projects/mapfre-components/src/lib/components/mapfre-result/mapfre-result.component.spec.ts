import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UrlSerializer } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { MapfreResultComponent } from './mapfre-result.component';

describe('MapfreResultComponent', () => {
  let component: MapfreResultComponent;
  let fixture: ComponentFixture<MapfreResultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MapfreResultComponent],
      providers:[UrlSerializer],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapfreResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
