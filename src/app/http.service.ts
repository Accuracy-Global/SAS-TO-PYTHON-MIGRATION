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
  private apiAppRunOutputpython = environment.api + 'run_python';

  constructor(private http: HttpClient) { }

  postAppconvert(Data): Observable<any> {

    return this.http.post(this.apiAppConvert, Data);
  }

  postAppRunOutputsas(Data): Observable<any> {

    return this.http.post(this.apiAppRunOutputsas, Data);
  }

  postAppRunOutputpython(Data): Observable<any> {

    return this.http.post(this.apiAppRunOutputpython, Data);
  }



}
