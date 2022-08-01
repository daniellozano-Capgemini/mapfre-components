import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ValidatorChar } from '../common/validators';
import { SigningKey, SIGNING_KEYS_DEFAULT_POSITIONS } from './models';

@Component({
  selector: 'lib-mapfre-signing-key',
  templateUrl: './mapfre-signing-key.component.html',
  styleUrls: ['./mapfre-signing-key.component.scss']
})
export class MapfreSigningKeyComponent implements OnInit {
  readonly defaultPostions: SigningKey[];
  @Input() requiredPositions: SigningKey[];
  @Input() resetValue: boolean;
  @Input() label: string;
  @Output() key: EventEmitter<SigningKey[]>;
  @Output() isValid: EventEmitter<boolean>;
  idInputPassword = `${Math.random().toString(36).substring(2)}`;
  showKey: boolean;
  inputTyped: SigningKey[];
  keyInputForm: FormGroup;
  hasError: boolean;
  constructor(private translate: TranslateService) {
    this.resetValue = false;
    this.showKey = false;
    this.inputTyped = [];
    this.defaultPostions = SIGNING_KEYS_DEFAULT_POSITIONS;
    this.requiredPositions = this.defaultPostions;
    this.key = new EventEmitter();
    this.isValid = new EventEmitter();
  }

  @HostListener('keyup', ['$event'])
  public keyup(event: any): void {
    if (event.key !== 'Backspace') { return; }
    let id = event?.target?.getAttribute('id');
    const idNumber = +id?.substr(-1);
    id = id?.substr(0, id.length - 1);
    if (idNumber) {
      event.target.value = '';
      document.getElementById(`${id}${idNumber - 1}`)?.focus();
      this.setValue(idNumber + 1, '');
      this.changeFocusBack(idNumber + 1);
    }
  }

  ngOnInit() {
    this.setPositionsFormGroup();
    this.setLabel();
  }

  ngOnChanges({ requiredPositions, resetValue }: SimpleChanges) {
    if (requiredPositions) {
      this.requiredPositions = requiredPositions.currentValue;
      this.setPositionsFormGroup();
    }
    if (resetValue && this.keyInputForm) {
      this.keyInputForm.reset();
      this.isValid.emit(this.keyInputForm.valid);
    }
  }

  get allPositionsIndexes() {
    return this.defaultPostions.map((pos) => pos.position);
  }

  get requiredPositionIndexes() {
    return this.requiredPositions.map((pos) => pos.position);
  }

  onInput(itemPosition: number) {
    const currentValue = this.keyInputForm.get(itemPosition.toString()).value;
    if (!currentValue) { return; }

    this.setValue(itemPosition, currentValue);
    this.changeFocus(itemPosition);
  }

  setValue(itemPosition, currentValue) {
    this.hasError = Object.keys(this.keyInputForm.controls).some(
      (key) => this.keyInputForm.get(key)?.errors?.validChar
    );
    this.pushToArray(this.inputTyped, {
      position: itemPosition,
      value: currentValue
    });

    this.key.emit(this.inputTyped);
    this.isValid.emit(this.keyInputForm.valid);
  }

  private pushToArray(keys: SigningKey[], value: SigningKey) {
    const index = keys.findIndex((e) => e.position === value.position);
    if (index === -1) {
      keys.push(value);
    } else {
      keys[index] = value;
    }
    keys.sort((a, b) => a.position - b.position);
  }

  setPositionsFormGroup() {
    const group = {};
    this.allPositionsIndexes.forEach((position) => {
      const isDisabled = !this.requiredPositionIndexes.includes(position);
      group[position] = new FormControl(
        {
          value: isDisabled ? '1' : null,
          disabled: isDisabled
        },
        [Validators.required, ValidatorChar]
      );
    });
    this.keyInputForm = new FormGroup(group);
  }

  private setLabel(): void {
    if (this.label) {
      this.label = this.translate.instant(this.label);
      return;
    }

    if (this.requiredPositions.length !== this.defaultPostions.length) {
      this.label = `Posiciones ${this.requiredPositions
        .map((p) => p.position)
        .join(', ')
        .replace(/,([^,]*)$/, ' y' + '$1' + ' de tu firma')}`;

      return;
    }

    this.label = 'Posiciones 1 a 8 de tu firma';
  }

  changeFocus(index: number) {
    let indexInput;
    for (const i of this.requiredPositionIndexes) {
      if (index < i && !indexInput) {
        indexInput = i - 1;
      }
    }

    if (indexInput <= 8) {
      document.getElementById(`${this.idInputPassword}${indexInput}`).focus();
    }
  }

  changeFocusBack(index: number) {
    let indexInput;
    for (const i of this.requiredPositionIndexes.reverse()) {
      if (index > i && !indexInput) {
        indexInput = i - 1;
      }
    }

    if (indexInput <= 8) {
      document.getElementById(`${this.idInputPassword}${indexInput}`).focus();
    }
  }
}
