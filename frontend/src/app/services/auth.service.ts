import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrls } from '../constants/api.urls';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  register(registerObj: any) {
    return this.http.post<any>(
      `${apiUrls.authServiceApi}/register`,
      registerObj
    );
  }

  login(loginObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}/login`, loginObj);
  }

  sendEmail(email: string) {
    return this.http.post<any>(`${apiUrls.authServiceApi}/send-email`, email);
  }

  resetPassword(resetObj: any) {
    return this.http.post<any>(
      `${apiUrls.authServiceApi}/reset-password`,
      resetObj
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }
}
