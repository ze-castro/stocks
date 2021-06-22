import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  loadingScreen(div1 : HTMLDivElement, spinner : HTMLDivElement, div2 : HTMLDivElement) {
    div1.classList.remove("card")
    div1.classList.add("card-after")
    div2.style.display="none"
    setTimeout(() => {
      div1.style.justifyContent="center"
      spinner.classList.remove("display-none")
      spinner.style.animation="fade-in 0.5s ease-in-out"
      setTimeout(() => {
        if(div1.id == "stocks") {
          this.router.navigate(['stocks'])
        }
        if(div1.id == "blackjack") {
          this.router.navigate(['blackjack'])
        }
      }, 3500);
    }, 500);
  }
}
