import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../ngrx/auth/auth.state';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable()
export class HttpClientAuth {
  idtoken: string = '';

  constructor(
    private http: HttpClient,
    private store: Store<{ auth: AuthState }>,
  ) {
    this.store.select('auth', 'idToken').subscribe((token) => {
      if (token) {
        this.idtoken = token;
        console.log('token', token);
      }
    });
  }

  private transformRequest(url: string, options: any) {
    let newUrl = '';

    newUrl = `${environment.apiUrl}/${url}`;

    return {
      url: newUrl,
      options: {
        headers: new HttpHeaders({
          Authorization: `${this.idtoken}`,
        }),
        ...options,
      },
    };
  }

  get(url: string, options?: any): Observable<any> {
    const { url: newUrl, options: newOptions } = this.transformRequest(
      url,
      options,
    );
    return this.http.get(newUrl, newOptions);
  }

  post(url: string, body: any, options?: any): Observable<any> {
    const { url: newUrl, options: newOptions } = this.transformRequest(
      url,
      options,
    );
    return this.http.post(newUrl, body, newOptions);
  }

  put(url: string, body: any, options?: any): Observable<any> {
    const { url: newUrl, options: newOptions } = this.transformRequest(
      url,
      options,
    );
    return this.http.put(newUrl, body, newOptions);
  }

  delete(url: string, options?: any): Observable<any> {
    const { url: newUrl, options: newOptions } = this.transformRequest(
      url,
      options,
    );
    return this.http.delete(newUrl, newOptions);
  }
}
