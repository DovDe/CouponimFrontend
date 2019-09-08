import { UserTypes } from "./usertypeEnum";

export class Login {
  constructor(
    public email: string,
    public password: string,
    public usertype: string
  ) {}
}
