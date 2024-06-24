import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  jsonRouter: RoutingType[] = []

  constructor(private http: HttpClient) {}

  getJsonData(): Observable<RoutingType[]> {
    return this.http.get<RoutingType[]>('assets/routes.json');
  }

  getJsonRouter(): void {
    this.getJsonData().subscribe((data: RoutingType[]) => {
      this.jsonRouter = data
    })
  }
}

export type RoutingType = {
  from: string,
  travel?: travel[]
}

export type travel = {
  id: number,
  price: number,
  time: number,
  to: string
}
