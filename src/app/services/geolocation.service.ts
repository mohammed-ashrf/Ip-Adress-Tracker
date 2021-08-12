import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHttpmsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService) { }
  getIpAddress() {
    return this.http
          .get('https://api.ipify.org/?format=json')
          .pipe(catchError(this.processHTTPMsgService.handleError));
  }   
  getGEOLocation(ip) {
    let url = "https://api.ipgeolocation.io/ipgeo?apiKey=aab4bbf84c66456687f30c772eb8fc43&ip="+ip; 
      return this.http
            .get(url)
            .pipe(catchError(this.processHTTPMsgService.handleError));
    } 









  // getlocation(ip:any): Observable<any> {
  //   const httpOptions = {
  //         headers: new HttpHeaders({
  //           'Access-Control-Allow-Origin': 'http://localhost:4200',
  //         }),
  //       };
  //   return this.http.get(this.baseURL + `&ipAddress=${ip}`, httpOptions)
  //     .pipe(catchError(this.processHTTPMsgService.handleError));
  // }  
}
