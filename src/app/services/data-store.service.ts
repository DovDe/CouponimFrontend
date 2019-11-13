import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Coupon } from "src/models/coupon";
import { Customer } from "src/models/customer";
import { Company } from "src/models/company";
import { GeneralService } from "./general.service";

@Injectable({
  providedIn: "root"
})
export class DataStoreService {
  public coupon = new BehaviorSubject<Coupon>(null);
  public customer = new BehaviorSubject<Customer>(null);
  public company = new BehaviorSubject<Company>(null);

  public availableCoupons = new BehaviorSubject<Coupon[]>(null);
  public purchasedCoupons = new BehaviorSubject<Coupon[]>(null);

  public availableCouponsFiltered = new BehaviorSubject<Coupon[]>(null);
  public purchasedCouponsFiltered = new BehaviorSubject<Coupon[]>(null);

  public companyCouponsFiltered = new BehaviorSubject<Coupon[]>(null);
  public allCoupons = new BehaviorSubject<Coupon[]>(null);
  public customers = new BehaviorSubject<Customer[]>(null);
  public companies = new BehaviorSubject<Company[]>(null);

  public clickedCoupon = new BehaviorSubject<any>(null);

  public userInfo = new BehaviorSubject<any>(null);

  constructor(private genService: GeneralService) {}

  /**
   * Get all coupons and purchased coupons from DB.
   * Calculate available coupons list
   * update dataStore with new purchased coupons and available coupons lists.
   */

  // Custom Observables

  public setPurchasedCouponsObservable: Observable<any> = Observable.create(
    observer => observer.next(this.setPurchasedCoupons())
  );

  public setAllCouponsObservable: Observable<any> = Observable.create(
    observer => observer.next(this.setAllCoupons())
  );
  // load Coupons from DB and set behaviour subjects
  setPurchasedCoupons = () => {
    this.genService.getPurchasedCoupon().subscribe(pCoups => {
      this.purchasedCoupons.next(pCoups);
      this.purchasedCouponsFiltered.next(pCoups);
    });
  };

  setAllCoupons = () => {
    this.genService.getItemArray("coupon").subscribe(allCoupons => {
      this.allCoupons.next(allCoupons);
    });
  };

  setAvailableCoupons(allCoupons, purchasedCoupons) {
    if (!allCoupons || !purchasedCoupons) return;
    let obj: Object = {};
    let availableCoups: Coupon[] = [];

    purchasedCoupons.forEach(pCoups => {
      obj[pCoups.title] = 1;
    });
    allCoupons.forEach(coup => {
      if (obj[coup.title] != 1) {
        availableCoups.push(coup);
      }
    });
    this.availableCoupons.next(availableCoups);
    this.availableCouponsFiltered.next(availableCoups);
  }

  setCustomerCoupons() {
    this.setAllCouponsObservable.subscribe(() =>
      this.setPurchasedCouponsObservable.subscribe(() => {
        this.allCoupons.subscribe(aCoups => {
          this.purchasedCoupons.subscribe(pCoups => {
            this.setAvailableCoupons(aCoups, pCoups);
          });
        });
      })
    );
  }

  setCompanyCoupons() {
    this.genService.getItemArray("coupon").subscribe(coupons => {
      this.allCoupons.next(coupons);
      this.companyCouponsFiltered.next(coupons);
    });
  }
}
