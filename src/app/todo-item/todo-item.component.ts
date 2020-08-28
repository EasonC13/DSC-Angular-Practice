import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HandleTodoService } from "./todo-service.service"

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input("item") todo;
  @Input() idx;
  constructor(public service: HandleTodoService) { 
    console.log(this.service.title);
   }
  ngOnInit(): void {
  }

  @Output() remove = new EventEmitter()

  @Output() update = new EventEmitter()

  remTodo(todo){
    // 把想要丟出去的東西放進來
    // 外面會收到 idx
    this.service.removeTodo(todo);
  }

  toggleTodo(){
    this.todo.isCompleted = !this.todo.isCompleted;
  }
}
