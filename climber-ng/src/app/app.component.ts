import { Component, OnInit } from '@angular/core';
import { User } from './_Models/user';
import { UserServiceService } from './_Services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'climber';

  constructor(){
  }

  ngOnInit(){
  }

}
