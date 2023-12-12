import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {

  router: Router

  constructor(router: Router){
    this.router = router;
  }

  navigate(route: string){
    this.router.navigateByUrl(route)
  }

  sendTo(url: string){
    window.open(url, "_blank")
  }

}
