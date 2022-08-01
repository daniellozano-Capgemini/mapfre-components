import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UrlSerializer } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { MapfreGridComponent } from './mapfre-grid.component';

describe('MapfreGridComponent', () => {
  let component: MapfreGridComponent;
  let fixture: ComponentFixture<MapfreGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MapfreGridComponent ],
      providers: [UrlSerializer],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

      fixture = TestBed.createComponent(MapfreGridComponent);
      component = fixture.componentInstance;
      component.data = { type: 'fondo', fields: ['1', '2', '3', '4', '5', '6', '7', '8'] } as any;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
