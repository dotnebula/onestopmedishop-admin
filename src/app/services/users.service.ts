import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pagable } from '../model/pageable.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private USER_URL =`${environment.apiBaseUrl}/users`;

    constructor(private httpClient: HttpClient) { }

    getAll(pagable:Pagable){
        return this.httpClient.get<any[]>(`${this.USER_URL}?page=${pagable.page}&size=${pagable.size}&sort=${pagable.sort}&sortOrder=${pagable.sortOrder}`);
    }

    getOne(userId:number){
        return this.httpClient.get<any[]>(`${this.USER_URL}/${userId}`);
    }

    add(userObj:any){
        return this.httpClient.post<any>(`${this.USER_URL}`,userObj);
    }

    update(userObj:any){
        return this.httpClient.put<any>(`${this.USER_URL}`,userObj);
    }

    delete(userId:number){
        return this.httpClient.delete<any>(`${this.USER_URL}/${userId}`);
    }

}
