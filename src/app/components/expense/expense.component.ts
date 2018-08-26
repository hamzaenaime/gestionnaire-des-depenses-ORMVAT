import { Component, OnInit } from "@angular/core";

import { ExpensesService } from "../../services/expenses.service";

import { Expense } from "../../../expense";
@Component({
  selector: "app-expense",
  templateUrl: "./expense.component.html",
  styleUrls: ["./expense.component.css"]
})
export class ExpenseComponent implements OnInit {
  currentYear: string;
  currentMonth: string;
  expenses: Expense[];
  years;
  months;
  month: string;
  year: string;
  description: string;
  amount: string;
  expense: any;
  id: string;
  constructor(private service: ExpensesService) {
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
    this.expenses = [];
    /*
    this.description = "";
    this.year = "";
    this.month = "";
    this.amount = "";*/
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
  };
  delete = id => {
    /*
    this.service
      .deleteExpense(id)
      .subscribe(() => console.log("Expense deleted"));
    for (let i = 0; i < this.expenses.length; i++) {
      if (this.expenses[i]._id === id) {
        this.expenses.splice(i, 1);
        return;
      }
    }
    */
  };
  updateTrigger = old => {
    console.log(old);
    this.description = old.description;
    this.amount = old.amount;
    this.year = old.year;
    this.month = old.month;
    this.id = old._id;
  };
}
