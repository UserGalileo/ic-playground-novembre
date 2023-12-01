import {Component, inject, Input} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {map, mergeMap, switchMap} from "rxjs";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {User} from "../models";
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../environments/environment";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe
  ],
  template: `
    User {{ userId$ | async }}:
    <hr>
    {{ user$ | async | json }}
  `
})
export class UserComponent {

  route = inject(ActivatedRoute);
  http = inject(HttpClient);

  userId$ = this.route.paramMap.pipe(
    map(params => params.get('id'))
  );

  user$ = this.userId$.pipe(
    switchMap(userId => this.http.get<User>(`${env.apiUrl}/users/${userId}`))
  )

}
