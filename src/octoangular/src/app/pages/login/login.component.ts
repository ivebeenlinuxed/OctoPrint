import {HttpClient} from "@angular/common/http";
import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {catchError, concatMap, of} from "rxjs";
import {LoginRequest, LoginService} from "src/app/services/login.service";
import {OctoPrintClientService} from "src/app/services/octo-print-client.service";

interface FirstRunResponse {
    FirstRun: boolean;
}

interface RegistrationRequest {
    user: string;
    pass1: string;
    pass2: string;
}

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
    public isRegistration = false;

    public regRequest: RegistrationRequest = {
        user: "",
        pass1: "",
        pass2: ""
    };

    public loginRequest: LoginRequest = {
        user: "",
        pass: "",
        remember: false
    };

    constructor(
        private octoclient: OctoPrintClientService,
        private loginService: LoginService,
        private router: Router
    ) {
        octoclient.get<FirstRunResponse>("api/first_run").subscribe((resp) => {
            if (resp.FirstRun) {
                this.isRegistration = true;
            } else {
                this.loginService.isLoggedIn$.subscribe((li) => {
                    if (li) {
                        this.router.navigateByUrl("/");
                    }
                });
            }
        });
    }

    login() {
        this.loginService.login(this.loginRequest).subscribe(() => {
            this.router.navigateByUrl("/");
        });
    }

    register() {
        this.octoclient
            .post("plugin/corewizard/acl", this.regRequest)
            .pipe(
                catchError(() => of(0)),
                concatMap((m) =>
                    this.octoclient.post("/api/setup/wizard", {handled: true})
                )
            )
            .subscribe((r) => {
                this.isRegistration = false;
            });
    }
}
