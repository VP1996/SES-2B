import { create } from 'mobx-persist'

// import DataStore from "./data/DataStore";
import studentAuthStore from './data/auth-student'
import teacherAuthStore from './data/auth-teacher'
import UiStore from "./ui/UiStore";

const hydrate = create({
  storage: localStorage
})

export default class RootStore {
  studentAuth = new studentAuthStore();
  teacherAuth = new teacherAuthStore();
  uiStore = new UiStore();

  constructor() {
    hydrate('studentData', this.studentAuth);
    hydrate('teacherData', this.teacherAuth);
  }
}