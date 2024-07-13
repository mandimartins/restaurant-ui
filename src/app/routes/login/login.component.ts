import { Component, signal, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { first, merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ErrorBarComponent } from '../../shared/components/error-bar/error-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router) {

      this.form = this.formBuilder.group({
        Email: ['', [Validators.required, Validators.email]],
        Password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]]
      })

      merge(this.form.controls.Email.statusChanges,
        this.form.controls.Email.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateEmailErrorMessage());

      merge(this.form.controls.Password.statusChanges,
        this.form.controls.Password.valueChages)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updatePasswordErrorMessage());
  }

  public form: any;
  emailErrorMessage = signal('');
  passwordErrorMessage = signal('');

  @ViewChild('errorBar') errorBar!: ErrorBarComponent;

  ngOnInit(): void {

  }

  public redirectUserToAdminRoute(){

    //in the future it should validate if
    //the user is admin or client, and redirect to its own panel
    this.route.navigate(['/admin'])
  }

  public onSignIn() {

    const user = this.form.getRawValue();

    this.authService
      .auth({ 
        UserName: user.Email, 
        Email: user.Email, 
        Password: user.Password 
      })
      .pipe(first())
      .subscribe({
        next: data => this.redirectUserToAdminRoute(),
        error: error => this.errorBar.handleError(error)
      })
  }

  public updateEmailErrorMessage(){

    if (this.form.controls.Email.hasError('required')) {
      this.emailErrorMessage.set('[Email] is required.');
    } else if (this.form.controls.Email.hasError('email')) {
      this.emailErrorMessage.set('[Email] is invalid');
    } else {
      this.emailErrorMessage.set('');
    }
  }

  public updatePasswordErrorMessage(){
    if(this.form.controls.Password.hasError('required')){
      this.passwordErrorMessage.set('[Password] is required')
    }else if(this.form.controls.Password.hasError('maxlength')){
      this.passwordErrorMessage.set('[Password] cannot have more than 12 characters')
    }else if(this.form.controls.Password.hasError('minlength')){
      this.passwordErrorMessage.set('[Password] must have at least 8 character')
    }else {
      this.passwordErrorMessage.set('');
    }
  }
}
