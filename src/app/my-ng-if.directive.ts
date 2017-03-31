import { Directive, Input, TemplateRef, ViewContainerRef, OnChanges } from '@angular/core';

@Directive({
    selector: '[myNgIf]'
})
export class MyNgIfDirective implements OnChanges {

    constructor(private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) {
    }
    ngOnChanges(changes) {

    };

    @Input() set myNgIf(condition: boolean) {
        console.log(condition);
        if (condition) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }

}
