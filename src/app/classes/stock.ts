export class Stock {

  // base : string = ""
  // price : number = 0
  // change : number = 0
  // ticker : string = ""
  // volume : number = 0

  // constructor(stock : any){
  //   this.base = stock.error
  //   this.price = stock.price
  //   this.change = stock.change
  //   this.ticker = stock.ticker
  //   this.volume = stock.volume
  // }

  //error : string = ""
  // success : string  = ""
  // ticker : object = {
  //   base: "",
  //   change: 0,
  //   price: 0,
  //   target: "",
  //   volume: 0
  // }
  // timestamp : number =  0


    error : string = ""
    success : boolean =  false
    ticker : any = {
      base: "",
      price: 0,
      change: 0,
      target: "",
      volume: 0
    }
    timestamp : number = 0

  constructor(stock : any){
    this.error = stock.error;
    this.success = stock.success;
    this.ticker.base = stock.ticker.base
    this.ticker.price = stock.ticker.price
    this.ticker.change = stock.ticker.change
    this.ticker.target = stock.ticker.target
    this.ticker.volume = stock.ticker.volume
    this.timestamp = stock.timestamp;
  }
}
