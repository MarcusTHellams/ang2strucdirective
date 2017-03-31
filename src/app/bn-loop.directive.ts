import { Directive, OnChanges, ViewContainerRef, TemplateRef, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[bnLoop]'
})
export class BnLoopDirective implements OnChanges {
  @Input('bnLoopFrom') set setFrom(number: Number) {
    this._from = number;
  };

  @Input('bnLoopTo') set setLoop(number: Number) {
    this._to = number;
  };

  @Input('bnLoopStep') set setStep(number: Number) {
    this._step = number;
  }
  private _from: Number;
  private _to: Number;
  private _step: Number;
  private renderedRange: Array<any> = [];
  private renderedViews: Object = {};
  private generateRange(from, to, step) {
    let range = [];
    // Incrementing range.
    if (from <= to) {
      for (let i = from; i <= to; i += step) {
        range.push(i);
      }
      // Decrementing range.
    } else {
      for (let i = from; i >= to; i += step) {
        range.push(i);
      }
    }
    return (range);
  };

  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) { }

  ngOnChanges(changes) {
    this._step = 1;
    let range = this.generateRange(this._from, this._to, this._step);
    let views = {};

    for (let domIndex = 0, domLength = range.length; domIndex < domLength; domIndex++) {
      let i = range[domIndex];
      let existingViewRef = (this.renderedViews[i] && this.renderedViews[i].viewRef);
      views[i] = {
        index: i,
        viewRef: (existingViewRef || null),
        first: (domIndex === 0),
        last: (domIndex === (domLength - 1)),
        middle: ((domIndex !== 0) && (domIndex !== (domLength - 1))),
        even: !(i % 2),
        odd: (i % 2)
      };
    }

    // Next, let's delete the views that are no longer relevant in
    // new range.
    for (let domIndex = 0; domIndex < this.renderedRange.length; domIndex++) {
      let i = this.renderedRange[domIndex];
      if (!views.hasOwnProperty(i)) {
        this.viewContainer.remove(this.viewContainer.indexOf(this.renderedViews[i].viewRef));
      }
    }

    // Finally, let's update existing views and render any new ones.
    for (let domIndex = 0; domIndex < range.length; domIndex++) {
      let i = range[domIndex];
      let view = views[i];
      // If this view didn't pull an existing viewRef from the
      // previous range, let's create a new clone.
      if (!view.viewRef) {
        view.viewRef = this.viewContainer.createEmbeddedView(this.templateRef, domIndex);
      }
      // Set up all the local variable bindings.
      // --
      // NOTE: The "$implicit" variable is the first #var in the
      // template syntax.

      // view.viewRef.setLocal("$implicit", i);
      // view.viewRef.setLocal("first", view.first);
      // view.viewRef.setLocal("last", view.last);
      // view.viewRef.setLocal("middle", view.middle);
      // view.viewRef.setLocal("even", view.even);
      // view.viewRef.setLocal("odd", view.odd);

      view.viewRef.context.$implicit = i;
      view.viewRef.context.first = view.first;
      view.viewRef.context.last = view.last;
      view.viewRef.context.middle = view.middle;
      view.viewRef.context.even = view.even;
      view.viewRef.context.odd = view.odd;
    }
    // Store the new range configuration for comparison in the next
    // change event.
    this.renderedRange = range;
    this.renderedViews = views;



  }

}
