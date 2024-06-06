import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private http: HttpClient) { }

  getJsonData(): Observable<RoutingType[]> {
    return this.http.get<RoutingType[]>('assets/routes.json');
  }
}

export type RoutingType = {
  from: string,
  travel: travel[]
}

export type travel = {
  id: number,
  price: number,
  time: number,
  to: string
}
