import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { IUserLogin } from '../../models/user.model';
import { IToken } from '../../models/token.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    API_URL = environment.API_URL;
    private currentToken = new BehaviorSubject<IToken>(null);
    public currentToken$ = this.currentToken.asObservable();

    constructor(private http: HttpClient) {
        this.currentToken.next(
            JSON.parse(localStorage.getItem('Token'))
        );
    }

    setCurrentToken(token: IToken) {
        this.currentToken.next(token);
    }

    public get currentTokenValue(): IToken {
        return this.currentToken.value;
    }

    login(user: IUserLogin) {
        return this.http.post<IToken>(`${this.API_URL}login/login`, user).pipe(
            map((token: IToken) => {
                localStorage.setItem('Token', JSON.stringify(token));
                this.setCurrentToken(token);
                return token;
            })
        );
    }

    logout() {
        localStorage.removeItem('Token');
        this.currentToken.next(null);
    }
}
