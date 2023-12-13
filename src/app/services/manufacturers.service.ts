import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pagable } from '../model/pageable.model';

@Injectable({
  providedIn: 'root'
})
export class ManufacturersService {

  private CATG_URL =`${environment.apiBaseUrl}/manufacturers`;

    constructor(private httpClient: HttpClient) { }

    getAll(pagable:Pagable){
        return this.httpClient.get<any[]>(`${this.CATG_URL}?page=${pagable.page}&size=${pagable.size}&sort=${pagable.sort}&sortOrder=${pagable.sortOrder}`);
    }

    getOne(categoryId:number){
        return this.httpClient.get<any[]>(`${this.CATG_URL}/${categoryId}`);
    }

    add(categoryObj:any){
        return this.httpClient.post<any>(`${this.CATG_URL}`,categoryObj);
    }

    update(categoryObj:any){
        return this.httpClient.put<any>(`${this.CATG_URL}`,categoryObj);
    }

    delete(categoryId:number){
        return this.httpClient.delete<any>(`${this.CATG_URL}/${categoryId}`);
    }
}
