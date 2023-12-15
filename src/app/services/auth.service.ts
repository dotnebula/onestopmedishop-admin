import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpClient: HttpClient) { }

  private AUTH_URL ="login";

  loginAdmin(adminObj:any) {
    return this.httpClient.post<any[]>(`${environment.apiBaseUrl}/admins/login`, adminObj);
  }

  registerAdmin(userObj:any) {
    return this.httpClient.post<any[]>(`${environment.apiBaseUrl}/admins`, userObj);
  }
  
  isLoggedIn():boolean {
    let authToken = localStorage.getItem('x-auth-token');
    let adminId = localStorage.getItem('x-admin-id');
    let adminUserName = localStorage.getItem('x-admin-name');
    return !(!authToken && !adminId && !adminUserName);
  }

  getAdminUserName() {
    return localStorage.getItem('x-admin-name');
  }

  getAuthToken() {
    return localStorage.getItem('x-auth-token') ;
  }

  logOut() {
    localStorage.clear();
  }
}
