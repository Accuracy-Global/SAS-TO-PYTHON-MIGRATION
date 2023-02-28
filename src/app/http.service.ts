import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiAppConvert = environment.api + 'saspy';

  constructor(private http: HttpClient) { }

  postAppconvert(Data): Observable<any> {
    // let requestData = {};
    // requestData = {
    //   Username:Data.username,
    //   Password:Data.password

    //   // "Username":"Admin123@gmail.com",
    //   // "Password":"Accuracy@123"
    // } 

    return this.http.post(this.apiAppConvert, Data);
  }
}
