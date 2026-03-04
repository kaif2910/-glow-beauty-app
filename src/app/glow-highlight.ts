import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appGlow]',
  standalone: true
})
export class GlowHighlightDirective {
  @Input() glowColor: string = '#fce7f3'; // Default light pink glow

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.setGlow(this.glowColor, '0 10px 25px -5px rgba(219, 39, 119, 0.2)');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.setGlow('', '');
  }

  private setGlow(color: string, shadow: string) {
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.boxShadow = shadow;
    this.el.nativeElement.style.transition = 'all 0.3s ease';
  }
}
