import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrls } from '../constants/api.urls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(registerObj: any) {
    return this.http.post<any>(
      `${apiUrls.authServiceApi}/register`,
      registerObj
    );
  }
}
