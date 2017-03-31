import { Directive, OnChanges, ViewContainerRef, TemplateRef, Input, ElementRef, IterableDiffers, IterableDiffer, ChangeDetectorRef, DoCheck, ViewRef } from '@angular/core';

@Directive({
  selector: '[bnLoop]'
})
export class BnLoopDirective implements DoCheck {

  private collection: any;
  private differ: IterableDiffer<any>;
  private viewMap: Map<any, ViewRef> = new Map<any, ViewRef>();

  @Input('bnLoopOf') set bnloop(coll: any) {
    console.log(coll);
    this.collection = coll;
    if (coll && !this.differ) {
      this.differ = this.differs.find(coll).create(null);
    };
  }


  constructor(private differs: IterableDiffers, private changeDetector: ChangeDetectorRef, private template: TemplateRef<any>, private viewContainer: ViewContainerRef) { }

  ngDoCheck() {
    if (this.differ) {
      const changes = this.differ.diff(this.collection);
      if (changes) {
        changes.forEachAddedItem((change) => {
          const view = this.viewContainer.createEmbeddedView(this.template);
          view.context.$implicit = change.item;
          view.context.first = 23;
          this.viewMap.set(change.item, view);
        });

        changes.forEachRemovedItem((change) => {
          const view = this.viewMap.get(change.item);
          const viewIndex = this.viewContainer.indexOf(view);
          this.viewContainer.remove(viewIndex);
          this.viewMap.delete(change.item);
        });
      };
    }
  };


}
