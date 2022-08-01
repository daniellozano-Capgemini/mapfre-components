import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapfreTabsComponent } from './mapfre-tabs.component';

describe('MapfreTabsComponent', () => {
  let component: MapfreTabsComponent;
  let fixture: ComponentFixture<MapfreTabsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MapfreTabsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapfreTabsComponent);
    component = fixture.componentInstance;
    component.dataTabs = [];
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
