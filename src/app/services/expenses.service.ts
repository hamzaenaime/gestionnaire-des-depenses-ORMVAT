import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ExpensesService {
  constructor(private http: Http) {}

  getAllExpenses(year, month) {
    return this.http
      .get(
        "https://shrouded-tundra-91337.herokuapp.com/https://expenses-henaime.herokuapp.com/expenses/" +
          year +
          "/" +
          month
      )
      .pipe(map(res => res.json()));
  }

  addExpense(expense) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(
        "https://shrouded-tundra-91337.herokuapp.com/https://expenses-henaime.herokuapp.com/expenses",
        JSON.stringify(expense),
        { headers: headers }
      )
      .pipe(map(res => res.json()));
  }

  deleteExpense(id) {
    return this.http
      .delete(
        "https://shrouded-tundra-91337.herokuapp.com/https://expenses-henaime.herokuapp.com/expenses/" +
          id
      )
      .pipe(map(res => res.json()));
  }
}
