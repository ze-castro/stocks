import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/classes/card';
import { Deckinit } from 'src/app/classes/deckinit';
import { BlackjackService } from 'src/app/services/blackjack.service';
import { SaldoService } from 'src/app/services/saldo.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {
  //Importar Serviços
  saldo : SaldoService
  router: Router;
  constructor(private getDeck: BlackjackService, private getSaldo : SaldoService, router :Router) {
    this.saldo = getSaldo;
    this.router = router;
  }

  beforeScreen : boolean = false
  //Ao abrir a pagina chamar a funçao start()
  ngOnInit(): void {
    setTimeout(() => {
      this.beforeScreen = true
    }, 1000);
    this.start();
    this.saldo.Playersaldo.saldo = Number(localStorage.getItem("balance"));
  }

  // Apos o onInit esta funçao é executada e guarda os HTMLElemnts num objeto cartas2
  ngAfterViewInit() : void{
    this.cartas2.push(this.card0);
    this.cartas2.push(this.card1);
    this.cartas2.push(this.card2);
    this.cartas2.push(this.card3);
    this.cartas2.push(this.card4);
    this.cartas2.push(this.card5);
    this.cartas2.push(this.card6);
    this.cartas2.push(this.card7);
    this.cartas2.push(this.card8);
    this.cartas2.push(this.card9);

  }

  // ViewChield para manipulaçao do html e css
  @ViewChild('card0') card0 : any;
  @ViewChild('card1') card1 : any;
  @ViewChild('card2') card2 : any;
  @ViewChild('card3') card3 : any;
  @ViewChild('card4') card4 : any;
  @ViewChild('card5') card5 : any;
  @ViewChild('card6') card6 : any;
  @ViewChild('card7') card7 : any;
  @ViewChild('card8') card8 : any;
  @ViewChild('card9') card9 : any;

  @ViewChild('startdiv') startdiv : any;

  @ViewChild('decisao') decisao : any;
  @ViewChild('result') result : any;
  @ViewChild('h1') h1 : any;
  @ViewChild('page') page : any;


  //variaveis inicializadas
  contador = 0;
  pontosPlayer = 0;
  pontosDealer = 0;
  showChips : boolean = false;
  verify :any;
  stayoption : boolean;
  aposta : any = 0;

  //Iniciar um objeto cartas2
  cartas2 = [];
  // igualar o deckid ao campo da class Deckinit
  deckid ?: Deckinit

  //Executa a funçao start
  start(){
  //chama a funçao getDeck do servico e da subscribe nos parametros recebido da api
  this.getDeck.getdeck().subscribe(
    x =>{
      //guarda o deckId
     this.deckid = new Deckinit(x);
     //chama a funçao getDeckCards
     this.getDeckCards();
     console.log(this.deckid)
    })
  }

  // Get de cartas, converaso de dados para Card(y)
  cartasUso : Array<Card> = [];
  // funçao para ir buscar á api as cartas e guardar num objeto cartasUso
  getDeckCards(){
    if(this.deckid)
      this.getDeck.getCards(this.deckid.deck_id).subscribe(
        data =>
        {this.cartasUso = data['cards'].map(y=> new Card(y));
        });
  }
  //explicar que o maximo sao 5 cartas no relatório



  //Metodo de verificaçao de todas as possibilidades de vitoria , derrota ou empate
  verificar(){
    if (this.pontosPlayer > 21) {
      return 'loser'
    } else if (this.pontosPlayer < 21 && this.pontosDealer < 21 && this.pontosPlayer > this.pontosDealer) {
      return 'winner'
    } else if (this.pontosPlayer == this.pontosDealer) {
      return 'tie'
    } else if (this.pontosPlayer < 21 && this.pontosDealer < 21 && this.pontosPlayer < this.pontosDealer) {
      return 'loser'
    } else if (this.pontosDealer > 21) {
      return 'winner'
    } else if (this.pontosDealer == 21) {
      return 'loser'
    } else if (this.pontosPlayer == 21) {
      return 'blackjack'
    }
    return "0";
  }

  // Ao clickar no botao "Start" o jogo  vai começar e o mesmo é ocultado com display none
  play(){
    this.showChips = true;
    this.startdiv.nativeElement.style.display = "none";
    this.start();
    this.givecards();

  }

  //Funçao para começar a dar as cartas no qual ordenadamente o player e o dealer recebem duas cartas sendo que uma das do dealer fica virada para baixo
  givecards(){
    if(this.contador != 3){
      //mostra a face da carta
      this.cartas2[this.contador].nativeElement.src = this.cartasUso[this.contador].image;
      this.cartas2[this.contador].nativeElement.style.display = "block";
      //Condiçao para verificar se a carta que o "jogadorAtual" receber um "As" e os pontos somados ultrapassarem 21 entao o "As" vale 1 ponto - Segundo Regras Oficiais
      if(this.contador % 2 == 0){
        if(parseInt(this.cartasUso[this.contador].value) == 11 && (parseInt(this.cartasUso[this.contador].value) + this.pontosPlayer) > 22){
          this.cartasUso[this.contador].value = "1";
        }
        //incrementar os pontos do Player
        this.pontosPlayer += parseInt(this.cartasUso[this.contador].value);
      }else{
        if(parseInt(this.cartasUso[this.contador].value) == 11 && (parseInt(this.cartasUso[this.contador].value) + this.pontosPlayer) > 22){
          this.cartasUso[this.contador].value = "1";
        }
        this.pontosDealer += parseInt(this.cartasUso[this.contador].value);
      }
      this.contador++;
      // uma pequena pausa de 600 milisegundos exclusivamente para aspectos visuais e logicos
      setTimeout(() => {
        this.givecards();
      }, 600);
    }else {
      //caso a proxima carta a ser dada seja a "quarta" ou seja a segunda carta do dealer apenas mostra o verso
      this.cartas2[this.contador].nativeElement.src = "../../../assets/Images/card.png";
      this.cartas2[this.contador].nativeElement.style.display = "block";
      this.decisao.nativeElement.style.display = "flex";
      this.contador++;
    }
  };

  //Caso o jogador escolha "hit" vai lhe ser dada uma nova carta, se o jogador tiver blackjack, ou seja, 21 pontos nao podera pedir uma carta
  hit(){
    if(this.pontosPlayer < 21){
      this.cartas2[this.contador].nativeElement.src = this.cartasUso[this.contador].image;
      this.cartas2[this.contador].nativeElement.style.display = "block";
      if(parseInt(this.cartasUso[this.contador].value) == 11 && (parseInt(this.cartasUso[this.contador].value) + this.pontosPlayer) > 22){
        this.cartasUso[this.contador].value = "1";
      }
      this.pontosPlayer += parseInt(this.cartasUso[this.contador].value);
      this.contador+=2;
      /*Verificar se é maior ou igual ou nao -------------------------------------------------------------------------------------------------*/
      if(this.pontosPlayer > 21){
        this.contador = 3;
        setTimeout(() => {
          this.dealerCards();
        }, 600);
      }
    }
  }


  //Caso o jogador escolha "stay" ou se o player nao ultrapassar os 22 pontos a jogada passa para o dealer
