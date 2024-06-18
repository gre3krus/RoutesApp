import { Component, OnInit, Input} from '@angular/core';
import { RouterService, RoutingType } from 'src/app/services/router.service'

@Component({
  selector: 'app-road',
  templateUrl: './road.component.html',
  styleUrls: ['./road.component.scss']
})

export class RoadComponent implements OnInit {
  @Input() selectedStart?: RoutingType
  @Input() selectedFinish!: RoutingType
  @Input() changeStandart: boolean = false
  @Input() changeFaster: boolean = false
  openTable: boolean = false
  route: any[] = []
  total: any[] = []
  totalPrice: number = 0
  totalTime: number = 0

  constructor(public routerService: RouterService) {this.routerService.jsonRouter = []}


  ngOnInit(): void {
    this.routerService.getJsonRouter()
  }

  getRoad(): any {
    if (!this.selectedStart || !this.selectedFinish) {
      return alert('Выберите маршрут')
    } else if(this.changeStandart === false && this.changeFaster === false){
      return alert('Выберите Стандартно или Быстро')
    }

    this.route = [];
    this.total = []
    this.totalPrice = 0
    this.totalTime = 0
    this.findRoutes(this.selectedStart.from, this.selectedFinish.from, []);

    this.openTable = this.route.length > 0;
    if (!this.openTable) {
      alert('Маршрут не найден')
    }

    this.total.push({
      totalP: this.totalPrice,
      totalT: this.totalTime
    })
  }

  findRoutes(currentCity: string, targetCity: string, visited: any[]): any {
    if (currentCity === targetCity) {
      return true
    }

    const currentRoutes = this.routerService.jsonRouter.find((road: RoutingType) => road.from === currentCity)
    if (!currentRoutes) {
      return false
    }

    for (let travel of currentRoutes.travel) {
      if (!visited.includes(travel.to)) {
        visited.push(travel.to)

        this.route.push({
          from: currentCity,
          to: travel.to,
          price: travel.price,
          time: travel.time,
        })

        if (this.findRoutes(travel.to, targetCity, visited)) {
          this.totalPrice += travel.price
          this.totalTime += travel.time
          return true
        }
  
        this.route.pop()
        visited.pop()
      }
    }

    console.log(this.route)
    return false
  }
}
