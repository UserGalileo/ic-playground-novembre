import {NgModule} from "@angular/core";
import {DemoFormsComponent} from "./demo-forms.component";
import {DemoFormsRoutingModule} from "./demo-forms-routing.module";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DemoTemplateFormsComponent} from "./demo-template-forms.component";
import {DemoReactiveFormsComponent} from "./demo-reactive-forms.component";
import {ForbiddenAsyncDirective, ForbiddenDirective} from "./validators";
import {CounterComponent} from "./counter.component";
import {AddressComponent} from "./address.component";

@NgModule({
  imports: [
    CommonModule,
    DemoFormsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    // Standalone
    ForbiddenDirective,
    ForbiddenAsyncDirective,
    CounterComponent,
    AddressComponent
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
