import { Component, OnInit } from "@angular/core";

import { ExpensesService } from "../../services/expenses.service";
import { Expense } from "../../../expense";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"]
})
export class AddComponent implements OnInit {
  years: any;
  months: any;
  currentYear: string;
  currentMonth: string;
  year: string;
  month: string;
  description: string;
  amount: string;
  newExpense: Expense;
  expenses: Expense[];
  expense: any;
  id: string;
  resultats;
  constructor(private service: ExpensesService) {
    this.expenses = [];
    this.years = [];
    for (let i = 2018; i < 2022; i++) {
      this.years.push(i);
    }
    this.months = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre"
    ];
    this.currentYear = "2018";
    this.currentMonth = "janvier";
    this.description = "";
    this.amount = "";
    this.newExpense = new Expense();
    this.resultats = `<div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-blue-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>`;
    setTimeout(() => (this.resultats = "No résultats"), 5000);
  }

  ngOnInit() {
    this.service
      .getAllExpenses(this.currentYear, this.currentMonth)
      .subscribe(expenses => {
        this.expenses = [...expenses];
        console.log(this.expenses);
      });
  }

  getExpenses = (year, month) => {
    this.currentMonth = month;
    this.currentYear = year;
    this.service
      .getAllExpenses(this.currentYear, this.currentMonth)
      .subscribe(expenses => {
        this.expenses = [...expenses];
        console.log(expenses);
      });
    this.resultats = `<div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-blue-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>`;
    setTimeout(() => (this.resultats = "No résultats"), 3000);
  };
  delete = id => {
    this.service
      .deleteExpense(id)
      .subscribe(() => console.log("Expense deleted"));
    for (let i = 0; i < this.expenses.length; i++) {
      if (this.expenses[i]._id === id) {
        this.expenses.splice(i, 1);
        return;
      }
    }
  };
  updateTrigger = old => {
    console.log(old);
    this.description = old.description;
    this.amount = old.amount;
    this.year = old.year;
    this.month = old.month;
    this.id = old._id;
  };
  submitButton = () => {
    console.log(this.description, this.amount, this.month, this.year);
    console.log(this.newExpense);
    this.newExpense.description = this.description;
    this.newExpense.amount = this.amount;
    this.newExpense.month = this.month;
    this.newExpense.year = this.year;
    this.service
      .addExpense(this.newExpense)
      .subscribe(() => console.log("expense added"));
    if (this.currentMonth === this.month && this.currentYear === this.year) {
      this.expenses.push(this.newExpense);
    }
    this.year = "";
    this.month = "";
    this.description = "";
    this.amount = "";

    //Materialize.toast("Depense Ajouter", 4000, "rounded");
  };
}
