import { Component, AfterViewChecked, ElementRef, ViewChild, OnInit } from "@angular/core";
import { Message } from "./message"
import * as moment from 'moment';

@Component({
    selector: "chat",
    templateUrl: "chat.component.html",
    styleUrls: ["chat.component.css"]
})
export class ChatComponent implements OnInit, AfterViewChecked {
    @ViewChild('scrollMe', {static: false})
    private myScrollContainer: ElementRef;

    @ViewChild('scrollMe2', {static: false})
    private myScrollContainer2: ElementRef;

    userMessage: string;
    adminMessage: string;
    messages: Array<Message> = [];
    private count: number;

    send(isAdmin: boolean) {
        if(!(isAdmin ? this.adminMessage : this.userMessage)) return;

        let text = (isAdmin ? this.adminMessage : this.userMessage);
        let time = moment().locale("ru").calendar();
        let avatar = "../../assets/images/" + (isAdmin ? "admin" : "user") + ".png";
        let message = new Message(text, time, avatar, isAdmin);
        this.messages.push(message);

        this.userMessage = this.adminMessage = "";
    }

    ngOnInit() { 
        this.scrollToBottom();
    }

    ngAfterViewChecked() {
        if((this.messages ? this.messages.length : 0) != this.count) {
            this.count = this.messages ? this.messages.length : 0;
            this.scrollToBottom();
        }
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
            this.myScrollContainer2.nativeElement.scrollTop = this.myScrollContainer2.nativeElement.scrollHeight;
        } catch(err) {}
    }
}