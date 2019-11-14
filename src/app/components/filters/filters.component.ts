import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { fromEvent } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import { FilterService } from "src/app/services/filter.service";
import { Coupon } from "src/models/coupon";
import { DataStoreService } from "src/app/services/data-store.service";
import { MessageService } from "src/app/services/message.service";
import { mapArrToObj } from "src/utils/utilityMethods";

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

  // get input from html as element reference
  @ViewChild("filter", { static: false }) filterInput: ElementRef;

  constructor(
    private filterService: FilterService,
    private dataStore: DataStoreService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // reset filters
    this.filterType = "all";
    this.categoryType = "all";
  }

  // method to change the filter type
  changeFilterType() {
    // reset value on change
    this.filterValue = null;

    switch (this.title) {
      // load available coupons from data store and set the filterd available coupons
      case "Available Coupons":
        this.dataStore.availableCoupons.subscribe(avCoups => {
          this.dataStore.availableCouponsFiltered.next(avCoups);
        });
        break;
      case "Purchased Coupons":
        // load purchased coupons from data store and set the filterd purchased coupons
        this.dataStore.purchasedCoupons.subscribe(pCoups => {
          this.dataStore.purchasedCouponsFiltered.next(pCoups);
        });
        break;
      default:
        // load all company coupon from data store and set to filter company coupons
        this.dataStore.allCoupons.subscribe(cCoups => {
          this.dataStore.companyCouponsFiltered.next(cCoups);
        });
    }
  }

  filterContent(e) {
    // if event was a key stroke wait 600 mls and then activate the filter
    if (e.type == "keyup") {
      fromEvent(this.filterInput.nativeElement, "keyup")
        .pipe(debounceTime(600))
        .subscribe(this.activateFilter, err => {
          this.filterError(err);
        });
    }
    // if event was a change event set filter value to category type and activate the filter
    if (e.type == "change") {
      this.filterValue = this.categoryType;
      this.activateFilter();
    }
  }

  /**
   *  This is the main filter method that loads the correct data
   * and then sends it out.
   *
   * goes to filter service to fire the proper http request
   *  switches through filter title and activates the proper method with the loaded data
   */
  activateFilter = () => {
    this.filterService
      .getFilter({
        filterType: this.filterType,
        filterValue: this.filterValue,
        filterTitle: this.title
      })
      .subscribe(filteredCoupons => {
        switch (this.title) {
          case "Available Coupons":
            this.filterAvailableCoupons(filteredCoupons);
            break;
          case "Purchased Coupons":
            this.filterPurchasedCoupons(filteredCoupons);
            break;
          default:
            this.filterCompanyCoupons(filteredCoupons);
        }
      });
  };
  filterError(err) {
    this.messageService.message.next(err);
  }

  filterAvailableCoupons(filteredCoupons) {
    //maps the filtered available coupons to object with id as a key
    let filteredObj = mapArrToObj(filteredCoupons);

    // loads all available coupons from the data store
    this.dataStore.availableCoupons
      // maps and filters the array of available coupons based on the filtered object
      .pipe(map(avCoups => avCoups.filter(coup => !!filteredObj[coup.id])))
      .subscribe(filteredAvCoups => {
        // sets the available coupons filtered to the filtered result
        this.dataStore.availableCouponsFiltered.next(filteredAvCoups);
      });
  }
  filterPurchasedCoupons(filteredCoupons) {
    // maps the filtered purchased coupons to object with id as a key
    let filteredObj = mapArrToObj(filteredCoupons);

    //maps and filters the array of purchased coupons based on the filtered object
    this.dataStore.purchasedCoupons
      .pipe(map(pCoups => pCoups.filter(coup => !!filteredObj[coup.id])))
      .subscribe(filteredPCoups => {
        // sets the purchased coupons filter to the filtered result
        this.dataStore.purchasedCouponsFiltered.next(filteredPCoups);
      });
  }
  filterCompanyCoupons(filteredCoupons) {
    // maps the filtered coupons to object with id as a key
    let filteredObj = mapArrToObj(filteredCoupons);

    this.dataStore.allCoupons
      // maps and filters the the array of coupons based on filtered object
      .pipe(map(cCoups => cCoups.filter(coup => !!filteredObj[coup.id])))
      .subscribe(filteredCCoups => {
        // sets the new company coupons filtered value
        this.dataStore.companyCouponsFiltered.next(filteredCCoups);
      });
  }
}
