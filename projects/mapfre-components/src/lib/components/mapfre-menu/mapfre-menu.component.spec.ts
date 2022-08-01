import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FakeRouter, FakeLoader } from 'src/app/shared/mocks/fake-providers';

import { MapfreMenuComponent } from './mapfre-menu.component';

describe('MapfreMenuComponent', () => {
  let component: MapfreMenuComponent;
  let fixture: ComponentFixture<MapfreMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MapfreMenuComponent],
      providers: [
        { provide: Router, useValue: FakeRouter }
      ],
      imports: [IonicModule.forRoot(),
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: FakeLoader }
      }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MapfreMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
