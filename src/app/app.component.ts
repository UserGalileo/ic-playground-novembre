import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ListComponent} from "./components/list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ListComponent],
  template: `
    <a
      routerLink="demo-accordion"
      routerLinkActive="active"
      ariaCurrentWhenActive="page"
    >DEMO accordion</a> |
    <a
      routerLink="demo-highlight"
      routerLinkActive="active"
      ariaCurrentWhenActive="page"
    >DEMO highlight</a> |
    <a
      routerLink="demo-forms"
      routerLinkActive="active"
      ariaCurrentWhenActive="page"
    >DEMO forms</a> |
    <a
      routerLink="demo-http"
      routerLinkActive="active"
      ariaCurrentWhenActive="page"
    >DEMO http</a> |
    <a
      routerLink="demo-todos"
      routerLinkActive="active"
      ariaCurrentWhenActive="page"
    >DEMO todos</a>
    <hr>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .active {
      background: yellow;
    }
  `]
})
export class AppComponent {
}

