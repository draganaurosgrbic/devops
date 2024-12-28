import { Component } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Params } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messageForm = this.formBuilder.group({
    message: '',
  });

  roomName;
  senderId;
  sender;
  recepientId;
  recepient;
  messages = [];

  constructor(
    private socketService: ChatService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.senderId = params['sender_id']
      this.recepientId = params['recepient_id']

      if (this.senderId && this.recepientId) {
        if (this.senderId.localeCompare(this.recepientId) < 0) {
          this.roomName = this.senderId + "_" + this.recepientId;
        } else {
          this.roomName = this.recepientId + "_" + this.senderId;
        }

        this.profileService.readOneProfile(this.senderId).subscribe(res => {
          this.sender = res.first_name + " " + res.last_name;
        });

        this.profileService.readOneProfile(this.recepientId).subscribe(res => {
          this.recepient = res.first_name + " " + res.last_name;
        });

        this.connect();
      }
    });
  }

  ngOnDestroy() {
    if (this.roomName) {
      this.socketService.disconnect(this.roomName);
    }
  }

  init() {
    if (this.roomName) {
      this.socketService.init(this.messages.length, this.roomName);
    }
  }

  connect() {
    if (this.roomName) {
      this.socketService.setupSocketConnection(this.roomName);
      this.socketService.subscribeToMessages((err, data) => {
        this.messages = [...this.messages, data];
      });
      this.socketService.subscribeToInit((err, data) => {
        if (data) {
          this.messages = [...data.results, ...this.messages];
        }
      });
      this.init();
    }
  }

  submitMessage() {
    const message = this.messageForm.get('message').value;
    if (message) {
      this.socketService.sendMessage(
        { message, senderId: this.senderId, sender: this.sender, recepientId: this.recepientId, roomName: this.roomName });
      this.messageForm.reset();
    }
  }

  myId(): any {
    return this.senderId;
  }
}
