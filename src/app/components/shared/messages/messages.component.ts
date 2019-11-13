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
  public state: string = "start";
  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.message.subscribe(message => {
      this.message = message;
      setTimeout(() => {
        this.message = null;
      }, 3000);
    });
  }
}
