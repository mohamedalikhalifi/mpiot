import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router } from "@angular/router";


import { User } from './user.model';
import { _User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {

  private usersUpdated = new Subject<User[]>();
  private userCreated = new Subject<String>();
  private users: User[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  getUsers() {
    this.http.get<{ message: string, users: any }>('https://mpiot.loca.lt/api/users')
      .pipe(map((userData) => {
        return userData.users.map(user => {
          return {
            firstName: user.firstName,
            lastName: user.lastName,
            access: user.access,
            dateCreated: user.dateCreated,
            id: user._id,
            imagePath:user.imagePath
          }
        })
      }))
      .subscribe((mappedUsers) => {
        this.users = mappedUsers;
        this.usersUpdated.next([...this.users]);
      });
  }

  addUser(firstName: string, lastName: string, access: boolean, image: File) {
    const userData = new FormData();
    userData.append("firstName",firstName)
    userData.append("lastName",lastName)
    userData.append("access",String(access))
    userData.append("image",image, firstName+lastName)

    this.http.post<{ message: string, user:User }>('https://mpiot.loca.lt/api/users', userData)
      .subscribe((responseData) => {
        const user: User = {
          id: responseData.user.id,
          firstName:firstName,
          lastName: lastName,
          access:access,
          dateCreated: responseData.user.dateCreated,
          imagePath:responseData.user.imagePath
        }
        this.userCreated.next(user.id)
        this.users.push(user);
        this.usersUpdated.next([...this.users]);
        this.router.navigate(["/"]);
      })

  }

  getUser<_User>(id: string) {
    return this.http.get("https://mpiot.loca.lt/api/users/" + id);
  }


  updateUser(userId: string, access: boolean) {
    let userData = this.users.find(u => u.id == userId);
    const user: User = {
      id: userId, firstName: userData.firstName,
      lastName: userData.lastName,
      access: access,
      dateCreated: userData.dateCreated,
      imagePath:null

    };

    this.http
      .put("https://mpiot.loca.lt/api/users/" + userId, user)
      .subscribe(response => {
        const updatedUsers = [...this.users];
        const oldUserIndex = updatedUsers.findIndex(u => u.id === user.id);
        updatedUsers[oldUserIndex] = user;
        this.users = updatedUsers;
        this.usersUpdated.next([...this.users]);
        this.router.navigate(["/"]);
      });
  }

  deleteUser(userId: string) {
    this.http.delete("https://mpiot.loca.lt/api/users/" + userId)
      .subscribe(() => {
        const updatedUsers = this.users.filter(user => user.id != userId)
        this.users = updatedUsers;
        this.usersUpdated.next([...this.users])
      })
  }

  getUsersUpdatedListener() {
    return this.usersUpdated.asObservable();
  }

  getUserCreatedListener() {
    return this.userCreated.asObservable();
  }
}
