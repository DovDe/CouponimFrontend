import { Directive, ViewContainerRef } from "@angular/core";

// this is used in the html to notify angular to use that element
// as the view container
@Directive({
  selector: "[appPlaceholder]"
})

// setup viewContainerRef which is an object managed by angular sets a reference
// to a place in the DOM with which it can interact, this object has methods that
// creates components
// To get access to viewContainerRef we create a Directive that loads the viewContainerRef
export class PlaceholderDirective {
  // must be public
  constructor(public viewContainerRef: ViewContainerRef) {}
}
