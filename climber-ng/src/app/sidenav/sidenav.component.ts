import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateResponse } from '../_Auth/AuthenticateResponse';
import { UserServiceService } from '../_Services/user-service.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{

  collapsed = false;
  navData = navbarData;
  name: string;
  isSignedIn = false;
  isAdmin = false;
  screenWidth: number;
  screenHeight: number;
  isBuilder = false;

  router: Router;

  constructor(router: Router, private userService: UserServiceService){
    this.router = router;
  }

  ngOnInit() {  
    this.screenWidth = window.innerWidth;  
    this.screenHeight = window.innerHeight;  

    var user = JSON.parse(localStorage.getItem("user")!) as AuthenticateResponse;
    if(user != null){

      this.userService.validateLogin().subscribe(r => {
        if(r != 0){

          this.navData[0].routeLink = 'home';
          
          this.navData.push(
            { 
              routeLink: 'profile',
              icon: 'person',
              label: 'Profile'
            });

          var user = JSON.parse(localStorage.getItem("user")!) as AuthenticateResponse;
          this.name = user.name;
          this.isSignedIn = true;

          this.userService.isAdmin().subscribe(r => {
            if(r == false){
              
              this.userService.isBuilder().subscribe(res => {
                if(res == true){
                  this.isBuilder = true;
                  console.log("Role: BUILDER")
                  this.addManager();
                } 
              });
            } else {
              this.isAdmin = true;
              console.log("Role: ADMIN")
              this.addManager();
              this.addAdmin();
            }
          });

        } else {
          localStorage.removeItem("user");
          window.location.reload();
        }
      });

    } else {
      localStorage.removeItem("user");
    }

  }  

  navigate(route: string){   
    this.router.navigateByUrl(route)
  }

  addManager(){
    this.navData.push({
      routeLink: 'wallManager',
      icon: 'library_add',
      label: 'Builder'
    });
  }

  addAdmin(){
    this.navData.push({
      routeLink: 'admin',
      icon: 'power_settings_new',
      label: 'Admin'
    });
  }

  @HostListener('window:resize', ['$event'])  
  onResize() {  
    this.screenWidth = window.innerWidth;  
    this.screenHeight = window.innerHeight;  
  } 

}

export const navbarData = [
  { 
    routeLink: '',
    icon: 'home',
    label: 'Home'
  },
  { 
    routeLink: 'wall-list',
    icon: 'timeline',
    label: 'Routes'
  },
  {
    routeLink: 'graph',
    icon: 'bar_chart',
    label: 'Statistics'
  },
  {
    routeLink: 'contact',
    icon: 'email',
    label: 'Contact'
  }
];
