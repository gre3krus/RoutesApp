import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  jsonRouter: any[] = []

  constructor(private routerService: RouterService) { }

  ngOnInit(): void {
    this.routerService.getJsonData().subscribe((data: any) => {
      this.jsonRouter = data;
    });

  }

}