dealerCards(){
  if(this.pontosPlayer < 22 || this.stayoption == true){
    //se o dealer tiver 16 ou menos pontos e ainda nao tiver ganho ao player , é obrigatorio ele receber uma nova carta - Regras oficiais
    if(this.pontosDealer <= 16 && this.pontosDealer < this.pontosPlayer || this.pontosDealer <= 16 && this.pontosDealer == this.pontosPlayer){
      this.cartas2[this.contador].nativeElement.src = this.cartasUso[this.contador].image;
      this.cartas2[this.contador].nativeElement.style.display = "block";
      if(parseInt(this.cartasUso[this.contador].value) == 11 && (parseInt(this.cartasUso[this.contador].value) + this.pontosDealer) > 22){
        this.cartasUso[this.contador].value = "1";
      }
      this.pontosDealer += parseInt(this.cartasUso[this.contador].value);
      this.contador+=2;
      setTimeout(() => {
        this.dealerCards();
      }, 600);
      //caso o if em cima ja nao se verificar, iremos chamar a funçao para saber quem foi o vencedor e passamos para o fim da jogada
    }else{
      this.verify  = this.verificar();
      this.fim(this.verify);
    }
    //Caso o jogador ultrapasse os 22 pontos a ultima carta do dealer é mostrada
  }else{
    this.cartas2[this.contador].nativeElement.src = this.cartasUso[this.contador].image;
    this.cartas2[this.contador].nativeElement.style.display = "block";
    this.verify  = this.verificar();
    this.fim(this.verify);
  }

}

// Caso o player escolha ficar com as cartas que tem a jogada passa para o dealer e o contador é ajustado ás cartas do dealer
stay(){
  this.stayoption = true;
  this.contador = 3;
  this.dealerCards();
}

// Na funçao fim é mostrado o resultado da jogada e o valor da aposta ganhou ou perdido respectivamente
fim(verify){
  this.result.nativeElement.style.display = "flex";
  if(verify == "winner"){
    this.h1.nativeElement.textContent ="Winner";
    this.saldo.Playersaldo.saldo += this.aposta
  }else if(verify == "loser"){
    this.h1.nativeElement.textContent ="Lose";
    this.aposta -= 2*this.aposta;
    this.saldo.Playersaldo.saldo += this.aposta
  }else if(verify == "tie"){
    this.h1.nativeElement.textContent ="Tie";
  }else if(verify == "blackjack"){
    this.h1.nativeElement.textContent ="BlackJack";
    this.saldo.Playersaldo.saldo += 1.5*this.aposta
  }
}

//Reset é a funçao para igualar todas as variaveis necesarias e esconder as cartas para voltar a fazer uma nova jogada
reset(){
  setTimeout(() => {
    this.contador = 0;
    this.pontosPlayer = 0;
    this.pontosDealer = 0;
    this.stayoption = false;
    this.aposta = 0;
    this.result.nativeElement.style.display = "none";
    for (let i = 0; i < 10; i++) {
    this.cartas2[i].nativeElement.style.display = "none";
    }
    this.startdiv.nativeElement.style.display = "flex";
    this.decisao.nativeElement.style.display="none";
    this.showChips = false;
    localStorage.setItem('balance', this.saldo.Playersaldo.saldo)
  }, 600);
}

// O player pode apostar as fichas que tem
aumentarAposta(valor : any){
  if(this.aposta + valor <= this.saldo.Playersaldo.saldo){
    this.aposta += Number(valor);
  }
}

// ---------------------------------------------------------------------Alterar -------------------------------- Sair para o menu principal.
leave(){
  localStorage.setItem('balance', this.saldo.Playersaldo.saldo)
  this.router.navigate(['/home'])
}

}
