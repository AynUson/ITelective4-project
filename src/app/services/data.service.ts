import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
baseURL="http://localhost/TAMA/tama_api/"

  constructor(private _http: HttpClient) { }


  sendAPIRequest(method:any, data:any) {
    return <any>(
      this._http.post(this.baseURL + method, btoa(JSON.stringify(data)))
    );
  }

  sendAPIRequest2(method, data, condition) {
    return <any>(
      this._http.post(this.baseURL + method + condition, JSON.stringify(data))
    );
  }
}
