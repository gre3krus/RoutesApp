import { Component, OnInit, Input } from '@angular/core';
import { RouterService, RoutingType, travel } from 'src/app/services/router.service';

@Component({
  selector: 'app-road',
  templateUrl: './road.component.html',
  styleUrls: ['./road.component.scss']
})

export class RoadComponent implements OnInit {
  @Input() selectedStart?: string
  @Input() selectedFinish?: string
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

  constructor(public routerService: RouterService) {}

  ngOnInit(): void {
    this.routerService.getJsonRouter()
  }

  loader(): void {
    this.load = true
    setTimeout(() => {
      this.load = false
      this.getRoad()
    }, 600)
  }

  getRoad(): void {
    if (!this.selectedStart || !this.selectedFinish) {
      alert('Выберите маршрут')
      return
    }

    if (!this.changeEconomy && !this.changeFaster && !this.changeLowTransfers) {
      this.openTable = false
      alert('Выберите Экономно, Быстро или Меньше пересадок')
      return
    }

    this.route = []
    this.total = []
    this.totalPrice = 0
    this.totalTime = 0
    this.totalTransfers = 0

    if (this.selectedStart === this.selectedFinish) {
      this.handlePushRoute()
    } else {
      const allRoutes = this.findRoutes(this.selectedStart, this.selectedFinish, [], [])

      if (this.changeEconomy) {
        allRoutes.sort((a, b) => a.totalPrice - b.totalPrice)
      } else if (this.changeFaster) {
        allRoutes.sort((a, b) => a.totalTime - b.totalTime)
      } else if (this.changeLowTransfers) {
        allRoutes.sort((a, b) => a.totalTransfers - b.totalTransfers)
      }

      if (allRoutes.length > 0) {
        const bestRoute = allRoutes[0];
        this.route = bestRoute.path;
        this.totalPrice = bestRoute.totalPrice
        this.totalTime = bestRoute.totalTime
        this.totalTransfers = bestRoute.totalTransfers
        this.openTable = true
      } else {
        this.openTable = false
        alert('Маршрут не найден')
      }

      this.total.push({
        totalP: this.totalPrice,
        totalT: this.totalTime,
        totalTran: this.totalTransfers
      });
      console.log(this.total)
    }
  }

  handlePushRoute(): void {
    const currentRoutes = this.routerService.jsonRouter.find((road: RoutingType) => road.from === this.selectedStart)

    if (currentRoutes && currentRoutes.travel) {
      const route = currentRoutes.travel.find((travel: travel) => travel.to === this.selectedFinish)
      if (route) {
        this.route.push({
          from: this.selectedStart,
          to: this.selectedFinish,
          price: route.price,
          time: route.time,
        })

        this.totalPrice = route.price
        this.totalTime = route.time
        this.totalTransfers = 0
        this.openTable = true
      } else {
        this.openTable = false
        alert('Маршрут не найден')
      }
    }
  }

  findRoutes(currentCity: string, targetCity: string, visited: string[], currentPath: any[]): any[] {
    if (currentCity === targetCity) {
      const totalPrice = currentPath.reduce((sum, travel) => sum + travel.price, 0)
      const totalTime = currentPath.reduce((sum, travel) => sum + travel.time, 0)
      const totalTransfers = currentPath.length - 1
      return [{
        path: [...currentPath],
        totalPrice,
        totalTime,
        totalTransfers
      }];
    }

    const currentRoutes = this.routerService.jsonRouter.find((road: RoutingType) => road.from === currentCity)

    if (!currentRoutes) {
      return []
    }

    let allRoutes: any[] = []

    for (let travel of currentRoutes.travel || []) {
      if (!visited.includes(travel.to)) {
        visited.push(travel.to)
        currentPath.push({
          from: currentCity,
          to: travel.to,
          price: travel.price,
          time: travel.time,
        });

        const routes = this.findRoutes(travel.to, targetCity, visited, currentPath)
        allRoutes = allRoutes.concat(routes)

        currentPath.pop()
        visited.pop()
      }
    }

    return allRoutes
  }
}
