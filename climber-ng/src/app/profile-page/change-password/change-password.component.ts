import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/_Services/user-service.service';
import { EMAIL_REGEX, PASSWORD_REGEX } from 'src/app/constants/constants';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  
  emailValid = true;
  email = '';
  error = false;
  errorMessage = '';

  resetToken: string | null;

  success = false;

  tokenProvided = false;


  constructor(private router: Router, private userService: UserServiceService, private route: ActivatedRoute){
  }

  ngOnInit(){
    this.resetToken = this.route.snapshot.paramMap.get('resetToken');
    if(this.resetToken == "" || undefined){
      //No token provided, continue to request page
    } else if (this.resetToken!.length > 0){
      //Token provied, switch to reset modes

      this.userService.resetPassword(this.resetToken!).subscribe(r => {
        if(r == false){
          this.tokenProvided = true;
        } else {
          this.success = true;
        }
      })
    }
  }
  
  navigate(route: string){
    this.router.navigateByUrl(route)
  }
  
  reset(){
    this.emailValid = this.validateEmail(this.email);

    if (this.emailValid){

      this.userService.requestPassword(this.email).subscribe(r => {
        if(r == false){
          this.error = true;
          this.errorMessage = "There's no account associated with this email."
        } else {
          this.success = true;
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
}
