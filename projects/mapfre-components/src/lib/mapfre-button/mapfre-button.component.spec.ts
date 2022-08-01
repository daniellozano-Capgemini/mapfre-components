import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FakeLoader } from 'src/app/shared/mocks/fake-providers';

import { MapfreButtonComponent } from './mapfre-button.component';

describe('MapfreButtonComponent', () => {
  let component: MapfreButtonComponent;
  let fixture: ComponentFixture<MapfreButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MapfreButtonComponent ],
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader },
        }),
        IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapfreButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
