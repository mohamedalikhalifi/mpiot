import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User, _User } from '../user.model';
import { mimeType } from "./mime-type.validator"
import { UsersService } from '../users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  private mode = 'create';
  private userId: string;
  user: User;
  isLoading = false;
  form: FormGroup;
  imagePreview:string;

  constructor(public usersService: UsersService, public route: ActivatedRoute) { }


  ngOnInit(): void {
    this.form = new FormGroup({
      "firstName": new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
      "lastName": new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
      "access": new FormControl(null),
      "image": new FormControl(null,{validators:[Validators.required],asyncValidators:[mimeType]}),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.mode = 'edit';
        this.userId = paramMap.get('userId')
        this.isLoading = true;
        this.usersService.getUser(this.userId).subscribe((userData: _User) => {
          this.isLoading = false;
          this.user = {
            id: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            dateCreated: userData.dateCreated,
            access: userData.access,
            imagePath:null

          };
          this.form.setValue({
              "firstName": this.user.firstName,
              "lastName": this.user.lastName,
              "access": this.user.access
            })
        });
      }
      else {
        this.mode = "create";
        this.userId = null;
      }
    });
  }

  onSavePerson(form: NgForm) {
    if (this.form.invalid) return;
    this.isLoading = true;
    if (this.mode === "create") {
      this.usersService.addUser(
        this.form.value.firstName,
        this.form.value.lastName,
        Boolean(this.form.value.access),
        this.form.value.image
      );
    }
    else {
      this.usersService.updateUser(this.userId, Boolean(this.form.value.access));
    }
    this.form.reset();
  }

  onImagePicked(event:Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file})
    this.form.get('image').updateValueAndValidity();
    console.log(file)
    console.log(this.form)
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
