import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../_Services/user-service.service';
import { WallServiceService } from '../_Services/wall-service.service';
import { User } from '../_Models/user';
import { Wall } from '../_Models/wall';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userList: User[];
  builders: User[];

  walls: Wall[];

  router: Router;

  constructor(private wallService: WallServiceService, private userService: UserServiceService, router: Router){
    this.router = router;
  }

  ngOnInit(){
    if(localStorage.getItem("user") != null || undefined){

      this.userService.getAllUsers().subscribe(r => {
        this.userList = r;
        console.log(r);
        
      })

      this.wallService.allWalls().subscribe(r => {
        this.walls = r;
        console.log(r);
        
      })

      this.userService.getAllBuilders().subscribe(r => {
        this.builders = r;
        console.log(r);
        
      })
      
      this.userService.isAdmin().subscribe(r => {
        if(r == false){
          this.router.navigateByUrl('login');
        } else {

          //is Admin

        }

      });

    } else {
      this.router.navigateByUrl('login');
    }
  }
}
