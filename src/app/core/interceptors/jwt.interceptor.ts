import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentToken = this.authService.currentTokenValue;
        if (currentToken && currentToken.userToken !== null) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentToken.userToken}`,
                },
            });
        }
        return next.handle(request);
    }
}
