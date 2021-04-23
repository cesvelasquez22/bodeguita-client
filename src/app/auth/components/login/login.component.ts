import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { IUserLogin } from 'app/core/models/user.model';
import { AuthService } from 'app/core/services/auth/auth.service';
import { IzitoastAlertService } from '../../../core/utils/izitoast-alert.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loading: boolean;
    loginForm: FormGroup;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private fuseConfigService: FuseConfigService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private izitoastAlertService: IzitoastAlertService
    ) {
        if (this.authService.currentTokenValue) {
            this.router.navigate(['/admin/home']);
          }
        // Configure the layout
        this.fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
                },
                toolbar: {
                    hidden: true,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };

        this.loginForm = this.formBuilder.group({
            user: [null, [Validators.required]],
            password: [null, [Validators.required]],
        });
    }

    ngOnInit(): void {
        // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
    }

    get user(): string {
        return this.loginForm.controls.user.value;
    }

    get password(): string {
        return this.loginForm.controls.password.value;
    }

    onSubmit() {
        this.loading = true;
        if (this.loginForm.valid) {
            const user: IUserLogin = {
                UserName: this.user,
                Contrasenia: this.password
            };
            this.authService.login(user).subscribe(
                (data) => {
                    this.router.navigate([this.returnUrl]);
                    this.loading = false;
                },
                (err) => {
                    this.izitoastAlertService.CustomErrorAlert(
                        'Correo y/o contraseña incorrectos'
                    );
                    this.loading = false;   
                }
            );
        }
    }
}
