import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Menu, MenuLinks, UserName } from './mapfre-menu.interface';
import { MapfreMenuShared } from './MapfreMenuShared';

@Component({
  selector: 'mapfre-menu',
  templateUrl: './mapfre-menu.component.html',
  styleUrls: ['./mapfre-menu.component.scss'],
  host: {
    class: 'mapfre-menu',
    '[class.mapfre-menu-open]': 'isOpen',
  },
  inputs: ['isOpen'],
})
export class MapfreMenuComponent implements OnInit {
  @Input() dataMenu: Menu[];
  @Input() isLogged: boolean;
  @Input() userName: UserName;
  @Input() showNotification: boolean;

  @Output() clickedMenuLink = new EventEmitter<string>();
  @Output() clickedMenuTitle = new EventEmitter<string>();
  @Output() onClose = new EventEmitter();
  @Output() clickLink = new EventEmitter();
  @Output() onLogout = new EventEmitter();

  constructor(private router: Router, private translate: TranslateService) {}

  ngOnInit() {}

  get isOpen(): boolean {
    return MapfreMenuShared.isOpen;
  }

  get user() {
    return {
      name: this.userName?.name || '',
      surname: this.userName?.surname || '',
      profilePage: {
        text: this.translate.instant('header.your.profile'),
        route: '/mi-perfil',
        showNotification: this.showNotification,
      },
    };
  }

  open(): void {}

  closeMenu(): void {
    MapfreMenuShared.isOpen = false;
    this.onClose.emit();
  }

  onSelectedItem(item) {
    this.clickedMenuLink.emit(item);
    MapfreMenuShared.isOpen = false;
  }

  onSelectedTitle(title) {
    this.clickedMenuTitle.emit(title);
  }

  onClickLink(menuLinks: MenuLinks) {
    this.clickLink.emit(menuLinks);
    MapfreMenuShared.isOpen = false;
  }

  logout() {
    this.onLogout.emit();
  }

  goToAcceptPolicies() {
    this.router.navigate(['/about']);
    MapfreMenuShared.isOpen = false;
  }
}
