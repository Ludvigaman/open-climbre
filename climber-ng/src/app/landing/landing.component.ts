import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateResponse } from '../_Auth/AuthenticateResponse';
import { UserServiceService } from '../_Services/user-service.service';
import { User } from '../_Models/user';
import { UserWallProgress } from '../_Models/userWallProgress';
import { Wall } from '../_Models/wall';
import { WallServiceService } from '../_Services/wall-service.service';
import { Type } from '../_Models/type';
import { Grade } from '../_Models/grade';
import { Color } from '../_Models/color';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  
  isSignedIn = false;
  name: string;
  user: User;

  walls: Wall[];
  activeWalls: Wall[];
  excludedWalls: Wall[];
  completedWalls: Wall[];
  unfinishedWalls: Wall[];


  progressList: UserWallProgress[] = [];

  constructor(private router: Router, private userService: UserServiceService, private wallService: WallServiceService){
  }

  ngOnInit(){
    this.userService.validateLogin().subscribe(r => {
      if(r != 0){
        this.user = JSON.parse(localStorage.getItem("user")!) as AuthenticateResponse;
        this.name = this.user.name;
        this.isSignedIn = true;

        this.wallService.allWalls().subscribe(w => {
          this.walls = w;  
          
          this.userService.getProgressList(this.user.id).subscribe(r => {
            this.progressList = r;
  
            var completedWalls: string[] = [];
            var activeWalls: string[] = [];
            var excludedWalls: string[] = [];
            var unfinishedWalls: string[] = [];

            this.progressList.forEach(p => {
             
              if(p.completed == true){
                //Wall is completed
                completedWalls.push(p.wallId);
              } else if (p.completed == false && p.attempts >= 0) {
                
                var wall = this.walls.find(w => w.id == p.wallId);
                if(wall?.removed != null){
                  //Wall is in tracker, but has been dismantled
                  unfinishedWalls.push(p.wallId)
                } else {
                  //Wall is in tracker
                  activeWalls.push(p.wallId);   
                }             
              } 
                
              excludedWalls.push(p.wallId); 
                             
            });

            this.excludedWalls = this.walls;
            this.excludedWalls = this.excludedWalls.filter(w => !excludedWalls.includes(w.id));
            this.excludedWalls.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  
            this.completedWalls = this.walls;
            this.completedWalls = this.completedWalls.filter(w => completedWalls.includes(w.id));       
            this.completedWalls.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
          
            this.activeWalls = this.walls;
            this.activeWalls = this.activeWalls.filter(w => activeWalls.includes(w.id));
            this.activeWalls.sort((a, b) => this.getAttempts(b.id)! - this.getAttempts(a.id)!);

            this.unfinishedWalls = this.walls;
            this.unfinishedWalls = this.unfinishedWalls.filter(w => unfinishedWalls.includes(w.id));
            this.unfinishedWalls.sort((a, b) => this.getAttempts(b.id)! - this.getAttempts(a.id)!);


          });


        });


      } else {
        localStorage.removeItem("user");
        window.location.reload();
      }
    });

  }

  navigate(route: string){
    this.router.navigateByUrl(route)
  }

  getAttempts(wallId: string){
    return this.progressList.find(p => p.wallId == wallId)?.attempts;
  }

  getComplete(wallId: string){
    return this.progressList.find(w => w.id == wallId)?.completed;
  }
  
  getTypeName(typeValue: string){
    return Type[typeValue as keyof typeof Type];
  }

  getGradeName(gradeValue: number){
    return Grade[gradeValue]
  }

  getColorName(colorValue: number){
    return Color[colorValue];
  }

  
}
