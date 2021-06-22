export class Stock {

  base : string = ""
  price : number = 0
  change : number = 0
  ticker : string = ""
  volume : number = 0

  constructor(stock : any){
    this.base = stock.error
    this.price = stock.price
    this.change = stock.change
    this.ticker = stock.ticker
    this.volume = stock.volume
  }
  // error : string = ""
  // success : string  = ""
  // ticker : object = {
  //   base: "",
  //   change: 0,
  //   price: 0,
  //   target: "",
  //   volume: 0
  // }
  // timestamp : number =  0

  // constructor(stock : any){
  //   this.error = stock.error;
  //   this.success = stock.success;
  //   this.ticker = stock.ticker = {
  //     base: "",
  //     change: 0,
  //     price: 0,
  //     target: "",
  //     volume: 0
  //   }
  //   this.timestamp = stock.timestamp;
  // }
}
