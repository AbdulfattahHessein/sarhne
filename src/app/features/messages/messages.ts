import { Component } from '@angular/core';
import { ProfileCard } from "../profile-card/profile-card";
import { MessageDetails } from "./message-details/message-details";

@Component({
  selector: 'app-messages',
  imports: [ProfileCard, MessageDetails],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages {}
