import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../_Services/user-service.service';
import { Wall } from '../_Models/wall';
import { WallServiceService } from '../_Services/wall-service.service';
import { Color } from '../_Models/color';
import { Grade } from '../_Models/grade';
import { Anchors, Grades } from '../constants/constants';
import { UserWallProgress } from '../_Models/userWallProgress';
import { User } from '../_Models/user';

@Component({
  selector: 'app-wall-list',
  templateUrl: './wall-list.component.html',
  styleUrls: ['./wall-list.component.css']
})
export class WallListComponent implements OnInit {

  router: Router;
  grades: number[] = [];
  availableGrades: string[] = [];
  anchors: number[] = [];
  grade = Grade;
  statuses: string[] = ["In tracker", "Not in tracker", "Not started", "In progress", "Flashed", "Completed"];
  selectedStatus: string;
  anchor: number;
  walls: Wall[];
  filteredWalls: Wall[];
  progressList: UserWallProgress[] = [];
  user: User;
  isLoggedIn: boolean = false;

  hideFilters = true;

  gradeOrder: string = "";
  dateOrder: string = "";
  archive: string = "";

  constructor(router: Router, private userService: UserServiceService, private wallService: WallServiceService){
    this.router = router;
  }

  ngOnInit(){
    this.wallService.allWalls().subscribe(w => {
      this.walls = w;
      
      this.filteredWalls = w.filter(wall => wall.removed == null);
      this.filteredWalls = this.filteredWalls.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
      this.walls.forEach(w => {
        if (!this.grades.includes(w.grade as number)){
          this.grades.push(w.grade as number);          
        }
        this.grades.sort(function (a, b) {  return a - b;  });
        this.anchors.sort(function (a, b) {  return a - b;  });

        if(!this.anchors.includes(w.anchor)){
          this.anchors.push(w.anchor)
        }
      });
      this.grades.forEach(g => {
        if(!this.availableGrades.includes(Grade[g])){
          this.availableGrades.push(Grade[g]);
        }
      }) 

      this.user = this.userService.getUser();
      if(this.user != undefined || null){
        this.isLoggedIn = true;
        this.userService.getProgressList(this.user.id).subscribe(r => {
          this.progressList = r;
        });
      }


    });
  }

  isNew(created: Date) {   
    var today = new Date();
    var yearNow = today.getFullYear().toString();
    var monthNow = today.getMonth().toString();
    var year = created.toString().substring(0, 4);
    var month = created.toString().substring(5,7);

    var monthNowInt = parseInt(monthNow);
    var monthInt = parseInt(month);  

    if(monthNow.length == 1){
      monthNow = "0" + monthNow;      
    }

    if(yearNow == year){
      if(monthInt >= monthNowInt && monthInt <= (monthNowInt + 1)) {
        return true;
      }
    }

    return false;
    
  }

  orderByDifficulty(){
    if(this.gradeOrder == "difficult"){   
      this.filteredWalls = this.filteredWalls.sort((b, a) => a.grade.valueOf() - b.grade.valueOf())
    } else if(this.gradeOrder == "easy"){
      this.filteredWalls = this.filteredWalls.sort((a, b) => a.grade.valueOf() - b.grade.valueOf())
    }    
  }

