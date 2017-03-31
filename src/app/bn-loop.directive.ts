import { Directive, OnChanges, ViewContainerRef, TemplateRef, Input, ElementRef, IterableDiffers, IterableDiffer, ChangeDetectorRef, DoCheck, ViewRef } from '@angular/core';

@Directive({
  selector: '[bnLoop]'
})
export class BnLoopDirective implements DoCheck {

  private collection: any;
  private differ: IterableDiffer<any>;
  private viewMap: Map<any, ViewRef> = new Map<any, ViewRef>();

  // @Input('bnLoopFrom') set bnloop(coll: any) {
  //   console.log(coll);
  //   this.collection = coll;
  //   if (coll && !this.differ) {
  //     this.differ = this.differs.find(coll).create(null);
  //   };
  // }


  @Input('bnLoopFrom') set setFrom(coll: any) {
    this.collection = coll;
    if (coll && !this.differ) {
      this.differ = this.differs.find(coll).create(null);
    };
  };

  @Input('bnLoopTo') set setLoop(number: Number) {
    console.log(number, 'toooooooooooo');
    this._to = number;
  };

  @Input('bnLoopStep') set setStep(number: Number) {
    console.log(number, 'stepppppppppppppp');
    this._step = number;
  }
  private _from: Number;
  private _to: Number;
  private _step: Number;
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


  constructor(private differs: IterableDiffers, private changeDetector: ChangeDetectorRef, private template: TemplateRef<any>, private viewContainer: ViewContainerRef) { }

  ngDoCheck() {
    this._step = 1;
    let range = this.generateRange(1, this._to, this._step);
    let views = {};


    for (let domIndex = 0, domLength = range.length; domIndex < domLength; domIndex++) {
      let i = range[domIndex];
      let existingViewRef = this.viewMap.get(i);
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


    console.log(views, 'viewsssssssssssss');

    for (let domIndex = 0; domIndex < range.length; domIndex++) {
      var i = range[domIndex];
      var view = views[i];
      // If this view didn't pull an existing viewRef from the
      // previous range, let's create a new clone.
      if (!view.viewRef) {
        view.viewRef = this.viewContainer.createEmbeddedView(this.template);
        this.viewMap.set(i, view.viewRef);
      }
      console.log(view.viewRef.context, 'contextxxxxx');
      // Set up all the local variable bindings.
      // --
      // NOTE: The "$implicit" variable is the first #var in the
      // template syntax.

      view.viewRef.context.$implicit = i;
      view.viewRef.context.first = view.first;
      view.viewRef.context.last = view.last;
      view.viewRef.context.middle = view.middle;
      view.viewRef.context.even = view.even;
      view.viewRef.context.odd = view.odd;
    }

    console.log(this.collection, 'collectionnnnnnnnnnnnnnnnnnn');


    // if (this.differ) {
    //   const changes = this.differ.diff(this.collection);
    //   if (changes) {
    //     console.log(changes.hasOwnProperty('collection'), 'Changessssss');
    //     changes.forEachAddedItem((change) => {
    //       console.log(change);
    //       const view = this.viewContainer.createEmbeddedView(this.template);
    //       console.log(view, 'viewwwwwww');
    //       view.context.$implicit = change.item;
    //       view.context.first = change.currentIndex;
    //       this.viewMap.set(change.item, view);
    //     });

    //     changes.forEachRemovedItem((change) => {
    //       const view = this.viewMap.get(change.item);
    //       const viewIndex = this.viewContainer.indexOf(view);
    //       this.viewContainer.remove(viewIndex);
    //       this.viewMap.delete(change.item);
    //     });
    //   };
    // }
  };


}
