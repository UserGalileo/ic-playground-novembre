import {Component, inject} from "@angular/core";
import {RouterLink, RouterOutlet, Routes} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../models";
import {AsyncPipe, NgForOf} from "@angular/common";
import {shareReplay} from "rxjs";
import {UserComponent} from "../components/user.component";
import {environment as env} from "../../environments/environment";

@Component({
  selector: 'app-demo-http',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
  ],
  template: `
    <ul>
      <li *ngFor="let user of (users$ | async)">
        <a [routerLink]="'' + user.id">{{ user.name }}</a>
      </li>
    </ul>

    <router-outlet />
  `,
})
export class DemoHttpComponent {

  http = inject(HttpClient);

  users$ = this.http.get<User[]>(`${env.apiUrl}/users`).pipe(
    shareReplay(1)
  );

  canDeactivate() {
    return confirm('Sei sicuro?');
  }
}

export const routes: Routes = [
  {
    path: '',
    component: DemoHttpComponent,
    canDeactivate: [(component: DemoHttpComponent) => {
      return component.canDeactivate();
    }],
    children: [
      {
        path: ':id',
        component: UserComponent
      }
    ]
  }
]
