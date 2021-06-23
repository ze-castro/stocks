import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlackjackService {

  constructor(private httpAsk : HttpClient) { }

  linkdeck ="https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

  getdeck(){
    return this.httpAsk.get(this.linkdeck)
  }

  getCards(deckid : string){
    let link = "https://deckofcardsapi.com/api/deck/"+ deckid +"/draw/?count=10";
    return this.httpAsk.get(link);
  }

}

