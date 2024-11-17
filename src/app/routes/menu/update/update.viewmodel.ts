import { FormControl } from '@angular/forms';

export class UpdateViewModel {
  public Id = 0;
  public Active = '';
  public Title = '';
  public Description = '';
  public BadgeDescription = '';
  public BadgeColor = '';
}

export interface IForm {
  Id: FormControl<number | null>;
  Active: FormControl<boolean | null>;
  Title: FormControl<string | null>;
  Description: FormControl<string | null>;
  BadgeDescription: FormControl<string | null>;
  BadgeColor: FormControl<string | null>;
}
