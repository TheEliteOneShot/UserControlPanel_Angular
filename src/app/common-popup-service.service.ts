import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddUserComponent } from './add-user/add-user.component';

@Injectable({
  providedIn: 'root'
})
export class CommonPopupServiceService {
  firstName: string;
  age: number;
  uniqueId: number;

  constructor(public dialog: MatDialog) {
  }

  openModal(): Observable<any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    dialogConfig.data = {
      firstName: this.firstName,
      age: this.age,
      uniqueId: this.uniqueId,
      cancelled: false
    };
    const dialogRef = this.dialog.open(AddUserComponent, dialogConfig);

    return dialogRef.afterClosed();
  }
}
