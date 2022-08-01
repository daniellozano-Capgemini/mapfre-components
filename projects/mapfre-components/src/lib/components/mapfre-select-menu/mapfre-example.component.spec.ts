import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { IonicModule } from '@ionic/angular';

import { MapfreSelectMenuComponent } from './mapfre-select-menu.component';

describe('MapfreSelectMenuComponent', () => {
  let component: MapfreSelectMenuComponent;
  let fixture: ComponentFixture<MapfreSelectMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MapfreSelectMenuComponent ],
      imports: [IonicModule.forRoot(),MatMenuModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MapfreSelectMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
