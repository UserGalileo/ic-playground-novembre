import {NgModule} from "@angular/core";
import {DemoFormsComponent} from "./demo-forms.component";
import {DemoFormsRoutingModule} from "./demo-forms-routing.module";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DemoTemplateFormsComponent} from "./demo-template-forms.component";
import {DemoReactiveFormsComponent} from "./demo-reactive-forms.component";

@NgModule({
  imports: [
    CommonModule,
    DemoFormsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    DemoFormsComponent,
    DemoTemplateFormsComponent,
    DemoReactiveFormsComponent
  ],
  providers: [],
  exports: [],
})
export class DemoFormsModule {}
