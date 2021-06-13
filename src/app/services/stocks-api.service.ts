import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StocksApiService {

  constructor(private http : HttpClient) { }

  //example - www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=TSLA&apikey=QMD3C7RTZNR7MBHG

  apiKey : string = "c333ubqad3ifq94434hg"

  stocks : string = "https://finnhub.io/api/v1/quote"

  getStock(search : string){
    return this.http.get(this.stocks, {
      params: {'symbol': search,
      'token': this.apiKey}
    })
  }
}
