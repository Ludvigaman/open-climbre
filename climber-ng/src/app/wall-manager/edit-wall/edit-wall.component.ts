import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { Color } from 'src/app/_Models/color';
import { Grade } from 'src/app/_Models/grade';
import { Type } from 'src/app/_Models/type';
import { User } from 'src/app/_Models/user';
import { Wall } from 'src/app/_Models/wall';
import { UserServiceService } from 'src/app/_Services/user-service.service';
import { WallServiceService } from 'src/app/_Services/wall-service.service';
import { WallManagerComponent } from '../wall-manager.component';
import { Builder } from 'src/app/_Models/builder';
import { Anchors, Colors, Types, Grades } from 'src/app/constants/constants';

@Component({
  selector: 'app-edit-wall',
  templateUrl: './edit-wall.component.html',
  styleUrls: ['./edit-wall.component.css']
})
export class EditWallComponent implements OnInit{

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
    dateCreated: new FormControl(''),
    dateRemoved: new FormControl('')
  });

  wall: Wall;

  router: Router;

  user: User;

  constructor(@Inject (MAT_DIALOG_DATA) public data: Wall, public dialogRef: MatDialogRef<WallManagerComponent>, private wallService: WallServiceService, private userService: UserServiceService, router: Router, public dialog: MatDialog){
    this.router = router;
    this.wall = data;
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
          })
             
        } else {
          
          this.user = this.userService.getUser();
          this.loadBuilders();
        }

      });
    } else {
      this.router.navigateByUrl("login");
    }

    var types: Type[] = JSON.parse(this.wall.typesJSON);

    this.registerForm.get('name')?.setValue(this.wall.name);
    this.registerForm.get('anchor')?.setValue(this.wall.anchor);
    this.registerForm.get('color')?.setValue(this.getColorName(this.wall.color));
    this.registerForm.get('grade')?.setValue(this.getGradeName(this.wall.grade));
    this.registerForm.get('anchor')?.setValue(this.wall.anchor);
    this.registerForm.get('type')?.setValue(types as never[]);
    this.registerForm.get('dateCreated')?.setValue(new Date(this.wall.created).toISOString().split('T')[0]);

    if(this.wall.removed != null || undefined){
      this.registerForm.get('dateRemoved')?.setValue(new Date(this.wall.removed!).toISOString().split('T')[0]);
    }

    this.registerForm.get('description')?.setValue(this.wall.description ? this.wall.description : '');

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
      var b = this.builderList.find(b => b.id == this.wall.userId);
    
      if(b != undefined || null){
        this.builder = this.builderList.find(b => b.id == this.wall.userId)!;
      }
    }) 
  }

  onSubmit(){
    this.wall.name = this.registerForm.controls.name.value!;
    this.wall.anchor = this.registerForm.controls.anchor.value!;
    this.wall.created = new Date(this.registerForm.controls.dateCreated.value!);
    this.wall.color = Color[this.registerForm.controls.color.value! as keyof typeof Color];
    this.wall.description = this.registerForm.controls.description.value!;
    this.wall.grade = Grade[this.registerForm.controls.grade.value! as keyof typeof Grade];
  
    if(this.registerForm.controls.dateRemoved.value! == null || undefined){
      this.wall.removed = undefined;
    } else {
      this.wall.removed = new Date(this.registerForm.controls.dateRemoved.value!);
    }

    var stringArray = this.registerForm.controls.type.value! as string[];

    const typeArray: Type[] = [];
    stringArray.forEach(s => {
      var type = Type[s as keyof typeof Type]
      typeArray.push(type);
    });
    this.wall.typesJSON = JSON.stringify(typeArray);

    this.wallService.editWall(this.wall).subscribe(result => {
      this.close();
    })


  }
  getTypeName(typeValue: string){
    return Type[typeValue as keyof typeof Type].toString();
  }

  getBuilderName(builderId: number){
    return this.builderList.find(b => b.id == builderId)?.name;
  }

  getGradeName(gradeValue: number){
    return Grade[gradeValue].toString();
  }

  getColorName(colorValue: number){
    return Color[colorValue].toString();
  }

  close(){
    this.dialogRef.close();
  }

}