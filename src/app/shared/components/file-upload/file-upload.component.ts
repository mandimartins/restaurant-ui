import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent implements AfterViewInit, OnInit, OnChanges {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  @Input() FileExtensions: string[] = new Array<string>();
  fileExtensions = '.png, .jpg, .jpeg';

  @Output() ImageBase64Src = new EventEmitter<string>();
  public src64String = '';

  ngOnInit(): void {
    this.getAcceptData();
  }

  ngAfterViewInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  onSelectFileClick() {
    this.fileInput.nativeElement.click();
  }

  onSelectFileChange(e: Event) {
    const fileInput = e.target as HTMLInputElement;

    if (fileInput?.files?.length) {
      const file = fileInput.files.item(0);

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.src64String = reader.result as string;
          this.ImageBase64Src.emit(this.src64String);
        };
      }
    }
  }

  removeSelectioin() {
    this.fileInput.nativeElement.value = '';
    this.src64String = '';
  }

  private getAcceptData() {
    if (this.FileExtensions.length > 0) {
      this.fileExtensions = '';
      const lastIndex = this.FileExtensions.length - 1;

      this.FileExtensions.forEach((extension: string, currentIndex: number) => {
        if (lastIndex == currentIndex) {
          this.fileExtensions += `.${extension}`;
          return;
        }

        this.fileExtensions += `.${extension},`;
      });
    }
  }
}
