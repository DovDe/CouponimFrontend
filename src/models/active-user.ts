export class ActiveUser {
  private static instance: ActiveUser;

  private constructor(
    public name?: string,
    public usertype?: string,
    public id?: string,
    public email?: string,
    public password?: string,
    private _token?: string,
    private _tokenExpiration?: number
  ) {}

  get token() {
    if (!this._tokenExpiration || new Date().getTime() > this._tokenExpiration)
      return null;
    return this._token;
  }
  set token(token: string) {
    this._tokenExpiration = new Date().getTime() + 1000 * 60 * 30;
    this._token = token;
  }
  static getInstance() {
    if (!ActiveUser.instance) {
      ActiveUser.instance = new ActiveUser();
    }
    return ActiveUser.instance;
  }
}
