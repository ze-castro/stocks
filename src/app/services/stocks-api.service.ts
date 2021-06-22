import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StocksApiService {

  constructor(private http : HttpClient, private _zone: NgZone) { }

  stocks : any = {
    link: "https://api.cryptonator.com/api/ticker/",
    currency: "eur"
  }

  getStock(search : string){
    return this.http.get(this.stocks.link + search + "-" + this.stocks.currency)
  }

  getServerSentEvent(url: string): Observable<any> {
    return Observable.create(observer => {
      const eventSource = this.getEventSource(url);
      eventSource.onmessage = event => {
        this._zone.run(() => {
          observer.next(event);
        });
      };
      eventSource.onerror = error => {
        this._zone.run(() => {
          observer.error(error);
        });
      };
    });
  }
  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }
}