  orderByDate(){    
    if(this.dateOrder == "latest"){
      this.filteredWalls = this.filteredWalls.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
    } else if(this.dateOrder == "oldest"){
      this.filteredWalls = this.filteredWalls.sort((b, a) => new Date(b.created).getTime() - new Date(a.created).getTime())
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

  filterGrade(){
    this.selectedStatus = "";
    if(this.grade.toString() == '0'){
      this.clear();      
    } else {
      this.filteredWalls = this.walls;
      var grade = Grade[this.grade.toString() as keyof typeof Grade]
      this.filteredWalls = this.filteredWalls.filter(w => w.grade == grade)
    }

  }

  filterArchive() {
    if(this.archive == "yes"){
      this.filteredWalls = this.walls;
    } else {
      this.filteredWalls = this.walls.filter(wall => wall.removed == null);
    }
    this.filteredWalls = this.filteredWalls.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())

  }

  filterAnchor(){ 
    this.selectedStatus = "";
    if(this.anchor.toString() == '0'){
      this.clear();      
    } else {
      this.filteredWalls = this.walls;
      this.filteredWalls = this.filteredWalls.filter(w => w.anchor == this.anchor)
    }
  }

  filterStatus(){
    if(this.isLoggedIn){

      if(this.selectedStatus.toString() == '0'){
        this.clear();      
      } else {
        if(this.selectedStatus == "Not in tracker"){

          var excludedWalls: string[] = [];
          this.progressList.forEach(p => {
            excludedWalls.push(p.wallId);
          });

          this.filteredWalls = this.walls;
          this.filteredWalls = this.filteredWalls.filter(w => !excludedWalls.includes(w.id));

        } else if (this.selectedStatus == "In tracker"){
          
          var includedWalls: string[] = [];
          this.progressList.forEach(p => {
            includedWalls.push(p.wallId);
          });

          this.filteredWalls = this.walls;
          this.filteredWalls = this.filteredWalls.filter(w => includedWalls.includes(w.id));

        } else {
          var wallList: string[] = [];
          this.progressList.forEach(p => {
  
            switch(this.selectedStatus){
              case "Not started":
                if(p.completed == false && p.attempts == 0){
                  wallList.push(p.wallId);
                }
                break;
              case "In progress":
                if(p.attempts >= 1 && p.completed == false)
                wallList.push(p.wallId);
                break;
              case "Flashed":
                if(p.attempts == 1 && p.completed == true)
                wallList.push(p.wallId);
                break;
              case "Completed":
                if(p.attempts > 1 && p.completed == true)
                wallList.push(p.wallId);
                break;
            }
          })        
          
          this.filteredWalls = this.walls;
          this.filteredWalls = this.filteredWalls.filter(w => wallList.includes(w.id)); 
        }
        
      }
    }
    
  }

  inMyList(wallId: string){
    
    var entry = this.progressList.find(p => p.wallId == wallId && p.userId == this.user.id);
    if(entry == null || undefined){
      return false;
    } else {
      return true;
    }
  }

  getProgressStatus(entry: UserWallProgress){

    if(entry.attempts >= 0 && entry.archived == true && entry.completed == false){
      return 5
    }
    
    if(entry.completed == false && entry.attempts == 0){
      return 0;
      //Not started
    }

    if(entry.attempts == 1 && entry.completed == true){
      return 1;
      //Flash
    }

    if(entry.attempts >= 1 && entry.completed == false){
      return 2;
      //WIP
    }

    if(entry.attempts > 1 && entry.completed == true){
      return 3;
    }

    return 4;
  }

  trackerStatus(wallId: string){
    if(this.isLoggedIn){

      var entry = this.progressList.find(p => p.wallId == wallId && p.userId == this.user.id);

      if(entry != undefined){
        
        return this.getProgressStatus(entry);

      } else {
        return 4;
      }
    } else {
      return 4;
    }
  }

  addToMyList(wallId: string){    
    var entry = this.progressList.find(p => p.wallId == wallId && p.userId == this.user.id);

    if(entry == null){
      entry = new UserWallProgress();
      entry.attempts = 0;
      entry.completed = false;
      entry.userId = this.user.id;
      entry.wallId = wallId;

      this.userService.updateProgress(entry).subscribe(r => {
        this.progressList.push(r);
      })

    } else {
      // do something to update it?
      console.log("Already in your list");
      
    }
  }

  clear(){
    this.filteredWalls = this.walls;
    this.selectedStatus = "";
    this.anchor= Number.NaN;
    this.grade = Grade;
  }

  clearSort(){
    this.filteredWalls = this.walls;
    this.dateOrder = "";
    this.gradeOrder = "";
    this.archive = "";
  }

  navigate(route: string){
    this.router.navigateByUrl(route)
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
