import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Profile} from "@modules/account/model/Profile";
import {MessageToastService} from "@services/message.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  profileForm: FormGroup = this._fb.group({
    name: [''],
    description: [''],
    tags: [[]]
  })

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageToastService
  ) {
  }

  ngOnInit(): void {
        this.http.get<Profile>('/api/account/profile')
          .subscribe(p => this.profileForm.patchValue(p))
    }

  onImageChanged(target: EventTarget | null) {
    if (target instanceof HTMLInputElement) {
      const file = target.files && target.files.length > 0 ? target.files[0] : null;
      if (!!file) {

      }

    }
  }

  getBackgroundImage() {
    let imageUrl = 'https://via.placeholder.com/120x120';

    return `url(${imageUrl})`;
  }

  saveProfile() {
    this.http.post('/api/account/profile', this.profileForm.getRawValue())
      .subscribe(() => this.messageService.success('Профиль сохранён!'))
  }

  removeUserTag(tagId: number) {
    this.http.delete(`/api/account/profile/tags/${tagId}`).subscribe()
  }






}
