import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateResponse } from '../_Auth/AuthenticateResponse';
import { UserServiceService } from '../_Services/user-service.service';
import { User } from '../_Models/user';
import { PASSWORD_REGEX } from '../constants/constants';
import { UpdateRequest } from '../_Auth/UpdateRequest';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {

  isSignedIn = false;
  error = false;
  ok = false;
  errorMessage = '';
  oldPassword = '';
  newPassword = '';
  hideNew = true;
  hideOld = true;
  passwordRegex = PASSWORD_REGEX;
  newPasswordValid = true;
  user: User;

  //user: User;
  constructor(private router: Router, private userService: UserServiceService){
  }

  ngOnInit(){
    var user = JSON.parse(localStorage.getItem("user")!) as AuthenticateResponse;
    if(user != null){
      this.userService.validateLogin().subscribe(r => {
        console.log(r)
        if(r != 0){
          this.user = user;
          this.isSignedIn = true;
        } else {
          localStorage.removeItem("user");
          this.router.navigateByUrl('login');
        }
      });
    } else {
      localStorage.removeItem("user");
      this.router.navigateByUrl('login');
    }
  }

  changePassword(){
    this.newPasswordValid = this.validatePassword(this.newPassword);
    if(this.newPasswordValid){
      var request = new UpdateRequest();
      request.Email = this.user.email;
      request.Name = this.user.name;
      request.OldPassword = this.oldPassword;
      request.Password = this.newPassword;
      request.Username = this.user.username;

      this.userService.updatePassword(request).subscribe(r => {
        var err = r as HttpErrorResponse;
        var ok = r as boolean;
        if(err.error != undefined){
          if(err.error.message.includes("incorrect")){
            this.error = true;
          } else {
            console.log(err)
          }
        } else {
          if(ok == true){
            this.ok = true;
            this.oldPassword = '';
            this.newPassword = '';
          }
        }
      });
    }
  }

  navigate(route: string){
    this.router.navigateByUrl(route)
  }

  validatePassword(password: string): boolean {
    // Password validation logic
    const isValid = this.passwordRegex.test(password);
    if (!isValid) {
      // Show error message
      console.log('Invalid password');
    }
    return isValid;
  }

  signOut(){
    localStorage.clear();
    window.location.reload();
  }

}
