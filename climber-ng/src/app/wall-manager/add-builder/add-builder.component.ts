import { Component } from '@angular/core';
import { WallManagerComponent } from '../wall-manager.component';
import { MatDialogRef } from '@angular/material/dialog';
import { UserServiceService } from 'src/app/_Services/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/_Models/user';

@Component({
  selector: 'app-add-builder',
  templateUrl: './add-builder.component.html',
  styleUrls: ['./add-builder.component.css']
})
export class AddBuilderComponent {

  title = 'Add new builder';
  inputValue = "";
  error = false;

  constructor(public dialogRef: MatDialogRef<WallManagerComponent>, private userService: UserServiceService) {}

  save() {
    if(this.inputValue.length > 1){
      this.userService.addBuilder(this.inputValue).subscribe(r => {
        var err = r as HttpErrorResponse;
        var ok = r as User;
        if(err.error != undefined){
          this.error = true;
        } else {
          this.dialogRef.close(ok);
        }
      })
    } else {
      this.error = true;
    }
  }

}
