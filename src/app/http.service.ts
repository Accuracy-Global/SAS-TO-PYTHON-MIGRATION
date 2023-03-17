import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiAppConvert = environment.api + 'saspy';
  private apiAppRunOutputsas = environment.api + 'run_sas';
  private apiAppRunOutputpython = environment.api + 'python_compiler';
  private apiAppLogin = environment.api + 'login';
  private apiAppRegister = environment.api + 'register';

  constructor(private http: HttpClient) { }

  postAppconvert(Data): Observable<any> {

    return this.http.post(this.apiAppConvert, Data);
  }

  postApplogin(Data): Observable<any> {

    return this.http.post(this.apiAppLogin, Data);
  }

  postAppregister(Data): Observable<any> {

    return this.http.post(this.apiAppRegister, Data);
  }


  postAppRunOutputsas(Data): Observable<any> {

    return this.http.post(this.apiAppRunOutputsas, Data);
  }

  postAppRunOutputpython(Data): Observable<any> {

    return this.http.post(this.apiAppRunOutputpython, Data);
  }



}
