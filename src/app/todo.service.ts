import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  private todoItems: { id: number; title: string; description: string; completed: boolean }[] = [];
  private nextId = 1;

  constructor() { }

  addTodo(title: string, description: string) {
    const newTask = { id: this.nextId++, title, description, completed: false };
    localStorage.setItem('todoItems', JSON.stringify([...this.todoItems, newTask]));
  }

  deleteTodo(id: number) {
    this.todoItems = this.todoItems.filter(item => item.id !== id);
    localStorage.setItem('todoItems', JSON.stringify([...this.todoItems]));
  }

  getFilteredTodos(filter: string) {
    if (filter === 'all') {
      return this.todoItems;
    }
    return this.todoItems.filter(item =>
      filter === 'completed' ? item.completed : !item.completed
    );
  }

  completeTodo(id: number, completed: boolean) {
    const todo = this.todoItems.find(item => item.id === id);
    if (todo) {
      todo.completed = completed;
      localStorage.setItem('todoItems', JSON.stringify([...this.todoItems]));
    }
  }

  getTodos() {
    const storedItems = localStorage.getItem('todoItems');
    if (storedItems) {
      this.todoItems = JSON.parse(storedItems);
      this.nextId = this.todoItems[this.todoItems.length - 1].id + 1;
    }
    return [...this.todoItems];
  }
}
