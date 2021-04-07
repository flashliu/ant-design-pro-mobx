import UserStore from "./user"

const store = {
  user: UserStore.getInstance(),
}

export default store