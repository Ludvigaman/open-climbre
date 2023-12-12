import { Component, OnInit } from '@angular/core';
import { Color } from '../_Models/color';
import { UserRating } from '../_Models/userRating';
import { Rating } from '../_Models/rating';
import { User } from '../_Models/user';
import { Wall } from '../_Models/wall';
import { Star } from '../_Models/star';
import { Grade } from '../_Models/grade';
import { Type } from '../_Models/type';
import { AuthenticateResponse } from '../_Auth/AuthenticateResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { WallServiceService } from '../_Services/wall-service.service';
import { UserServiceService } from '../_Services/user-service.service';
import { UserWallProgress } from '../_Models/userWallProgress';

@Component({
  selector: 'app-wall-view',
  templateUrl: './wall-view.component.html',
  styleUrls: ['./wall-view.component.css']
})
export class WallViewComponent implements OnInit {

  wallId: string | null;
  router: Router;
  wall: Wall;
  authorName: string;
  grade: Grade;
  parsedTypes: Type[];
  progress: UserWallProgress;
  user: User;
  isSignedIn = false;
  totalTries = 0;
  totalCompletes = 0;
  wallRemoved = false;

  loading = true;

  constructor(router: Router, private route: ActivatedRoute, private wallService: WallServiceService, private userService: UserServiceService){
    this.router = router;
  }

  ngOnInit(){

    this.wallId = this.route.snapshot.paramMap.get('id');

    if(this.wallId != null || undefined){
      this.wallService.getWall(this.wallId!).subscribe(r => {
        this.wall = r as Wall;  

        this.userService.getName(this.wall.userId).subscribe(r => {
          this.authorName = r;
        })
        this.user = this.userService.getUser();
        if(this.user != undefined){
          this.isSignedIn = true;
          this.userService.getProgressList(this.user.id).subscribe(r => {            
            var progressList = r as UserWallProgress[];
  
            var p = progressList.find(p => p.wallId == this.wallId && p.userId == this.user.id);
            if(p != undefined){
              this.progress = p;
            }
          }) 

          this.userService.getProgressListForWall(this.wall.id).subscribe(c => {
            console.log(c);
            
            c.forEach(tracker => {
              this.totalTries = this.totalTries + tracker.attempts;
              if(tracker.completed == true){
                this.totalCompletes++;
              }
            });
            
          })
        }
        this.loading = false;  

      })
    }
  
  }

  createTypeString(json: any){
    var types = JSON.parse(json) as string[];
    var string: string = "";
    types.forEach(t => {
      string = string + "#" + t + " ";
    })
    return string;
  }

  archiveProgress(){
    var confirmation = confirm("Are you sure you want to archive this tracker? After you've archived it, you can no longer change it.");
    if(confirmation){
      this.progress.archived = true;
      this.updateProgress();
    }
  }

  markAsComplete(){
    if(this.progress.attempts == 0){
      this.progress.attempts++;
    }
    this.progress.completed = true;
    this.updateProgress();
  }

  unMarkAsComplete(){
    this.progress.completed = false;
    this.updateProgress();
  }

  addProgress(){
    this.progress.attempts++;
    this.updateProgress();
  }

  addToMyList(wallId: string){
   
      this.progress = new UserWallProgress();
      this.progress.attempts = 0;
      this.progress.completed = false;
      this.progress.userId = this.user.id;
      this.progress.wallId = wallId;

      this.userService.updateProgress(this.progress).subscribe(r => {
        this.progress = r;
        
      })
  }

  removeProgress(){
    this.progress.attempts--;

    if(this.progress.attempts == 0){
      this.progress.completed = false;
    } 

    if(this.progress.attempts < 0){
      this.progress.attempts = 0;
    }

    this.updateProgress();
  }

  deleteProgress(){
    var confirmation = confirm("Are you sure you want to remove all progress?");
    if(confirmation){
      this.userService.deleteProgress(this.progress.id).subscribe(r => {
        if(r){
          window.location.reload();
        } else {
          alert("Error...")
        }
      })
    }
  }

  updateProgress(){
    this.userService.updateProgress(this.progress).subscribe(r => {     
    })
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
  
  navigate(route: string){
    this.router.navigateByUrl(route)
  }

}
