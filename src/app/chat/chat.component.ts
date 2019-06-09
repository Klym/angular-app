import { Component, AfterViewChecked, ElementRef, ViewChild, OnInit, Input } from "@angular/core";
import { Message } from "./message"
import * as moment from 'moment';

@Component({
    selector: "chat",
    templateUrl: "chat.component.html",
    styleUrls: ["chat.component.css"]
})
export class ChatComponent implements OnInit, AfterViewChecked {

    @Input()
    admin: boolean;
    @Input()
    title: string;
    @Input()
    avatar: string;
    @Input()
    name: string;
    @Input()
    description: string;

    @ViewChild('scrollMe', {static: false})
    private myScrollContainer: ElementRef;
    private count: number;

    static messages: Array<Message> = [];
    message: string;

    constructor() {
        ChatComponent.messages = JSON.parse(localStorage.getItem('messages'));
        if(!ChatComponent.messages) {
            ChatComponent.messages = [];
        }
    }

    send() {
        if(!this.message) return;

        let time = moment().locale("ru").calendar();
        let message = new Message(this.message, time, this.avatar, this.admin);
        ChatComponent.messages.push(message);
        localStorage.setItem('messages', JSON.stringify(ChatComponent.messages));
        this.message = "";
    }

    get staticMessages() {
        return ChatComponent.messages;
    }

    ngOnInit() { 
        this.scrollToBottom();
    }

    ngAfterViewChecked() {
        if((ChatComponent.messages ? ChatComponent.messages.length : 0) != this.count) {
            this.count = ChatComponent.messages ? ChatComponent.messages.length : 0;
            this.scrollToBottom();
        }
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) {}
    }
}