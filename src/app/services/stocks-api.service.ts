import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StocksApiService {

  constructor(private http : HttpClient) { }

  stocks : any = {
    link: "https://api.cryptonator.com/api/ticker/",
    currency: "eur"
  }

  getStock(search : string){
    return this.http.get(this.stocks.link + search + "-" + this.stocks.currency)
  }
}
