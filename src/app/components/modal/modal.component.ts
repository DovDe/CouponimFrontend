import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ComponentFactoryResolver,
  OnDestroy,
  AfterViewInit,
  HostListener
} from "@angular/core";
import { PlaceholderDirective } from "src/app/directives/placeholder.directive";
import { ModalService } from "src/app/services/modal.service";
@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit, OnDestroy, AfterViewInit {
  public header: string;
  @Input() parentType: string;
  @Input() viewType: String;
  @Output() close = new EventEmitter<void>();

  private ESC: number = 27;
  @ViewChild(PlaceholderDirective, { static: true })
  viewHost: PlaceholderDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: ModalService
  ) {}

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.ESC) {
      this.onClose();
    }
  }

  ngOnInit() {
    this.header = this.viewType + this.parentType;
    this.loadComponent();
  }
  ngAfterViewInit() {}

  ngOnDestroy() {
    this.viewHost.viewContainerRef.clear();
  }
  onClose() {
    this.viewHost.viewContainerRef.clear();
    this.close.emit();
  }

  loadComponent() {
    // service to fetch correct component
    const cmpFromService = this.modalService.getComp(
      this.parentType,
      this.viewType
    );
    // setup component factory
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      cmpFromService
    );

    const componentRef = this.viewHost.viewContainerRef;
    componentRef.clear();
    componentRef.createComponent(componentFactory);
  }
}
