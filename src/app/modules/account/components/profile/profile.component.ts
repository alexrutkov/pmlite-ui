import {Component} from '@angular/core';
import {AccountStore} from "@stores/account.store";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  profileForm: FormGroup = this._fb.group({
    name: [''],
    username: [''],
    tags: [[]],
    about: ['']
  })

  constructor(
    private accountStore: AccountStore,
    private _fb: FormBuilder
  ) {
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

  }






}
