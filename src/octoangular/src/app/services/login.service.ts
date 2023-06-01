import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, catchError, map, of, shareReplay, tap} from "rxjs";
import {OctoPrintClientService} from "./octo-print-client.service";

interface CurrentUserResponse {
    name: string;
    groups: string[];
    permissions: string[];
}

export interface LoginRequest {
    user: string;
    pass: string;
    remember: boolean;
}

@Injectable({
    providedIn: "root"
})
export class LoginService {
    public isLoggedIn$!: Observable<boolean>;

    constructor(private client: OctoPrintClientService) {
        this.Refresh();
    }

    Refresh() {
        this.isLoggedIn$ = this.client.get<CurrentUserResponse>("api/currentuser").pipe(
            map((v) => v.name !== null),
            shareReplay()
        );
    }

    login(loginRequest: LoginRequest) {
        return this.client.post("/api/login", loginRequest).pipe(
            tap(() => {
                this.Refresh();
            })
        );
    }

    logout() {
        return this.client.post("api/logout", {}).pipe(
            tap(() => {
                this.Refresh();
            })
        );
    }
}
