import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {AuthResponseDto} from '../../models/auth-response-dto';
import {UserForAuthenticationDto} from '../../models/authentication-user';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private returnUrl: string;

    loginForm: FormGroup;
    errorMessage = '';
    showError: boolean;
    constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        })
        this.returnUrl = '/';
    }
    validateControl = (controlName: string) => {
        return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched
    }
    hasError = (controlName: string, errorName: string) => {
        return this.loginForm.get(controlName).hasError(errorName)
    }

    loginUser = (loginFormValue) => {
        this.showError = false;
        const login = {... loginFormValue };
        const userForAuth: UserForAuthenticationDto = {
            email: login.username,
            password: login.password
        }
        this.authService.loginUser('api/accounts/Login', userForAuth)
            .subscribe({
                next: (res: AuthResponseDto) => {
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('userId', res.userId);
                    this.router.navigate([this.returnUrl]);
                },
                error: (err: HttpErrorResponse) => {
                    this.errorMessage = err.message;
                    this.showError = true;
                }})
    }
}
