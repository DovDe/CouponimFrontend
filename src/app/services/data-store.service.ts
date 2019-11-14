import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Coupon } from "src/models/coupon";
import { Customer } from "src/models/customer";
import { Company } from "src/models/company";
import { GeneralService } from "./general.service";
import { mapArrToObj } from "src/utils/utilityMethods";

@Injectable({
  providedIn: "root"
})
export class DataStoreService {
  // Used in modals to dynamically load data to view and edit items
  public coupon = new BehaviorSubject<Coupon>(null);
  public customer = new BehaviorSubject<Customer>(null);
  public company = new BehaviorSubject<Company>(null);

  // unfiltered coupons sorted by wether they were purchased or not
  public availableCoupons = new BehaviorSubject<Coupon[]>(null);
  public purchasedCoupons = new BehaviorSubject<Coupon[]>(null);

  // filter coupons sorted by wether they were purchased or not
  public availableCouponsFiltered = new BehaviorSubject<Coupon[]>(null);
  public purchasedCouponsFiltered = new BehaviorSubject<Coupon[]>(null);

  // filtered company coupons
  public companyCouponsFiltered = new BehaviorSubject<Coupon[]>(null);

  // all coupons (when company is logged on it will only load all
  // company coupons )
  public allCoupons = new BehaviorSubject<Coupon[]>(null);

  // all customer and companies
  public customers = new BehaviorSubject<Customer[]>(null);
  public companies = new BehaviorSubject<Company[]>(null);

  // used on navbar and on  user info modal to load user data
  public userInfo = new BehaviorSubject<any>(null);

  // used on coupon view components to dynamically add purchase coupon button
  public purchased: boolean;

  constructor(private genService: GeneralService) {}

  /**
   * Get all coupons and purchased coupons from DB.
   * Calculate available coupons list
   * update dataStore with new purchased coupons and available coupons lists.
   */

  /********************************************
   *          Custom Observables
   *******************************************/

  // observable that calls set purchase coupons
  public setPurchasedCouponsObservable: Observable<any> = Observable.create(
    observer => {
      observer.next(this.setPurchasedCoupons());
    }
  );

  // observable that calls set all coupons
  public setAllCouponsObservable: Observable<any> = Observable.create(
    observer => {
      observer.next(this.setAllCoupons());
    }
  );

  // load purchased Coupons from DB and set in data store
  setPurchasedCoupons = () => {
    this.genService.getPurchasedCoupon().subscribe(pCoups => {
      this.purchasedCoupons.next(pCoups);
      this.purchasedCouponsFiltered.next(pCoups);
    });
  };

  // load purchased Coupons from DB and set in data store
  // (if user is a company only company coupons will be loaded)
  setAllCoupons = () => {
    this.genService.getItemArray("coupon").subscribe(allCoupons => {
      this.allCoupons.next(allCoupons);
    });
  };

  // set available coupons based on all coupons and purchased coupons
  setAvailableCoupons(allCoupons, purchasedCoupons) {
    // verify that allCoupons and purchase coupons exist
    if (!allCoupons || !purchasedCoupons) return;
    // map purchased coupons to object
    let obj = mapArrToObj(purchasedCoupons);
    // get available coupons buy filtering out the purchased coupons from all the coupons
    let availableCoups: Coupon[] = allCoupons.filter(coup => !obj[coup.id]);

    // set the available coupons and the  available filtered coupons globaly
    this.availableCoupons.next(availableCoups);
    this.availableCouponsFiltered.next(availableCoups);
  }

  setCustomerCoupons() {
    // sets all coupons from DB
    this.setAllCouponsObservable.subscribe(() =>
      // sets all  purchased coupons from DB
      this.setPurchasedCouponsObservable.subscribe(() => {
        // loads all coupons from data store
        this.allCoupons.subscribe(aCoups => {
          // loads all purchased coupons from data store
          this.purchasedCoupons.subscribe(pCoups => {
            // set available coupons
            this.setAvailableCoupons(aCoups, pCoups);
          });
        });
      })
    );
  }

  // gets compant coupons from DB and sets globably
  setCompanyCoupons() {
    this.genService.getItemArray("coupon").subscribe(coupons => {
      this.allCoupons.next(coupons);
      this.companyCouponsFiltered.next(coupons);
    });
  }
}
