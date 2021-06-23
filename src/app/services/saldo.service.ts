import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaldoService {

  constructor() { }

  balance : string = localStorage.getItem("balance")

  Playersaldo : any = {
    saldo : 5000,
  }
}
