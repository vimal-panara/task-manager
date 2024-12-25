import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor() { }

  clearAppData() {
    let result = confirm("Heads Up! Do you want to delete all the data of all the users registered on this machine");
    if (result) {
      localStorage.clear();
    }
  }
}
