import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

interface ToDo {
  id: number;
  item: string;
  isCompleted: boolean;
}



@Injectable({
  providedIn: 'root'
})
export class HandleTodoService {

  todoList = []


  chatsCollection: AngularFirestoreCollection<any>;
  chats;
  message;
  removeMessage;

  chatSnap;

  constructor(private fireSotreService: AngularFirestore){


    this.chatsCollection = this.fireSotreService.collection("to-do", ref => ref.orderBy("createdTime"))
    this.chats = this.chatsCollection.valueChanges();
    this.chats = this.chatsCollection.snapshotChanges().pipe(
      map((actions:any) => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        // 把 data 解構，變成在 ID 裡面
        return { id, ...data };
      })))
      .subscribe({
        next: data => {console.log("印出來了，但我要睡了", data)}
      })
    console.log("CHAT", this.chats)
    
    

    try{
      this.todoList = JSON.parse(localStorage.getItem("todoList")).todoList;
    }catch(e) {
      this.todoList = [
        {
          id: -3,
          item: "吃飯",
          isCompleted: true,
        },
        {
          id: -2,
          item: "睡覺",
          isCompleted: true,
        },
        {
          id: -1,
          item: "打東東",
          isCompleted: false,
        }
      ];
    } 
  }

  title = "title from Service";

  id = 0;
  getID(){
    this.id += 1;
    return this.id - 1;
  }

  
  
  itemLeft = this.todoList.length;

  addTodoList(event) {
    console.log(event);
    console.log(event.srcElement.value);
    if(event.target.value != ""){
      this.todoList.unshift({
        id: this.getID(),
        item: event.target.value,
        isCompleted: false
      })
      this.id += 1;
    }
    this.refreashTodo()

    event.target.value = "";
    console.log(this.todoList.length);
    this.itemLeft = this.todoList.length
  }

  removeTodo(todo){
    //console.log(idx);
    //console.log(event.target.parentNode.parentNode);
    //this.todoList.splice(idx, 1)
    //event.target.parentNode.parentNode.remove();
    this.todoList = this.todoList.filter(x => x.id != todo.id)
    this.refreashTodo()
  }

  refreashTodo(){
    this.todoList = this.todoList.filter(x => true);
  }

  toggle(todo: ToDo){
    todo.isCompleted = !todo.isCompleted;
    this.refreashTodo()
  }

  DoCheck() {
    let out = Object()
    out.todoList = this.todoList
    localStorage.setItem("todoList", JSON.stringify(out))
    this.itemLeft = this.todoList.filter(x => !x.isCompleted).length;
  }

  clearCompleted(){

    //我的寫法，有點多餘
    /*for(var i in this.todoList){
      if(this.todoList[i].isCompleted){
        delete this.todoList[i];
      }
    }
    this.todoList = this.todoList.filter(Boolean);
    this.updateLeft();*/


    //寫法一，用 splice 從後面做回來
    for(let i = this.todoList.length - 1; i >= 0; i--){
      if(this.todoList[i].isCompleted){
        this.todoList.splice(i, 1)
      }
    }

    // 寫法二，建立新的陣列
    //this.todoList = this.todoList.filter(x => !x.isCompleted)
    this.refreashTodo()
  }
  allComplete(){
    console.log("AA")

    // 兩種寫法

    for(let i in this.todoList){
      this.todoList[i].isCompleted = true;
    }

    // 重新創造一種新的物件出來，新的 Js 語法
    this.todoList = this.todoList.map( x => ({... x, isCompleted: true}));
  }
}
