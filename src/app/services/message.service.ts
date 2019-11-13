import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  public message = new BehaviorSubject<string>(null);
  constructor() {}
}
