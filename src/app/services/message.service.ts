import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  // store message globaly
  public message = new BehaviorSubject<string>(null);
  constructor() {}
}
