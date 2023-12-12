import { Component, OnInit } from '@angular/core';
import { WallServiceService } from '../_Services/wall-service.service';
import { Wall } from '../_Models/wall';
import { Anchors, Grades } from '../constants/constants';
import { Grade } from '../_Models/grade';
import { Color } from '../_Models/color';
import { Router } from '@angular/router';

@Component({
  selector: 'app-route-graphs',
  templateUrl: './route-graphs.component.html',
  styleUrls: ['./route-graphs.component.css']
})
export class RouteGraphsComponent implements OnInit{
  
  chart: any; 
  wallService: WallServiceService;
  walls: Wall[];
  anchors = Anchors;
  grades = Grades;

  router: Router;

  constructor(wallService: WallServiceService, router: Router){
    this.wallService = wallService;
    this.router = router;
  }

  ngOnInit() {
    this.wallService.allWalls().subscribe(w => {
      this.walls = w.filter(wall => wall.removed == null);     
    });

  }

  navigate(route: string){
    this.router.navigateByUrl(route)
  }

  getGradeName(gradeValue: number){
    return Grade[gradeValue]
  }

  getColorName(colorValue: number){    
    return Color[colorValue];
  }
}
