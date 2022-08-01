import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FakeLoader } from 'src/app/shared/mocks/fake-providers';
import { MapfreStarRatingComponent } from './mapfre-star-rating.component';

describe('MapfreStarRatingComponent', () => {
  let component: MapfreStarRatingComponent;
  let fixture: ComponentFixture<MapfreStarRatingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MapfreStarRatingComponent],
        imports: [
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: FakeLoader },
          }),
          IonicModule.forRoot(),
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(MapfreStarRatingComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
