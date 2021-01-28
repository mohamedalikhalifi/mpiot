import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
})
export class FileUploaderComponent implements OnInit {
  images = [];
  urls = [];
  private usersSub: Subscription;

  constructor(private http: HttpClient, public usersService: UsersService) {}

  ngOnInit(): void {
    this.usersSub = this.usersService
      .getUserCreatedListener()
      .subscribe((id: string) => {
        this.submit(id);
      });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.images = event.target.files;
    }
  }

  submit(id: string) {
    const formData = new FormData();
    for (let img of this.images) {
      formData.append('files', img);
    }

    this.http
      .post<any>('https://mpiot.loca.lt/api/uploads/' + id, formData)
      .subscribe(
        (res) => {
          res.data.forEach((file) => {
            this.urls.push(file.path);
          });
        },
        (err) => console.log(err)
      );
  }
}
