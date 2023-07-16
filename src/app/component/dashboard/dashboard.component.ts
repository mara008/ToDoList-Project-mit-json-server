import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {

  taskObj: Task = new Task();
  allTasks: Task[] = [];
  addTaskValue: string = '';

  editTaskValue: string = '';

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
   this.taskObj = new Task();
   this.allTasks = [];
   this.getAllTask();
 
  }

  // OKAY
  getAllTask() {
    this.crudService.getAllTask().subscribe( res => {
      this.allTasks = res;
      console.log('tasks:', res);
      

    }, (err) => {
      console.log('Couldnt get the Task List: ');
    }
    );
  }

   // OKAY
  addTask(): void {
   this.taskObj.task_name = this.addTaskValue;
   this.crudService.addTask(this.taskObj).subscribe(
     (res) => {
       this.ngOnInit();
       this.addTaskValue = '';
     },
    (err) => {
  console.log('adding Failed');
  
     }
   );
 }

  
  editTask(): void {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        console.log('Failed to edit');
      }
    );
  }

 // OKAY
  deleteTask(task: Task): void {
    this.crudService.deleteTask(task).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('Delete to edit');
      }
    );
  }

  call(task: Task){
    this.taskObj = task;
    this.editTaskValue = task.task_name;

  }

}
