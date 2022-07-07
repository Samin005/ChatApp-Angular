import {Component, OnDestroy, OnInit} from '@angular/core';
import {RxStompService} from "./rx-stomp/rx-stomp.service";
import { Message } from '@stomp/stompjs';
import {environment} from "../environments/environment";
import {RxStompState} from "@stomp/rx-stomp";
import Swal from 'sweetalert2';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  messages: string[] = [];
  inputText: string = "";
  chatSubscription: Subscription = new Subscription();
  constructor(private rxStompService: RxStompService) {
  }

  ngOnInit() {
    this.setLoadingConditions();

    // receive updates when available
    this.chatSubscription = this.rxStompService.watch(environment.receiveEndPoint).subscribe((message: Message) => {
      this.messages.push(message.body);
    });
  }

  // Dynamically show loading when connection breaks
  setLoadingConditions(): void {
    Swal.fire({
      title: 'Establishing Connection',
      allowOutsideClick: false,
      showConfirmButton: false
    }).finally();
    Swal.showLoading();
    this.rxStompService.connectionState$.subscribe((state: RxStompState) => {
      if(state == 1) {
        // connection open
        Swal.fire({
          icon: "success",
          timer: 1000,
          showConfirmButton: false
        }).finally(() => Swal.close());
      }
      else if(state == 3) {
        // connection closed
        if(Swal.isVisible()) {
          Swal.update({
            title: 'Connection closed. Retrying...'
          });
        } else {
          Swal.fire({
            title: 'Connection closed. Retrying...',
            allowOutsideClick: false,
            showConfirmButton: false
          }).finally();
        }
        Swal.showLoading();
      }
    });
  }

  // send new updates to server
  onSendMessage(): void {
    this.rxStompService.publish({
      destination: environment.sendEndPoint,
      body: this.inputText
    });
  }

  // unsubscribe when component is destroyed
  ngOnDestroy(): void {
    this.chatSubscription.unsubscribe();
  }
}
