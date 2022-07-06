import {Component, OnInit} from '@angular/core';
import {RxStompService} from "./rx-stomp/rx-stomp.service";
import { Message } from '@stomp/stompjs';
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  messages: string[] = [];
  constructor(private rxStompService: RxStompService) {
  }

  // receive updates when available
  ngOnInit() {
    this.rxStompService.watch(environment.receiveEndPoint).subscribe((message: Message) => {
      this.messages.push(message.body);
    });
  }

  // send new updates to server
  onSendMessage(): void {
    this.rxStompService.publish({
      destination: environment.sendEndPoint,
      body: "YOLO"
    });
  }
}
