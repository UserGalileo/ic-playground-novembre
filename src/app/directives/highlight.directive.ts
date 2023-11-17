import {Directive, ElementRef, HostListener, inject, Input} from "@angular/core";

// Attribute Directive
@Directive({
  selector: '[highlight]',
  standalone: true,
})
export class HighlightDirective {

  @Input('highlight') highlightColor = 'yellow';
  @Input() highlightForeground = 'inherit';

  el = inject(ElementRef);

  @HostListener('mouseenter')
  onMouseEnter() {
    this.highlight(this.highlightColor);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.highlight('');
  }

  highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.color = color ? this.highlightForeground : 'inherit';
  }
}
