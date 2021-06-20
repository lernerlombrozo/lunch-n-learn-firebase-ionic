import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { RealtimeDatabaseService } from 'src/app/services/realtime-database/realtime-database.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent, { read: IonContent, static: false }) content: IonContent;
  private readonly CHAT_REF = '/chat';
  private readonly SCROLL_TIME_MS = 300;

  constructor(
    private readonly realTimeDatabaseService: RealtimeDatabaseService,
    private readonly sessionService: SessionService,
  ) {}

  public message = '';
  public messages = [];

  ngOnInit() {
    this.listenToMessages();
  }

  public async sendMessage() {
    const { email, uid } = this.sessionService.currentSession;
    await this.realTimeDatabaseService.post(this.CHAT_REF, { email, uid, message: this.message });
    this.message = '';
  }

  private listenToMessages() {
    this.realTimeDatabaseService.listenNewPosts(this.CHAT_REF).subscribe(message => {
      this.addMessageAndScrollToBottom(message);
    });
  }

  private addMessageAndScrollToBottom(message): void {
    this.messages.push(message);
    setTimeout(() => {
      this.content.scrollToBottom(this.SCROLL_TIME_MS);
    }, this.SCROLL_TIME_MS);
  }
}
