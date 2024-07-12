import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';

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
  }

  public form: any;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(8)]]
    })
  }

  public redirectUserToAdminRoute(){
    this.route.navigate(['/admin'])
  }

  public onSignIn() {

    const user = this.form.getRawValue();

    this.authService
      .auth({ 
        UserName: user.email, 
        Email: user.email, 
        Password: user.password 
      })
      .pipe(take(1))
      .subscribe(data => this.redirectUserToAdminRoute())
  }
}
