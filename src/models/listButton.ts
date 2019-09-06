export class ListButton {
  private inputType: string;
  private htmlText: string;
  private methodName: string;

  constructor(inputType, htmlText, methodName) {
    this.inputType = inputType;
    this.htmlText = htmlText;
    this.methodName = methodName;
  }

  public getInputType(): string {
    return this.inputType;
  }

  public getHtmlText(): string {
    return this.htmlText;
  }

  public setHtmlText(text: string): void {
    this.htmlText = text;
  }

  public getMethodName(): string {
    return this.methodName;
  }
}
