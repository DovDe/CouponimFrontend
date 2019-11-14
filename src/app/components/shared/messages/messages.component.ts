import { Component, OnInit } from "@angular/core";
import { MessageService } from "src/app/services/message.service";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"],
  // these animations animate component when the component when it instantiated and when it is destroyed
  animations: [
    trigger("divState", [
      state(
        "in",
        style({
          transform: "translateX(0)",
          opacity: 1
        })
      ),

      transition("void => *", [
        style({
          transform: "translateX(-50vw)",
          opacity: 0
        }),
        animate(300)
      ]),
      transition("* => void", [
        animate(
          300,
          style({
            transform: "translateX(-50vw)",
            opacity: 0
          })
        )
      ])
    ])
  ]
})
export class MessagesComponent implements OnInit {
  public message: string;
  constructor(private messageService: MessageService) {}

  ngOnInit() {
    // load message from message service then after 3.5 seconds reset message to null
    this.messageService.message.subscribe(message => {
      this.message = message;
      setTimeout(() => {
        this.message = null;
      }, 3500);
    });
  }
}
