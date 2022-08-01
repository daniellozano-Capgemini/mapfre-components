import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { User } from './mapfre-header.interfaces';
import { MapfreMenuShared } from '../mapfre-menu/MapfreMenuShared';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'lib-mapfre-header',
  templateUrl: './mapfre-header.component.html',
  styleUrls: ['./mapfre-header.component.scss'],

})
export class MapfreHeaderComponent implements OnInit {
  @Input() onBack: boolean | string | number;
  @Output() onBackEvent = new EventEmitter();
  @Input() hasClose: boolean;
  @Input() title: string;
  @Input() imgSrc: string[];
  @Input() onBackFunction: any;
  @Input() hideMenu: boolean;

  @Input() isLogged: boolean;
  @Input() hasHelpImage: boolean;

  @HostBinding('class.header-user') @Input() user: User;

  @Output() onMenu = new EventEmitter();
  @Output() onClose = new EventEmitter();


  constructor(private location: Location, private navCtrl: NavController) {}




  ngOnInit() {
  }

  /**
   * This method will obtain the alias of the user based on name or name and surname.
   * The alias will only be formed by two letters.
   */
  get userAlias() {
    if (this.user) {
      // Some validations for array iteration.
      const name = this.user.name || '';
      const surname = this.user.surname || '';

      // All the words of name and surname are joined in the same array.
      const nameArr = [...name.split(' '), ...surname.split(' ')];
      let alias = [];

      for (let word of nameArr) {
        alias.push(word.charAt(0).toUpperCase());
        if (alias.length >= 2) break;
      }

      return alias.join('');
    }
    return '';
  }

  close() {
    this.onClose.emit();
  }

  onProfileClick(route: string) {
    this.navCtrl.navigateForward([route]);
    this.close();
  }

  emitMenu(event) {
    MapfreMenuShared.isOpen = true;
    this.onMenu.emit(event);
  }

  goBack(): void {
    if (typeof this.onBack === 'string' || typeof this.onBack === 'number') {
      this.onBackEvent.emit(this.onBack);
    } else {
      this.navCtrl.pop();
    }
  }

  goBackFunction(): void {
    this.onBackFunction();
  }

  goToFaqs() {
    this.navCtrl.navigateForward(['faqs']);
  }
}
