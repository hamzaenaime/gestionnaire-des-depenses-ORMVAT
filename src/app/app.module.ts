import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AddComponent } from "./components/add/add.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ExpensesService } from "./services/expenses.service";

@NgModule({
  declarations: [AppComponent, AddComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpModule, FormsModule],
  providers: [ExpensesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
