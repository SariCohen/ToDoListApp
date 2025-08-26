import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-to-do-item-component',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule],
  templateUrl: './to-do-item-component.component.html',
  styleUrl: './to-do-item-component.component.css',
})
export class ToDoItemComponentComponent {
  task: { id: number; title: string; description: string; completed: boolean };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: { id: number; title: string; description: string; completed: boolean } },
    private dialogRef: MatDialogRef<ToDoItemComponentComponent>) {
    this.task = { ...data.task };
  }

  updateCompletionStatus() {
    this.dialogRef.close({ id: this.task.id, completed: this.task.completed });
  }
  deleteTask() {
    this.dialogRef.close({ id: this.task.id});
  }
}
