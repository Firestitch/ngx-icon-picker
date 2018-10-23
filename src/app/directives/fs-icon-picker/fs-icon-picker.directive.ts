import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({ selector: '[fsIconPicker]' })
export class FsIconPickerDirective implements OnInit {
    constructor(private el: ElementRef, private renderer: Renderer) {

        // Remove the inputWrapper attribute (not really necessary, but just to be clean)
        this.renderer.setElementAttribute(this.el.nativeElement, "inputWrapper", null);

        // Get parent of the original input element
        var parent = this.el.nativeElement.parentNode;

        // Create a div and add it to the parent
        // Note: it seems that Renderer creates the element in the right place,
        // no need to specify where.
        var divElement = this.renderer.createElement(parent, "div");

        // Add class "input-wrapper"
        this.renderer.setElementClass(divElement, "input-wrapper1111111111111111111", true);

        // Move the input as a child of the div
        divElement.appendChild(this.el.nativeElement);

        // var sp1 = document.createElement('span');
        // sp1.setAttribute('matPrefix','');

        // var sp1 = document.createElement('span');
        // sp1.setAttribute('matPrefix','');

        // //sp1.appendChild(el.nativeElement);
        // el.nativeElement.replaceWith(sp1);
    }

    ngOnInit() {
        //debugger;
        //<span matPrefix></span>
        var sp1 = document.createElement('span');
        sp1.setAttribute('matPrefix','');

        var sp1 = document.createElement('span');
         sp1.setAttribute('matPrefix','');

        //sp1.appendChild(el.nativeElement);
        this.el.nativeElement.parentNode.appendChild(sp1);
    }
}
