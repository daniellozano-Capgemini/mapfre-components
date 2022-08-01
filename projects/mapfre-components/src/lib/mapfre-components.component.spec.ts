import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapfreComponentsComponent } from './mapfre-components.component';

describe('MapfreComponentsComponent', () => {
  let component: MapfreComponentsComponent;
  let fixture: ComponentFixture<MapfreComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapfreComponentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapfreComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
