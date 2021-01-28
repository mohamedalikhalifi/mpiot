import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {User} from "../user.model";
import {UsersService} from "../users.service";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {

  users:User[] = [];
  isLoading = false;
  private usersSub: Subscription;
  constructor(public usersService: UsersService) {}

  ngOnInit(){
    this.isLoading = true;

    this.usersService.getUsers();
    this.usersSub = this.usersService.getUsersUpdatedListener()
      .subscribe((users:User[])=> {
        this.isLoading = false;
        this.users=users;
      });
  }

  ngOnDestroy(){
    this.usersSub.unsubscribe();
  }

  onDelete(userId:string){
    this.usersService.deleteUser(userId)
  }
}

