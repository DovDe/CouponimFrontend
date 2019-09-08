export class ActiveUser {
  constructor(
    public name: string,
    public usertype: string,
    public id: string,
    public email: string,
    private _password: string,
    private _token: string,
    private _tokenExpiration: number
  ) {}

  get token() {
    if (!this._tokenExpiration || new Date().getTime() > this._tokenExpiration)
      return null;
    return this._token;
  }

  get password() {
    return this._password;
  }
}
