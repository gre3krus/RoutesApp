import { Component, OnInit } from '@angular/core';
import { RouterService, RoutingType } from 'src/app/services/router.service';


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})

export class CitiesComponent implements OnInit {
  start?: RoutingType
  finish!: RoutingType
  selectedCity!: RoutingType
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

  getStart(city: RoutingType): any {
    this.start = city
    console.log(city.from)
  }

  getFinish(cities: RoutingType): any {
    this.finish = cities
    console.log(cities.from)
  }
}
