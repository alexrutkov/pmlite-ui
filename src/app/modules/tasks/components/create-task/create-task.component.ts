import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MessageToastService} from "@services/message.service";
import {ErrorService} from "@services/error.service";
import {urlData} from "@core/symbols";
import {concatMap, filter} from "rxjs";
import {TaskSummary} from "@modules/tasks/model/TaskSummary";


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  taskId: number | undefined;
  taskForm: FormGroup = this._fb.group({
    parentId: [null],
    name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
    shortDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
    tags: [[]]
  });

  private apiUrl = '';

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageToastService,
    private route: ActivatedRoute,
    private router: Router,
    public errorService: ErrorService
  ) {
    this.route.data.subscribe(d => this.apiUrl = d[urlData]);
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => this.taskForm.patchValue({parentId: params['parentId']}))

    this.route.params.pipe(
      filter(params => params['id']),
      concatMap(params => this.http.get<TaskSummary>(`/api/tasks/${params['id']}`))
    )
      .subscribe(task => {
        this.taskId = task.id;
        this.taskForm.patchValue(task);
      });
  }

  saveTask() {
    const method = this.isEditMode() ? 'put' : 'post';
    const url = this.isEditMode() ? this.apiUrl.concat(`/${this.taskId}`) : this.apiUrl;
    this.http.request(method, url, {body: this.taskForm.getRawValue()})
      .subscribe(() => {
        const message = this.isEditMode() ? 'Задача сохранена' : 'Задача создана';
        this.messageService.success(message);
        this.router.navigate(['/tasks']).finally();
      })
  }

  private isEditMode() {
    return !!this.taskId;
  }

  removeTaskTag(tagId: number) {
    if (this.taskId) {
      this.http.delete(`/api/tasks/${this.taskId}/tags/${tagId}`)
        .subscribe()
    }
  }
}
