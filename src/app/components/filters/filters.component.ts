import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { fromEvent } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import { FilterService } from "src/app/services/filter.service";
import { Coupon } from "src/models/coupon";
import { DataStoreService } from "src/app/services/data-store.service";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"]
})
export class FiltersComponent implements OnInit {
  public filterType: string;
  public filterValue: any;
  public categoryType: string;

  public coupons: Coupon[];
  @Input() public usertype: string;
  @Input() public title: string;

  @ViewChild("filter", { static: false }) filterInput: ElementRef;
  constructor(
    private filterService: FilterService,
    private dataStore: DataStoreService
  ) {}

  ngOnInit() {
    this.filterType = "all";
    this.categoryType = "all";
  }

  changeFilterType() {
    this.filterValue = null;

    if (this.title == "Available Coupons") {
      this.dataStore.availableCoupons.subscribe(avCoups => {
        this.dataStore.availableCouponsFiltered.next(avCoups);
      });
    } else {
      this.dataStore.purchasedCoupons.subscribe(pCoups => {
        this.dataStore.purchasedCouponsFiltered.next(pCoups);
      });
    }
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
    this.filterService
      .getFilter({
        filterType: this.filterType,
        filterValue: this.filterValue,
        filterTitle: this.title
      })
      .subscribe(filteredCoupons => {
        if (this.title == "Available Coupons") {
          this.filterAvailableCoupons(filteredCoupons);
        } else if (this.title == "Purchased Coupons") {
          this.filterPurchasedCoupons(filteredCoupons);
        } else {
          this.filterCompanyCoupons(filteredCoupons);
        }
      });
  };
  filterError(err) {
    console.log(err);
  }

  mapArrToObj(arr) {
    let obj = {};
    arr.forEach(item => (obj[item.id] = item));
    return obj;
  }
  filterAvailableCoupons(filteredCoupons) {
    let filteredObj = this.mapArrToObj(filteredCoupons);
    this.dataStore.availableCoupons
      .pipe(
        map(avCoups =>
          avCoups.filter(coup => {
            return !!filteredObj[coup.id];
          })
        )
      )
      .subscribe(filteredAvCoups => {
        this.dataStore.availableCouponsFiltered.next(filteredAvCoups);
      });
  }
  filterPurchasedCoupons(filteredCoupons) {
    let filteredObj = this.mapArrToObj(filteredCoupons);
    this.dataStore.purchasedCoupons
      .pipe(
        map(pCoups =>
          pCoups.filter(coup => {
            return !!filteredObj[coup.id];
          })
        )
      )
      .subscribe(filteredPCoups => {
        this.dataStore.purchasedCouponsFiltered.next(filteredPCoups);
      });
  }
  filterCompanyCoupons(filteredCoupons) {
    let filteredObj = this.mapArrToObj(filteredCoupons);

    this.dataStore.companies
      .pipe(
        map(cCoups =>
          cCoups.filter(coup => {
            return !!filteredObj[coup.id];
          })
        )
      )
      .subscribe(filteredCCoups => {
        this.dataStore.companyCouponsFiltered.next(filteredCCoups);
      });
  }
}
