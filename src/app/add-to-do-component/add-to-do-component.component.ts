import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-to-do-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent],
  templateUrl: './add-to-do-component.component.html',
  styleUrls: ['./add-to-do-component.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AddToDoComponentComponent {
  title: string = '';
  description: string = '';

  @Output() newTaskAdded: EventEmitter<{ title: string; description: string }> = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<AddToDoComponentComponent>) {}
  
  addTask() {
    if (this.title && this.title.length >= 3) {
      this.dialogRef.close({ title: this.title, description: this.description });
    }
  }
}