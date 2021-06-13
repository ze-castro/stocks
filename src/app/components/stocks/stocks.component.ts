import { Component, OnInit } from '@angular/core';
import { StocksApiService } from 'src/app/services/stocks-api.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  constructor(private service : StocksApiService) { }

  beforeScreen : boolean = false

  ngOnInit(): void {
    setTimeout(() => {
      this.beforeScreen = true
    }, 1000);
  }

  stock : any
  getStock(search : string){
      this.service.getStock(search).subscribe(data => {this.stock = data,
          console.log(this.stock.c)
      })
  }
}
