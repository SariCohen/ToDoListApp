import { AddToDoComponentComponent } from "../add-to-do-component/add-to-do-component.component";
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoService } from "../todo.service";
import { ToDoItemComponentComponent } from "../to-do-item-component/to-do-item-component.component";

@Component({
  selector: 'app-to-do-list-component',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule],
  templateUrl: './to-do-list-component.component.html',
  styleUrls: ['./to-do-list-component.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ToDoListComponentComponent {
  todoItems: { id: number; title: string; description: string; completed: boolean }[] = [];
  displayedColumns: string[] = ['title', 'description', 'completed', 'actions'];
  filterStatus: string = 'all';

  constructor(private todoService: TodoService, private dialog: MatDialog, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.refreshTodos();
  }

  openCompleteTaskDialog(task: { id: number; title: string; description: string; completed: boolean }) {
    const dialogRef = this.dialog.open(ToDoItemComponentComponent, {
      data: { task }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result.id && result.completed !== undefined) {
        this.todoService.completeTodo(result.id, result.completed);
        this.refreshTodos();
      }
      else if (result.id) {
        this.deleteToDoItem(result.id);
        this.refreshTodos();
      }
    });
  }

  openAddToDoItemForm() {
    const dialogRef = this.dialog.open(AddToDoComponentComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.addTodo(result.title, result.description);
        this.refreshTodos();
      }
    });
  }

  deleteToDoItem(id: number) {
    this.todoService.deleteTodo(id);
    this.refreshTodos();
  }

  getFilteredTodoItems() {
    if (this.filterStatus === 'all') {
      return this.todoItems;
    }
    return this.todoService.getFilteredTodos(this.filterStatus);
  }

  refreshTodos() {
    this.todoItems = this.todoService.getTodos();
    this.cdRef.detectChanges();
  }
}