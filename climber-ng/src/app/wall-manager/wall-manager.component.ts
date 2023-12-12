import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { WallServiceService } from '../_Services/wall-service.service';
import { UserServiceService } from '../_Services/user-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Wall } from '../_Models/wall';
import { AddWallComponent } from './add-wall/add-wall.component';
import { Color } from '../_Models/color';
import { Grade } from '../_Models/grade';
import { User } from '../_Models/user';
import { EditWallComponent } from './edit-wall/edit-wall.component';
import { AddBuilderComponent } from './add-builder/add-builder.component';
import { Builder } from '../_Models/builder';

@Component({
  selector: 'app-wall-manager',
  templateUrl: './wall-manager.component.html',
  styleUrls: ['./wall-manager.component.css']
})
export class WallManagerComponent implements OnInit{

  router: Router;

  isLoading = true;
  isAdmin = false;
  isBuilder = false;

  dataSource = new MatTableDataSource<Wall>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Wall>;

  displayColumns = ['name', 'grade', 'color', 'anchor', 'rating', 'authorId', 'created', 'removed', 'config'];

  userList: User[];
  notBuilder = false;

  constructor(private wallService: WallServiceService, private userService: UserServiceService, router: Router, public dialog: MatDialog){
    this.router = router;
  }

  ngOnInit(){

    if(localStorage.getItem("user") != null || undefined){

      this.userService.getAllUsers().subscribe(r => {
        this.userList = r;
      })
      
      this.userService.isAdmin().subscribe(r => {
        if(r == false){
          
          this.userService.isBuilder().subscribe(r => {
            if(r == true){
              this.isBuilder = true;
              this.loadData();
              this.isLoading = false;
            
            } else {
              this.router.navigateByUrl('login');
            }
          })
        } else {
          this.isAdmin = true;
          this.loadData();
          this.isLoading = false;
        }

      });

    } else {
      this.router.navigateByUrl('login');
    }

  }

  loadData(){
    this.wallService.allWalls().subscribe(w => {
      this.dataSource = new MatTableDataSource(w);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.table.dataSource = this.dataSource;
    })
  }

  editWall(row: Wall){
    let dialogRef = this.dialog.open(EditWallComponent, {data: row});

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    })
  }
  
  addBuilder(){
    let dialogRef = this.dialog.open(AddBuilderComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
    })
  }

  markWallAsRemoved(id: string){
    var result = confirm("Are you sure you want to mark this wall as removed?");
    if(result){
      this.wallService.markWallAsRemoved(id).subscribe(r => {
        window.location.reload();
      })
    }
  }

  deleteWall(id: string){
    var result = confirm("This wall will be deleted permanently, are you sure?");
    if(result){
      this.wallService.deleteWall(id).subscribe(r => {
        window.location.reload();
      })
    }
  }

  addWall(){
    let dialogRef = this.dialog.open(AddWallComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.loadData();
    })
  }

  getUserName(userId: number){
    return this.userList.find(u => u.id == userId)?.name;
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
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
