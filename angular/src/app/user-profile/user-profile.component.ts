import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {UserProfileService} from './user-profile-service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public user: User;
  public companyName: string;
  public isLoad = false;
  constructor(private userProfileService: UserProfileService) { }

  ngOnInit() {
    this.userProfileService.getCurrentUser().subscribe(result => {
      this.user = result;
      this.isLoad = true;
      this.userProfileService.getUserCompany(this.user.id).subscribe(res => {
        this.companyName = res.name;
      });
    });
  }

}
