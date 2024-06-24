import { Component, OnInit, Input} from '@angular/core';
import { RouterService, RoutingType } from 'src/app/services/router.service'

@Component({
  selector: 'app-road',
  templateUrl: './road.component.html',
  styleUrls: ['./road.component.scss']
})

export class RoadComponent implements OnInit {
  @Input() selectedStart?: RoutingType
  @Input() selectedFinish?: RoutingType;
  @Input() changeEconomy: boolean = false
  @Input() changeFaster: boolean = false
  @Input() changeLowTransfers: boolean = false
  openTable: boolean = false
  load: boolean = false
  route: any[] = []
  total: any[] = []
  totalPrice: number = 0
  totalTime: number = 0
  totalTransfers: number = 0

  constructor(public routerService: RouterService) {this.routerService.jsonRouter = []}


  ngOnInit(): void {
    this.routerService.getJsonRouter()
  }

  loader(): any {
    this.load = true
    setTimeout(() => {
      this.load = false
      this.getRoad()
    }, 600);

  }

  getRoad(): any {
    if (!this.selectedStart || !this.selectedFinish) {
      return alert('Выберите маршрут')
    } else if(this.changeEconomy === false && this.changeFaster === false && this.changeLowTransfers === false){
      this.openTable = false
      return alert('Выберите Экономно, Быстро или Меньше пересадок')
    }

    this.route = []
    this.total = []
    this.totalPrice = 0
    this.totalTime = 0
    this.totalTransfers = 0

    if(this.changeEconomy){
      this.findRoutesEconomy(this.selectedStart.from, this.selectedFinish.from, [])
    } else if(this.changeFaster) {
      this.findRoutesFastest(this.selectedStart.from, this.selectedFinish.from, [])
    } else if(this.changeLowTransfers) {
      this.findRoutesLowTransfers(this.selectedStart.from, this.selectedFinish.from, [])
    }

    this.openTable = this.route.length > 0
    if (!this.openTable) {
      alert('Маршрут не найден')
    }

    this.total.push({
      totalP: this.totalPrice,
      totalT: this.totalTime,
      totalTran: this.totalTransfers
    })
    console.log(this.route)
  }

  findRoutesEconomy(currentCity?: string, targetCity?: string, visited?: any[]): any{
    if (currentCity === targetCity) {
      return true
    }

    const currentRoutes = this.routerService.jsonRouter.find((road: RoutingType) => road.from === currentCity)

    if (!currentRoutes) {
      return false
    }

    for (let travel of currentRoutes.travel) {

        if (!visited?.includes(travel.to)) {
          visited?.push(travel.to)

          this.route.push({
            from: currentCity,
            to: travel.to,
            price: travel.price,
            time: travel.time,
          })
  
          if (this.findRoutesEconomy(travel.to, targetCity, visited)) {
            this.totalPrice += travel.price
            this.totalTime += travel.time
            this.totalTransfers = visited!.length - 1
            return true
          }
    
          this.route.pop()
          visited?.pop()
        }
    }
    return false
  }

  findRoutesFastest(currentCity?: string, targetCity?: string, visited?: any[]): any{
    if (currentCity === targetCity) {
      return true
    }

    const currentRoutes = this.routerService.jsonRouter.find((road: RoutingType) => road.from === currentCity)

    if (!currentRoutes) {
      return false
    }

    for (let travel of currentRoutes.travel) {

        if (!visited?.includes(travel.to)) {
          visited?.push(travel.to)

          this.route.push({
            from: currentCity,
            to: travel.to,
            price: travel.price,
            time: travel.time,
          })
  
          if (this.findRoutesEconomy(travel.to, targetCity, visited)) {
            this.totalPrice += travel.price
            this.totalTime += travel.time
            this.totalTransfers = visited!.length - 1
            return true
          }
    
          this.route.pop()
          visited?.pop()
        }
    }
    return false
  }

  findRoutesLowTransfers(currentCity?: string, targetCity?: string, visited?: any[]): boolean {
    if (currentCity === targetCity) {
      return true;
    }

    const currentRoutes = this.routerService.jsonRouter.find((road: RoutingType) => road.from === currentCity);
    if (!currentRoutes) {
      return false;
    }

    for (let travel of currentRoutes.travel) {
      if (!visited?.includes(travel.to)) {
        visited?.push(travel.to);
        this.route.push({
          from: currentCity,
          to: travel.to,
          price: travel.price,
          time: travel.time,
        });

        if (this.findRoutesLowTransfers(travel.to, targetCity, visited)) {
          this.totalPrice += travel.price;
          this.totalTime += travel.time;
          this.totalTransfers = visited!.length - 1
          return true;
        }

        this.route.pop();
        visited?.pop();
      }
    }

    return false;
  }
}