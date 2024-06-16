import { Component, OnInit, Input } from '@angular/core';
import { RouterService, RoutingType, travel } from 'src/app/services/router.service';

@Component({
  selector: 'app-road',
  templateUrl: './road.component.html',
  styleUrls: ['./road.component.scss']
})
export class RoadComponent implements OnInit {
  @Input() selectedStart?: RoutingType;
  @Input() selectedFinish!: RoutingType;
  openTable: boolean = false;
  route: any[] = [];

  constructor(public routerService: RouterService) {
    this.routerService.jsonRouter = [];
  }

  ngOnInit(): void {
    this.routerService.getJsonRouter();
  }

  getRoad(): void {
    if (!this.selectedStart || !this.selectedFinish) {
      return console.log('Выберите города');
    }

    this.route = [];
    this.findRoutes(this.selectedStart.from, this.selectedFinish.from, []);

    this.openTable = this.route.length > 0;
    if (!this.openTable) {
      alert('Маршрут не найден');
    }

    console.log(this.route);
  }

  findRoutes(currentCity: string, targetCity: string, visited: any[]): boolean {
    if (currentCity === targetCity) {
      return true;
    }

    const currentRoutes = this.routerService.jsonRouter.find((route: RoutingType) => route.from === currentCity);
    if (!currentRoutes) {
      return false;
    }

    for (let travel of currentRoutes.travel) {
      if (!visited.includes(travel.to)) {
        visited.push(travel.to);
        this.route.push({
          from: currentCity,
          to: travel.to,
          price: travel.price,
          time: travel.time
        });

        if (this.findRoutes(travel.to, targetCity, visited)) {
          return true;
        }

        this.route.pop();
        visited.pop();
      }
    }

    return false;
  }
}
