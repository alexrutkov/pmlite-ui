import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TasksStore} from "@stores/tasks.store";
import {Router} from "@angular/router";
import * as uuid from 'uuid';

@Component({
  selector: 'app-create.task',
  templateUrl: './create.task.component.html',
  styleUrls: ['./create.task.component.scss']
})
export class CreateTaskComponent {

  taskForm: FormGroup = this._fb.group({
    id: [uuid.v4()],
    name: ['', Validators.required],
    isPublic: [false],
    description: [''],
    startDate: this._fb.control<Date | null>(null),
    finishDate: this._fb.control<Date | null>(null),
  })

  constructor(
    private _fb: FormBuilder,
    private taskStore: TasksStore,
    private router: Router
  ) {
  }

  saveTask() {
    this.taskStore.saveTask(this.taskForm.getRawValue());
    this.router.navigate(['/tasks']);
  }
}
