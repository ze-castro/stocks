import { Component, OnInit, ViewChild } from '@angular/core';
import { StocksApiService } from 'src/app/services/stocks-api.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  stocksService : StocksApiService
  constructor(private service : StocksApiService) {
    this.stocksService = service
  }

  @ViewChild("error") input : any;
  @ViewChild("search") search : any;

  beforeScreen : boolean = false

  ngOnInit(): void {
    setTimeout(() => {
      this.beforeScreen = true
    }, 1000);
    this.getDefaultStocks()
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

  cryptos : any = []
  getDefaultStocks(){
    for (let index = 0; index < this.searchForCoins.length; index++) {
      this.service.getStock(this.searchForCoins[index]).subscribe(data => {
        this.cryptos[index] = data
        console.log(this.cryptos[index])
      })
    }
  }

  buy(input : HTMLInputElement){
    if(parseFloat(localStorage.getItem("balance")) < (parseInt(input.value) * this.stock.ticker.price)){
      input.style.borderColor="#c90000"
      setTimeout(() => {
        input.style.borderColor="#0070c9"
      }, 2000);
    } else {
      if(localStorage.getItem(this.stock.ticker.base) == null){
        localStorage.setItem(this.stock.ticker.base, "0")
      }
      localStorage.setItem(this.stock.ticker.base, (parseInt(localStorage.getItem(this.stock.ticker.base)) + (parseInt(input.value))).toString())
      localStorage.setItem("balance", (parseFloat(localStorage.getItem("balance")) - (parseInt(input.value) * this.stock.ticker.price)).toString())
      this.service.balance = localStorage.getItem("balance")
    }
  }

  sell(input : HTMLInputElement){
    if(localStorage.getItem(this.stock.ticker.base) == null || parseInt(localStorage.getItem(this.stock.ticker.base)) < parseInt(input.value)){
      input.style.borderColor="#c90000"
      setTimeout(() => {
        input.style.borderColor="#0070c9"
      }, 2000);
    } else {
      localStorage.setItem(this.stock.ticker.base, (parseInt(localStorage.getItem(this.stock.ticker.base)) - (parseInt(input.value))).toString())
      localStorage.setItem("balance", (parseFloat(localStorage.getItem("balance")) + (parseInt(input.value) * this.stock.ticker.price)).toString())
      this.service.balance = localStorage.getItem("balance")
    }
  }
}
