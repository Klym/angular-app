import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { ChatComponent } from "./chat/chat.component";

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [AppComponent, ChatComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }