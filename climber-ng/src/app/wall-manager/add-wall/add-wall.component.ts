import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { Builder } from 'src/app/_Models/builder';
import { Color } from 'src/app/_Models/color';
import { Grade } from 'src/app/_Models/grade';
import { Type } from 'src/app/_Models/type';
import { User } from 'src/app/_Models/user';
import { Wall } from 'src/app/_Models/wall';
import { UserServiceService } from 'src/app/_Services/user-service.service';
import { WallServiceService } from 'src/app/_Services/wall-service.service';
import { Anchors, Colors, Types, Grades } from 'src/app/constants/constants';


@Component({
  selector: 'app-add-wall',
  templateUrl: './add-wall.component.html',
  styleUrls: ['./add-wall.component.css']
})
export class AddWallComponent implements OnInit{

  anchors = Anchors;
  colors = Colors;
  types = Types;
  grades = Grades;

  builderList: Builder[] = [];
  builder: Builder;

  registerForm = new FormGroup({
    name: new FormControl(''),
    anchor: new FormControl(0),
    color: new FormControl(''),
    grade: new FormControl(''),
    type: new FormControl([]),
    builder: new FormControl([]),
    description: new FormControl(''),
    dateCreated: new FormControl('')
  });

  wall: Wall;

  router: Router;

  user: User;

  constructor(private wallService: WallServiceService, private userService: UserServiceService, router: Router, public dialog: MatDialog){
    this.router = router;
  }

  ngOnInit(){
    if(this.userService.getUser() != null || undefined){
      this.userService.isAdmin().subscribe(r => {
        if(r == false){ 
          
          this.userService.isBuilder().subscribe(res => {
           
            if(res == false){
              this.router.navigateByUrl("login");   
            } else {
              this.loadBuilders();
            }

          });  

        } else {
          this.user = this.userService.getUser();

          this.loadBuilders();
        }
      });
    } else {
      this.router.navigateByUrl("login");
    }
  }

  loadBuilders(){
    this.userService.getAllBuilders().subscribe(r => {
      r.forEach(b => {
        var builder = new Builder();
        builder.id = b.id;
        builder.name = b.name;
        builder.username = b.username;
        this.builderList.push(builder);
      })  
    }) 
  }

  onSubmit(){

    this.wall = new Wall();

    this.wall.userId = this.builder.id;

    this.wall.name = this.registerForm.controls.name.value!;
    this.wall.anchor = this.registerForm.controls.anchor.value!;
    this.wall.created = new Date(this.registerForm.controls.dateCreated.value!);
    this.wall.color = Color[this.registerForm.controls.color.value! as keyof typeof Color];
    this.wall.description = this.registerForm.controls.description.value!;
    this.wall.grade = Grade[this.registerForm.controls.grade.value! as keyof typeof Grade];

    var stringArray = this.registerForm.controls.type.value! as string[];

    const typeArray: Type[] = [];
    stringArray.forEach(s => {
      var type = Type[s as keyof typeof Type]
      typeArray.push(type);
    });
    this.wall.typesJSON = JSON.stringify(typeArray);

    this.wallService.addWall(this.wall).subscribe(result => {
      this.dialog.closeAll();
    })


  }

}

