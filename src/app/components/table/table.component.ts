import { Component, OnInit, Input } from '@angular/core';
import { RouterService, RoutingType } from 'src/app/services/router.service'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() loadRoute: any[] = []
  @Input() loadTotal: any[] = []

  constructor(public routerService: RouterService) {this.routerService.jsonRouter = []}

  ngOnInit(): void {
    this.routerService.getJsonRouter()
  }

}
