export class Card {
  image: string;
  value: string;
  suit: string;
  code: string;

  constructor(cartaRecebida : any){
    if(cartaRecebida.value == 0 || cartaRecebida.value == "JACK" || cartaRecebida.value == "QUEEN" || cartaRecebida.value == "KING"){
      cartaRecebida.value = 10;
    }
    if(cartaRecebida.value == "ACE"){
      cartaRecebida.value = 11;
    }
    this.image = cartaRecebida.image;
    this.value = cartaRecebida.value;
    this.suit = cartaRecebida.suit;
    this.code = cartaRecebida.code;
  }

  
}
