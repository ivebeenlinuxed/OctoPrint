import {Component} from "@angular/core";
import {LoginService} from "src/app/services/login.service";

@Component({
    selector: "app-general-layout",
    templateUrl: "./general-layout.component.html",
    styleUrls: ["./general-layout.component.scss"]
})
export class GeneralLayoutComponent {
    constructor(private loginService: LoginService) {}

    logout() {
        this.loginService.logout().subscribe(() => {
            window.location.reload();
        });
    }
}
