import { Component, Output, Input, OnInit, EventEmitter } from '@angular/core';
import { User } from './user.model';
import { UserManagerService } from '../user-manager.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Input() userNumber: number;
  @Output() textChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() deleteUser: EventEmitter<string> = new EventEmitter<string>();

  constructor(public userManagerService: UserManagerService) {
  }

  ngOnInit() {
  }

  nameChangedEvent(newName: any) {
    this.user.firstName = newName;
    this.textChanged.emit(true);
    console.log(`Name changed! Age: " ${newName}`);
  }

  ageChangedEvent(newAge: any) {
    this.user.age = newAge;
    this.textChanged.emit(true);
    console.log(`Age changed! Age: " ${newAge}`);
  }

  saveCurrentInformation() {
    console.log('Saving all of the users information.');
    this.userManagerService.updateInformationByUniqueId(this.user);
  }

  deleteThisUser() {
    console.log(`Firing event to remove a user with this uniqueId: ${this.user.uniqueId}`);
    this.deleteUser.emit(this.user.uniqueId);
  }
}
