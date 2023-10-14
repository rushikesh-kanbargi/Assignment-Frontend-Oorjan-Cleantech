import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {
  private apiUrl = 'https://f68370a9-1a80-4b78-b83c-8cb61539ecd6.mock.pstmn.io/api/v1/get_market_data/';

  constructor(private http: HttpClient) {}

/* The function returns an Observable that makes an HTTP GET request to the specified API URL.*/
  getMarketData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
