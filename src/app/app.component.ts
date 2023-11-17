import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
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
    >DEMO forms</a>
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

