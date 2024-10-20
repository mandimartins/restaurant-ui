export class ErrorMessage {
  public readonly Title: string;
  public readonly Content: string;

  constructor(
    private _title: string,
    private _content: any,
  ) {
    this.Title = _title;
    this.Content = _content;
  }
}
