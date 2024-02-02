import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MessageToastService} from "@services/message.service";
import {ErrorService} from "@services/error.service";
import {urlData} from "@core/symbols";


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {

  taskForm: FormGroup = this._fb.group({
    id: [null],
    name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
    shortDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
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

  saveTask() {
    this.http.post(this.apiUrl, this.taskForm.getRawValue())
      .subscribe(() => {
        this.messageService.success('Задача создана');
        this.router.navigate(['/tasks']).finally();
      })
  }
}
