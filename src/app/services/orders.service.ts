import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) { }

  private ODR_URL ="http://localhost:8081/medi/orders";

  getAll() {
    return this.httpClient.get<any[]>(`${this.ODR_URL}`);
  }

  getOne(id:number) {
    return this.httpClient.get<any[]>(`${this.ODR_URL}/${id}`);
  }

}
