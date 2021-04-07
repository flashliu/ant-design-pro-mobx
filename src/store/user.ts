import { action, observable } from "mobx";
import { useLocalStore } from "mobx-react-lite";

export default class UserStore {
  private static instance: UserStore;
  public static getInstance() {
    if (!UserStore.instance) {
      UserStore.instance = new UserStore();
    }

    return UserStore.instance;
  }

  @observable token: string = 'init token'
  @observable detail = {}

  @action
  changeToken(value: string) {
    this.token = value
  }
}

export const useUserStore = () => {
  return useLocalStore(() => UserStore.getInstance())
}