import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url = 'ws://localhost:8000/';
  socket;

  constructor() { }

  setupSocketConnection(roomName: string) {
    this.socket = io(this.url);
    if (this.socket) {
      this.socket.emit('join', roomName);
      this.socket.on('reconnect', () => {
        this.socket.emit('join', roomName)
      })
    }
  }

  subscribeToMessages = (cb) => {
    if (!this.socket) {
      return (true);
    }
    this.socket.on('message', msg => {
      return cb(null, msg);
    });
  }

  subscribeToInit = (cb) => {
    if (!this.socket) {
      return (true);
    }
    this.socket.on('init', msgs => {
      return cb(null, msgs);
    });
  }

  init = (offset: number, roomName) => {
    if (this.socket) {
      this.socket.emit('init', { 'offset': offset }, roomName);
    }
  }

  sendMessage = ({ message, senderId, sender, recepientId, roomName }) => {
    if (this.socket) {
      this.socket.emit('message', { 'content': message, 'sender_id': senderId, 'sender': sender, 'recipient_id': recepientId }, roomName);
    }
  }

  disconnect(roomName: string) {
    if (this.socket) {
      if (this.socket) {
        this.socket.emit('leave', roomName);
      }
      this.socket.disconnect();
    }
  }
}
