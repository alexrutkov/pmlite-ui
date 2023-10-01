import {Profile} from "@modules/account/model/Profile";

export interface AccountState {
  profile: Profile
}

export const initialAccountState: AccountState = {
  profile: {
    name: '', username: '', about: '', tags: []
  }
}
