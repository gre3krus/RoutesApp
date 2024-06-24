import { Component, OnInit, Input } from '@angular/core';
import { RouterService } from 'src/app/services/router.service'

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

  getPlural(totalTran: number): any {
    let ruPlural = new Intl.PluralRules('ru')
    let rule = ruPlural.select(totalTran)

    if(rule === 'few'){
      return 'Пересадки'
    } else if(rule === 'one') {
      return 'Пересадка'
    } else {
      return 'Пересадок'
    }
  }

}
