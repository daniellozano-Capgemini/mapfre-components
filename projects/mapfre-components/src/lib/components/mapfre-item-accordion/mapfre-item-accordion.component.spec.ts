import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapfreItemAccordionComponent } from './mapfre-item-accordion.component';

describe('MapfreItemAccordionComponent', () => {
  let component: MapfreItemAccordionComponent;
  let fixture: ComponentFixture<MapfreItemAccordionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MapfreItemAccordionComponent],
      imports: [IonicModule.forRoot(), CdkAccordionModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MapfreItemAccordionComponent);
    component = fixture.componentInstance;
    component.item = { itemRight: false } as any;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
