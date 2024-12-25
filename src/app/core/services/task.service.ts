import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { JsonpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { UserTask } from '../models/userTask';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private authService: AuthService
  ) { }

  getUsername(): string {
    return this.authService.getLoggedInUser() || ''
  }

  getAllUserTasks(): UserTask[] {
    let usersTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    return usersTasks
  }

  saveTasksLS(tasks: Task[]) {
    let usersTasks = this.getAllUserTasks()
    let temp = usersTasks.filter(x => x.username === this.getUsername())
    let userTasks = temp[0]
    if (temp.length > 0) {
      userTasks.tasks = tasks;
    } else {
      usersTasks.push({
        username: this.getUsername(),
        tasks: tasks
      });
    }
    localStorage.setItem('tasks', JSON.stringify(usersTasks));
  }

  getTasks(): Task[] {
    let userTasks = JSON.parse(localStorage.getItem('tasks') || '[]').filter((x: any) => x.username === this.getUsername());
    if (userTasks.length > 0) {
      let userTask = userTasks.filter((x: any) => x.username === this.getUsername());
      if (userTask.length > 0) {
        let tasks: Task[] = userTask[0].tasks;
        return tasks.sort((t1: Task, t2: Task) => {
          let dd1 = new Date(t1.dueDate);
          let dd2 = new Date(t2.dueDate);
          return dd1.getTime() - dd2.getTime();
        });
      }
      return [];
    }
    else {
      return []
    }
  }

  saveTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasksLS(tasks);
  }

  updateTask(updatedTask: Task): void {
    const tasks = this.getTasks().map((t: Task) => {
      return (t.id === updatedTask.id ? updatedTask : t);
    });
    this.saveTasksLS(tasks);
  }

  deleteTask(id: number): Task[] {
    let tasks = this.getTasks().filter((t: Task) => {
      return t.id !== id
    });
    this.saveTasksLS(tasks);
    return tasks;
  }

  getTaskById(id: number): Task | undefined {
    const tasks = this.getTasks().filter((t: Task) => {
      return t.id === id;
    });
    if (tasks) {
      return tasks[0]
    }
    return undefined
  }

  completeTask(id: number) {
    let tasks = this.getTasks().map(x => {
      if (x.id === id) {
        x.completed = true;
        return x;
      }
      return x;
    })
    this.saveTasksLS(tasks);
  }

  clearLoggedInUserTasks() {
    let result = confirm("Do you want to clear all data for user: " + this.getUsername() + " ?");
    if (result) {
      this.saveTasksLS([]);
    }
  }

  clearTaskData() {
    let result = confirm("Do you want to clear all data for all users?");
    if (result) {
      let finalResult = confirm("Are you sure??");
      if(finalResult){
        alert("Just kidding you can not delete all users' tasks...\nBut you can delete your tasks.");
        this.clearLoggedInUserTasks();
      }
    }
  }
}
