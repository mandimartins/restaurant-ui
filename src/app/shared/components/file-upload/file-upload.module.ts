import { NgModule } from "@angular/core";
import { FileUploadComponent } from "./file-upload.component";
import { CommonModule } from "@angular/common";
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatButton } from "@angular/material/button";

@NgModule({
    declarations: [
        FileUploadComponent
    ],
    exports:[FileUploadComponent],
    imports: [
        CommonModule,
        MatCard,
        MatCardHeader,
        MatCardContent,
        MatCardFooter,
        MatCardActions,
        MatButton,
        MatCardTitle
    ]
})
export class FileUploadModule { }
