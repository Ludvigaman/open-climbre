import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { User } from '../_Models/user';
import { AuthenticateResponse } from '../_Auth/AuthenticateResponse';
import { UserServiceService } from '../_Services/user-service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isSignedIn = false;
  name: string;

  //user: User;
  constructor(private router: Router, private userService: UserServiceService){
  }

  ngOnInit(){
    this.userService.validateLogin().subscribe(r => {
      if(r != 0){
        var user = JSON.parse(localStorage.getItem("user")!) as AuthenticateResponse;
        this.name = user.name;
        this.isSignedIn = true;
      } else {
        localStorage.removeItem("user");
        window.location.reload();
      }
    });
  }

  navigate(route: string){
    this.router.navigateByUrl(route)
  }

  signOut(){
    localStorage.clear();
    window.location.reload();
  }

}
