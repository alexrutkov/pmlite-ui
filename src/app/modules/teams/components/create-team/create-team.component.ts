import {Component, OnInit} from '@angular/core';
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SelectTagsComponent} from "@modules/tags/components/select-tags/select-tags.component";
import {HttpClient} from "@angular/common/http";
import {MessageToastService} from "@services/message.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorService} from "@services/error.service";
import {concatMap, filter} from "rxjs";
import {TeamDetails} from "@modules/teams/model/TeamDetails";

@Component({
  selector: 'app-create-team',
  standalone: true,
    imports: [
        CdkTextareaAutosize,
        MatButton,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        MatToolbar,
        PaginatorModule,
        ReactiveFormsModule,
        SelectTagsComponent
    ],
  templateUrl: './create-team.component.html',
  styleUrl: './create-team.component.scss'
})
export class CreateTeamComponent implements OnInit {
	teamId: number | undefined;
	teamForm: FormGroup = this._fb.group({
		name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
		description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
		tags: [[]]
	});


	constructor(
		private _fb: FormBuilder,
		private http: HttpClient,
		private messageService: MessageToastService,
		private route: ActivatedRoute,
		private router: Router,
		public errorService: ErrorService
	) {
	}

	ngOnInit(): void {

		this.route.params.pipe(
			filter(params => params['id']),
			concatMap(params => this.http.get<TeamDetails>(`/api/teams/${params['id']}`))
		)
			.subscribe(team => {
				this.teamId = team.summary.id;
				this.teamForm.patchValue(team.summary);
				this.teamForm.patchValue(team);
			});
	}

	saveTeam() {
		const method = this.isEditMode() ? 'put' : 'post';
		const url = this.isEditMode() ? `/api/teams/${this.teamId}` : '/api/teams';
		this.http.request(method, url, {body: this.teamForm.getRawValue()})
			.subscribe(() => {
				const message = this.isEditMode() ? 'Команда сохранена' : 'Команда создана';
				this.messageService.success(message);
				this.router.navigate(['/teams']).finally();
			})
	}

	private isEditMode() {
		return !!this.teamId;
	}

	removeTaskTag(tagId: number) {
		if (this.teamId) {
			this.http.delete(`/api/teams/${this.teamId}/tags/${tagId}`)
				.subscribe()
		}
	}
}
