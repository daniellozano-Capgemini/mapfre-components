import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapfreSwitchToggleComponent } from './mapfre-switch-toggle.component';

describe('MapfreSwitchToggleComponent', () => {
  let component: MapfreSwitchToggleComponent;
  let fixture: ComponentFixture<MapfreSwitchToggleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MapfreSwitchToggleComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapfreSwitchToggleComponent);
    component = fixture.componentInstance;
    component.dataSwitchToggle = { check: true, title: '' }
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
