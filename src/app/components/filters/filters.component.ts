import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input
} from "@angular/core";
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FilterService } from "src/app/services/filter.service";
import { GeneralService } from "src/app/services/general.service";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"]
})
export class FiltersComponent implements OnInit, AfterViewInit {
  public filterType: string;
  public filterValue: any;
  public categoryType: string;
  @Input() public usertype;
  @ViewChild("filter", { static: false }) filterInput: ElementRef;
  constructor(
    private filterService: FilterService,
    private generalService: GeneralService
  ) {}

  ngOnInit() {
    this.filterType = "all";
    this.categoryType = "all";
  }
  ngAfterViewInit() {}

  filterTypeChange() {
    this.filterValue = null;
    this.generalService
      .getItemArray("coupon", this.usertype || sessionStorage.usertype)
      .subscribe(coupons => {
        this.filterService.filter.emit(coupons);
      });
  }
  filterContent(e) {
    if (e.type == "keyup") {
      fromEvent(this.filterInput.nativeElement, "keyup")
        .pipe(debounceTime(600))
        .subscribe(this.activateFilter, err => {
          this.filterError(err);
        });
    }
    if (e.type == "change") {
      this.filterValue = this.categoryType;
      this.activateFilter();
    }
  }

  activateFilter = () => {
    if (this.filterValue == "") return;

    this.filterService
      .getFilter(
        {
          filterType: this.filterType,
          filterValue: this.filterValue
        },
        this.usertype || sessionStorage.usertype
      )
      .subscribe(coupons => {
        this.filterService.filter.emit(coupons);
      });
  };
  filterError(err) {
    console.log(err);
  }
}
