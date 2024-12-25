import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../core/models/task'

@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {

  transform(tasks: Task[], search: string): Task[] {
    if (!search) { return tasks; }
    return tasks.filter((t: Task) => {
      return t.name.toLowerCase().includes(search.toLowerCase());
    });
  }

}
