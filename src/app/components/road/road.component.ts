import { Component, OnInit, Input} from '@angular/core';
import { RouterService, RoutingType } from 'src/app/services/router.service'

@Component({
  selector: 'app-road',
  templateUrl: './road.component.html',
  styleUrls: ['./road.component.scss']
})
export class RoadComponent implements OnInit {
  @Input() selectedStart?: any
  @Input() selectedFinish?: RoutingType


  openTable: boolean = false

  constructor(public routerService: RouterService) {this.routerService.jsonRouter = []}


  ngOnInit(): void {
    this.routerService.getJsonRouter()
  }


  getRoad(): any {
    this.openTable = !this.openTable
    
  }
    
}
