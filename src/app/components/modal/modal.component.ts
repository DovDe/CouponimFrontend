import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ComponentFactoryResolver,
  OnDestroy,
  HostListener
} from "@angular/core";
import { PlaceholderDirective } from "src/app/directives/placeholder.directive";
import { ModalService } from "src/app/services/modal.service";
@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() parentType: string;
  @Input() viewType: String;
  @Output() close = new EventEmitter<void>();

  // ASCI code for escape
  private ESC: number = 27;

  // get access to directive that stores placeholder and the placeholder in the DOM
  // viewChild takes a selector or a type here we are adding the Placeholder directive
  // and name it viewHost
  @ViewChild(PlaceholderDirective, { static: true })
  viewHost: PlaceholderDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: ModalService
  ) {}

  // listen to keyboard if the key type is esc close the modal
  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.ESC) {
      this.onClose();
    }
  }

  ngOnInit() {
    // load child component
    this.loadComponent();
  }

  ngOnDestroy() {
    this.viewHost.viewContainerRef.clear();
  }
  onClose() {
    this.viewHost.viewContainerRef.clear();
    this.close.emit();
  }

  loadComponent() {
    // go to modal service and return a component based on the parent and view type
    const cmpFromService = this.modalService.getComp(
      this.parentType,
      this.viewType
    );

    // setup component factory  so that angular can setup the componant
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      cmpFromService
    );

    // get access to the template and the view container ref using the ViewChild
    // the ViewContainerReference that enables interaction with the place stored by the
    // directive in the DOM
    const componentRef = this.viewHost.viewContainerRef;

    // clear all previouse components loaded into this place in the DOM
    componentRef.clear();

    // use the create component method supplied by the ViewContainerRef and pass
    // it the component factory to load the component into the placeholder directive
    componentRef.createComponent(componentFactory);
  }
}
