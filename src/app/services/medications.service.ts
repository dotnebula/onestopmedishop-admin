import { Injectable } from '@angular/core';
import { Pagable } from '../model/pageable.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicationsService {

  private PRD_URL =`${environment.apiBaseUrl}/medications`;

  constructor(private httpClient: HttpClient) { }

  getAll(pagable: Pagable) {
    return this.httpClient.get<any[]>(`${this.PRD_URL}?page=${pagable.page}&size=${pagable.size}&sort=${pagable.sort}&sortOrder=${pagable.sortOrder}`);
  }

  getOne(medicationId: number) {
    return this.httpClient.get<any[]>(`${this.PRD_URL}/${medicationId}`);
  }

  add(medicationObj: any) {
    return this.httpClient.post<any>(`${this.PRD_URL}`, medicationObj);
  }

  update(medicationObj: any) {
    return this.httpClient.put<any>(`${this.PRD_URL}`, medicationObj);
  }

  delete(medicationId: number) {
    return this.httpClient.delete<any>(`${this.PRD_URL}/${medicationId}`);
  }
  
}
