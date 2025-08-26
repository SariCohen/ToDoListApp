import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDoListComponentComponent } from "./to-do-list-component/to-do-list-component.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToDoListComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-task';
}
