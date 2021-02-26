import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import { AuthService } from 'app/core/services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private auhtService: AuthService, private router: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const token = this.auhtService.currentTokenValue;
        if (token && token.userToken !== null) {
            return true;
        }
        this.router.navigate(['/'], {
            queryParams: { returnUrl: state.url },
        });
        return false;
    }
}
