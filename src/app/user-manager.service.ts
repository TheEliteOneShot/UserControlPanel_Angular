import { Injectable } from '@angular/core';
import { User } from './user/user.model';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  private userList: Array<User> = new Array<User>();
  private nextUniqueUserId = 0;
  private collectionId = 'UserList';
  private documentId = 'xohEoZkMH9hVJAk5Wcjf';

  constructor(private db: AngularFirestore) {
    const results = this.db.collection(this.collectionId).get();
    results.forEach(coll => {
      const object = coll.docs.map(doc => doc.data());
      object.forEach(user => {
        const userToLoad: User = new User(user.Name, user.Age, user.UniqueId);
        this.userList.push(userToLoad);
      });
    });
  }

    addUser(name: string, age: number): Observable < any > {
      const newUser = new User(name, age, 'empty');
      this.userList.push(newUser);
      const object = {
        Name: newUser.firstName,
        Age: newUser.age,
        UniqueId: newUser.uniqueId
      };
      this.db.collection(this.collectionId).add(object).then(x => {
        const objectToUpdate = {
          UniqueId: x.id
        };
        this.db.collection(this.collectionId).doc(x.id).update(objectToUpdate);
      }).catch(error => console.log(`Error adding a user to the database. Error: ${error}`));

      console.log(`Added User --  Name: ${name}, Age: ${age}`);
      return of(true);
    }

    removeUserByUniqueId(uniqueId: string): boolean {
      console.log(`Attempting to remove ` + uniqueId);
      const index = this.userList.findIndex(user => user.uniqueId === uniqueId);

      if (index === undefined) {
        console.log(`Couldn't find a user with this uniqueId: ${uniqueId}`);
        return false; // Found the user
      } else {
        this.db.collection(this.collectionId).doc(uniqueId).delete().then(r => {
          this.userList.splice(index, 1);
          console.log(`Removed user with a uniqueId of ${uniqueId}`);
        }).catch(error => {
          console.log(`Error removing a user from the database. Error: ${error}`);
        });
        return true; // User did not exist
      }
    }

    getUserByUniqueId(uniqueId: string): User {
      return this.userList.find(user => user.uniqueId === uniqueId);
    }

    getNextUniqueUserId(): number {
      const id = this.nextUniqueUserId;
      this.nextUniqueUserId++;
      return id;
    }

    getUserList(): Array < User > {
      return this.userList;
    }

    getCurrentUserCount(): number {
      return this.userList.length;
    }

    updateInformationByUniqueId(newUserInformation: User): boolean {
      console.log(`Updating Information.
    Name: ${newUserInformation.firstName},
    Age: ${newUserInformation.age}, UniqueId: ${newUserInformation.uniqueId}`);
      const index = this.userList.findIndex(user => user.uniqueId === newUserInformation.uniqueId);
      if (index === undefined) {
        return false;
      } else {

        const objectToUpdate = {
          Name: newUserInformation.firstName,
          Age: newUserInformation.age,
          UniqueId: newUserInformation.uniqueId
        };

        this.db.collection(this.collectionId).doc(newUserInformation.uniqueId).update(objectToUpdate).then(r => {
          this.userList[index].age = newUserInformation.age;
          this.userList[index].firstName = newUserInformation.firstName;
        }).catch(error => {
          console.log(`Error updating a users information in the database. Error: ${error}`);
        });
        return true;
      }
    }
  }
