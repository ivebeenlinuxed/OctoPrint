import {HttpClient} from "@angular/common/http";
import {Component} from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    title = "octoangular";

    constructor(client: HttpClient) {
        client.get("api/heartbeat").subscribe();
    }
}
