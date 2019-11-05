export class ActiveUser {
  private static instance: ActiveUser;

  private constructor(
    public usertype?: string,
    private _token?: string,
    private _tokenExpiration?: number
  ) {}

  get token() {
    if (!this._tokenExpiration || new Date().getTime() > this._tokenExpiration)
      return null;
    return this._token;
  }
  set token(token: string) {
    this._token = token;
  }

  get tokenExpiration() {
    return this._tokenExpiration;
  }
  set tokenExpiration(exp: number) {
    this._tokenExpiration = exp;
  }
  static getInstance() {
    if (!ActiveUser.instance) {
      ActiveUser.instance = new ActiveUser();
    }
    return ActiveUser.instance;
  }
}
