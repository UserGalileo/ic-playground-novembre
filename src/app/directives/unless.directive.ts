import {Directive, inject, Input, TemplateRef, ViewContainerRef} from "@angular/core";

// Structural Directive
@Directive({
  selector: '[unless]',
  standalone: true
})
export class UnlessDirective {

  templateRef = inject(TemplateRef);
  viewContainerRef = inject(ViewContainerRef);

  isVisible = false;

  @Input() set unless(condition: boolean) {
    if (!condition && !this.isVisible) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this.isVisible = true;
    } else {
      this.viewContainerRef.clear();
      this.isVisible = false;
    }
  }

}




