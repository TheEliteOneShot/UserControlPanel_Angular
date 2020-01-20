import { CommonPopupServiceService } from './../common-popup-service.service';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserManagerService } from '../user-manager.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: []
})

export class UsersComponent implements OnInit {
  @ViewChildren(UserComponent) allUserComponents: QueryList<UserComponent>;

  public saveChangedButtonEnabled = false;
  public showAddedUserSuccessMessage = false;

  constructor(
    public dialog: MatDialog,
    public userManagerService: UserManagerService,
    public commonPopupService: CommonPopupServiceService) {
  }

  ngOnInit() {
  }

  openAddUserDialog() {
    const dialogRef = this.commonPopupService.openModal().subscribe((result: any) => {
      if (result.cancelled === false) {
        console.log(`Adding user because the cancel event was: ${result.cancelled}`);
        this.userManagerService.addUser(result.firstName, result.age).subscribe(data => {
          console.log(`Got the result back from adding the user:  ${data}`);
          if (data === true) {
            this.showCustomerAddedSuccessMessage(); // Show success message for a small amount of time
          } else {

          }
        });
      } else {
        console.log('The user requested to cancel adding a new a user.');
      }
    },
      (error) => {
        console.log(`There was an error: ${error}`);
      });
  }

  textChangedEvent() {
    console.log('Text changed event was fired and caught in the parent!');
    this.saveChangedButtonEnabled = true;
  }

  saveAllChanges() {
    console.log('Saving all of the changes for the child components!');
    this.saveChangedButtonEnabled = false;
    this.allUserComponents.forEach(c => c.saveCurrentInformation());
  }

  showCustomerAddedSuccessMessage() {
    this.showAddedUserSuccessMessage = true;
    setTimeout(() => {
      this.showAddedUserSuccessMessage = false;
    }, 4000);
  }
}
