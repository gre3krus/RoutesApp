import { Component, OnInit, Input} from '@angular/core';
import { RouterService, RoutingType, travel } from 'src/app/services/router.service'

@Component({
  selector: 'app-road',
  templateUrl: './road.component.html',
  styleUrls: ['./road.component.scss']
})
export class RoadComponent implements OnInit {
  @Input() selectedStart?: RoutingType
  @Input() selectedFinish!: RoutingType
  openTable: boolean = false
  route: any[] = []

  constructor(public routerService: RouterService) {this.routerService.jsonRouter = []}


  ngOnInit(): void {
    this.routerService.getJsonRouter()
  }

  getRoad(): void {
    if (!this.selectedStart || !this.selectedFinish) {
      return console.log('Выберите города');
    }

    let filtered = this.selectedStart.travel.filter((city: travel) => {
      return city.to === this.selectedFinish.from
    })

    for(let get of filtered){
      this.route.push({
        from: this.selectedStart.from,
        to: this.selectedFinish.from,
        price: get.price,
        time: get.time
      })
      console.log(`Цена: ${get.price} рублей, Время: ${get.time}`)
    }
    this.openTable = !this.openTable
    if(this.openTable === false){
      this.route = []
    } else if(this.route.length === 0){
      this.openTable = false
      alert('Маршрут не найден')
    }

    console.log(this.route)
  }
}
