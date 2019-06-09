export class Message {
    text: string;
    time: string;
    avatar: string;
    isAdmin: boolean;

    constructor(text: string, time: string, avatar: string, isAdmin: boolean) {
        this.text = text;
        this.time = time;
        this.avatar = avatar;
        this.isAdmin = isAdmin;
    }

    serialize() : object {
        return {'text': this.text, 'time': this.time, 'avatar': this.avatar, 'isAdmin' : this.isAdmin};
    }
}