import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { JogoComponent } from './components/jogo/jogo.component';
import { FourOfourComponent } from './components/four-ofour/four-ofour.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "stocks", component: StocksComponent},
  {path: "blackjack", component: JogoComponent},
  {path: "404", component: FourOfourComponent},
  {path: "**", redirectTo:"404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
