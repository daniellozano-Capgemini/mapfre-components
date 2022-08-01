import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-mapfre-alert-component',
  templateUrl: './mapfre-alert-component.html',
  styleUrls: ['./mapfre-alert-component.scss'],
})
export class MapfreAlertComponent implements OnInit {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<MapfreAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data,

  ) {
    // This property means backdrop close action.
    this.dialogRef.disableClose = data?.config?.disableClose;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  goTo(link, state = {}) {
    if (link) {
      this.router.navigate([link], { state: { ...state }});
    }
  }
}
