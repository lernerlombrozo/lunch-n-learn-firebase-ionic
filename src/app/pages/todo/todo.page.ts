import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  private readonly TODOS_COLLECTION = 'TODOS';
  public todos = this.firestoreService.listenCollection(this.TODOS_COLLECTION);
  constructor(
    private readonly alertController: AlertController,
    private readonly firestoreService: FirestoreService,
  ) {}

  ngOnInit() {}

  public keys(todo) {
    return Object.keys(todo);
  }

  public updateTodo(todo) {
    console.log(todo);
    this.firestoreService.updateDocument(this.TODOS_COLLECTION, todo.name, todo);
  }

  public async presentAddTodoAlert(todoName: string) {
    const alert = await this.alertController.create({
      header: 'Add a todo!',
      inputs: [
        {
          name: 'todo',
          type: 'text',
          placeholder: 'todo',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: data => {
            this.addTodo(todoName, data.todo);
          },
        },
      ],
    });

    await alert.present();
  }

  public async presentCreateTodoAlert() {
    const alert = await this.alertController.create({
      header: 'Create a list!',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'name',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: data => {
            this.createTodo(data.name);
          },
        },
      ],
    });

    await alert.present();
  }

  private createTodo(name: string): void {
    this.firestoreService.setOrMergeDocument(this.TODOS_COLLECTION, name, { name, todos: {} }).then(data => {
      console.log(data);
    });
  }

  private addTodo(todoName: string, todo: string) {
    this.firestoreService
      .setOrMergeDocument(this.TODOS_COLLECTION, todoName, { todos: { [todo]: false } })
      .then(data => {
        console.log(data);
      });
  }
}
