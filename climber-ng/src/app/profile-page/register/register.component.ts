import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/_Auth/RegisterRequest';
import { UserServiceService } from 'src/app/_Services/user-service.service';
import { EMAIL_REGEX, PASSWORD_REGEX } from 'src/app/constants/constants';
import { DIGIT_REGEX, LOWERCASE_REGEX, SPECIALCHAR_REGEX, UPPERCASE_REGEX } from '../../constants/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fullName = '';
  username = '';
  email = '';
  password = '';
  passwordCheck = '';
  hide = true;
  hideCheck = true;
  emailValid = true;
  passwordValid = true;
  passwordDifferent = false;

  regexSpecialChar=SPECIALCHAR_REGEX;
  regexUppercase=UPPERCASE_REGEX;
  regexLowercase=LOWERCASE_REGEX;
  regexDigit=DIGIT_REGEX;

  errorMessage = '';
  error = false;
  success = false;

  constructor(private router: Router, private userService: UserServiceService){
  }

  register() {
    // Validate email and password
    this.emailValid = this.validateEmail(this.email);
    this.passwordValid = this.validatePassword(this.password);

    if(this.password != this.passwordCheck){
      this.passwordDifferent = true;
      return;
    }

    if (this.emailValid && this.passwordValid) {
      var request = new RegisterRequest();
      request.email = this.email;
      request.name = this.fullName;
      request.username = this.username;
      request.password = this.password;

      this.userService.register(request).subscribe(r => {
        console.log(r);
        this.success = true;
      }, err => {
        this.error = true;
        var error = err as HttpErrorResponse;
        console.log(error)
        if(error.status == 400){
          if(error.error.message.includes("Username")){
            this.errorMessage = "Username is already in use..."
          }
          if(error.error.message.includes("Email")){
            this.errorMessage = "Email is already in use..."
          }
        }
      })
    }
  }

  validateEmail(email: string): boolean {
    // Email validation logic
    const isValid = EMAIL_REGEX.test(email);
    if (!isValid) {
      // Show error message
      console.log('Invalid email');
    }
    return isValid;
  }

  validatePassword(password: string): boolean {
    // Password validation logic
    const isValid = PASSWORD_REGEX.test(password);
    if (!isValid) {
      // Show error message
      console.log('Invalid password');
    }
    return isValid;
  }

  navigate(route: string){
    this.router.navigateByUrl(route)
  }


}
