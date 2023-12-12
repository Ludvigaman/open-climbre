import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../_Services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  router: Router;
  isSignedIn = false;
  error = false;
  errorMessage = '';
  hide = true;

  constructor(router: Router, private http: HttpClient, private userService: UserServiceService){
    this.router = router;
  }

  ngOnInit(){
    this.userService.validateLogin().subscribe(r => {
      if(r != 0){
        this.navigate("home")
      } else {
        localStorage.removeItem("user");
        window.location.reload();
      }
    });
  }

  authenticate(username: string, password: string){
    this.userService.authenticate(username, password).subscribe(response => {
      console.log(response)
      localStorage.setItem("user", JSON.stringify(response));
      window.location.reload();
    }, err => {
      var error = err as HttpErrorResponse;
      if(error.error.message.includes("Username")){
        this.error = true;
        this.errorMessage = error.error.message;
      }
    });
  }

  navigate(route: string){
    this.router.navigateByUrl(route)
  }


}
