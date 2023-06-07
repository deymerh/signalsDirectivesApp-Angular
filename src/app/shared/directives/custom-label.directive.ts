import { Directive, ElementRef, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({ selector: '[customLabel]' })
export class CustomLabelDirective {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors: ValidationErrors | null | undefined = null;

  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    this.htmlElement = this.elementRef;
  }

  setStyle(): void {
    if (!this.htmlElement) return;
    this.htmlElement.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if (!this.htmlElement) return;

    if (!this._errors) {
      this.htmlElement.nativeElement.innerHTML = 'No hay errores';
      return;
    }

    if (this.getKeyOfError('required')) {
      this.htmlElement.nativeElement.innerHTML = 'Este campo es requerido';
    }

    if (this.getKeyOfError('minlength')) {
      this.htmlElement.nativeElement.innerHTML = `Debes tener mínimo ${this._errors['minlength'].requiredLength} caracteres y tienes ${this._errors['minlength'].actualLength}`;
    }

    if (this.getKeyOfError('email')) {
      this.htmlElement.nativeElement.innerHTML = `Debe ser un correo eléctronico`;
    }
  }

  getKeyOfError(key: string): boolean {
    return Object.keys(this._errors!).includes(key);
  }

}
