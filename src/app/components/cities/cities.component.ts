import { Component, OnInit } from '@angular/core';
import { RouterService, RoutingType } from 'src/app/services/router.service';


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})

export class CitiesComponent implements OnInit {
  start: string = ''
  finish: string = ''
  openStart: boolean = false
  openFinish: boolean = false

  constructor(public routerService: RouterService) {this.routerService.jsonRouter = []}
  

  ngOnInit(): void {
    this.routerService.getJsonRouter()
  }

  dropStart(): any {
    this.openStart = !this.openStart
    if(this.openFinish === true) {
      this.openFinish = !this.openFinish
    }
  }

  dropFinish(): any {
    this.openFinish = !this.openFinish
    if(this.openStart === true){
      this.openStart = !this.openStart
    }
  }

  addStart() {
    if (this.start) {
      
    }
  }

  addFinish() {
    if (this.finish) {
      
    }
  }
}
