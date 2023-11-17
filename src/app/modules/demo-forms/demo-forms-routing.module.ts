import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DemoFormsComponent} from "./demo-forms.component";
import {DemoTemplateFormsComponent} from "./demo-template-forms.component";
import {DemoReactiveFormsComponent} from "./demo-reactive-forms.component";

const routes: Routes = [
  {
    path: '',
    component: DemoFormsComponent,
    children: [
      {
        path: 'reactive',
        component: DemoReactiveFormsComponent
      },
      {
        path: 'template',
        component: DemoTemplateFormsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DemoFormsRoutingModule {}
