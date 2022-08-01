import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MapfreSigningKeyComponent } from './mapfre-signing-key.component';

describe('MapfreSigningKeyComponent', () => {
  let debugElement: DebugElement;
  let component: MapfreSigningKeyComponent;
  let fixture: ComponentFixture<MapfreSigningKeyComponent>;
  let translateSpy: TranslateService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MapfreSigningKeyComponent],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        MatIconModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: TranslateService, useValue: translateSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MapfreSigningKeyComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    component.requiredPositions = [
      { position: 1 },
      { position: 5 },
      { position: 6 },
      { position: 8 }
    ];
    fixture.detectChanges();
    translateSpy = debugElement.injector.get(TranslateService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('inputs disabled should be 4', () => {
    let form = fixture.debugElement.nativeElement.querySelector('#formGroup');
    const positions = form.querySelectorAll('input');
    let positionsDisabled = form.querySelectorAll('input:disabled')
    expect(positions.length).toEqual(8);
    expect(positionsDisabled.length).toEqual(4);
    expect(component.label).toEqual('Posiciones 1, 5, 6 y 8 de tu firma');
  });

  it('inputs disabled should be 0', () => {
    const fixture = TestBed.createComponent(MapfreSigningKeyComponent);
    fixture.detectChanges();
    component.requiredPositions = [
      { position: 1 },
      { position: 2 },
      { position: 3 },
      { position: 4 },
      { position: 5 },
      { position: 6 },
      { position: 7 },
      { position: 8 }
    ]

    const form = fixture.debugElement.nativeElement.querySelector('#formGroup');
    const positions = form.querySelectorAll('input');
    const positionsDisabled = form.querySelectorAll('input:disabled')
    expect(positions.length).toEqual(8);
    expect(positionsDisabled.length).toEqual(0);
  });
});
