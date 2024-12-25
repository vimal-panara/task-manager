import { Component, NgModule, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from '../../core/models/task';
import { TaskService } from '../../core/services/task.service';
import { TaskFilterPipe } from '../../shared/task-filter.pipe';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-task-list',
  imports: [
    FormsModule,
    TaskFilterPipe
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  search = signal('')
  tasks: Task[] = []
  loggedInUser?: string

  constructor(
    private router: Router,
    private taskService: TaskService,
    private authService: AuthService
  ) {
    this.tasks = this.taskService.getTasks();
    this.loggedInUser = this.authService.getLoggedInUser();
  }

  onAddTask() {
    this.router.navigate(['/tasks/add']);
  }

  onEditTask(task: Task) {
    this.router.navigate([`/tasks/edit/${task.id}`])
  }

  onDeleteTask(id: number) {
    this.tasks = this.taskService.deleteTask(id);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  onTaskComplete(id: number) {
    let result = confirm("Are you sure to mark task as completed?");
    if(result){
      this.taskService.completeTask(id);
      this.tasks = this.taskService.getTasks();
    }
  }
}