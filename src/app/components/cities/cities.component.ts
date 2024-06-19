import { Component, OnInit } from '@angular/core';
import { RouterService, RoutingType } from 'src/app/services/router.service';


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})

export class CitiesComponent implements OnInit {
  start?: RoutingType
  finish?: RoutingType

  openStart: boolean = false
  openFinish: boolean = false

  economy: boolean = false
  faster: boolean = false
  lowTransfers: boolean = false

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

  handleChangeEconomy(): any {
    this.economy = !this.economy
    if(this.economy === true){
      this.faster = false
      this.lowTransfers = false
    }
  }

  handleChangeFaster(): any {
    this.faster = !this.faster
    if(this.faster === true){
      this.economy = false
      this.lowTransfers = false
    }
  }

  handleChangeLowTransfers(): any {
    this.lowTransfers = !this.lowTransfers
    if(this.lowTransfers === true){
      this.economy = false
      this.faster = false
    }
  }
}
