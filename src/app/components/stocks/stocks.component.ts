import { Component, OnInit, ViewChild } from '@angular/core';
import { Stock } from 'src/app/classes/stock';
import { StocksApiService } from 'src/app/services/stocks-api.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  constructor(private service : StocksApiService) { }

  @ViewChild("error") input : any;
  @ViewChild("search") search : any;

  beforeScreen : boolean = false

  ngOnInit(): void {
    setTimeout(() => {
      this.beforeScreen = true
    }, 1000);
  }

  stock : any = {
    error: "",
    success: false,
    ticker: {
      base: "",
      price: 0,
      change: 0,
      target: "",
      volume: 0
    },
    timestamp: 0
  }
  getStock(search : string){
      this.search.nativeElement.disabled = true;
      this.service.getStock(search).subscribe(data => {this.stock = data,
      this.stock.success ? this.stock = data : this.input.nativeElement.classList.add('not-found'),
        setTimeout(() => {
          this.input.nativeElement.classList.add('not-found-exit')
          setTimeout(() => {
            this.search.nativeElement.disabled = false
            this.input.nativeElement.classList.remove('not-found')
          }, 1000);
        }, 2000);
        console.log(data)
      })
      this.input.nativeElement.classList.remove('not-found')
      this.input.nativeElement.classList.remove('not-found-exit')
  }

  searchForCoins : string[] = ['btc', 'eth', 'xrp', 'ada', 'doge', 'bch']

  getDefaultStocks(){
    this.service.getStock(this.searchForCoins[0]).subscribe(data => {
      this.stock = data
    })
  }
}
