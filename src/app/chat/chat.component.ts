import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatsCollection: AngularFirestoreCollection<any>;
  chats;
  message;
  removeMessage;

  chatSnap;

  constructor(private fireSotreService: AngularFirestore) { 
    this.chatsCollection = this.fireSotreService.collection("chat", ref => ref.orderBy("createdBy"))
    //this.chats = this.chatsCollection.valueChanges();
    this.chats = this.chatsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        // 把 data 解構，變成在 ID 裡面
        return { id, ...data };
      })))
  }


  send(){
    this.chatsCollection.add({
      message: this.message,
      createdBy: new Date(),
    }).then(()=>this.message = '')
  }

  remove(id){
    const doc = this.chatsCollection.doc(id);
    doc.delete()
  }

  // 把 id 取出來，其他重組變成 item 這個物件
  update({id, ... item }){
    const doc = this.chatsCollection.doc(id);
    doc.update(item)
  }

  ngOnInit(): void {
  }

}
