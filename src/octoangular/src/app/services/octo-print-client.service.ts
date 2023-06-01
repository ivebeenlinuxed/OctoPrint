import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class OctoPrintClientService {
    constructor(private client: HttpClient) {}

    options = {
        baseurl: new URL(
            "http://" + window.location.hostname + ":" + window.location.port
        ),
        locale: "en",
        apikey: null
    };

    getCookieSuffix() {
        var url = this.options.baseurl;

        var port = url.port || (url.protocol === "https:" ? 443 : 80);
        if (url.pathname && url.pathname !== "/") {
            var path = url.pathname;
            if (path.endsWith("/")) {
                path = path.substring(0, path.length - 1);
            }
            return "_P" + port + "_R" + path.replace(/\//g, "|");
        } else {
            return "_P" + port;
        }
    }

    getCookieName(name: string) {
        return name + this.getCookieSuffix();
    }

    getCookie(name: string) {
        name = this.getCookieName(name);

        return ("; " + document.cookie)
            .split("; " + name + "=")
            .pop()
            ?.split(";")[0];
    }

    getRequestHeaders(method: string, headers: {[key: string]: string}) {
        method = method || "GET";

        if (this.options.apikey) {
            headers["X-Api-Key"] = this.options.apikey;
        } else {
            // no API key, so browser context, so let's make sure the CSRF token
            // header is set
            var csrfToken = this.getCookie("csrf_token");
            if (!/^(GET|HEAD|OPTIONS)$/.test(method) && csrfToken) {
                headers["X-CSRF-Token"] = csrfToken;
            }
        }

        if (this.options.locale !== undefined) {
            headers["X-Locale"] = this.options.locale;
        }

        return headers;
    }

    get<T>(url: string, headers: {[key: string]: string} = {}) {
        return this.client.get<T>(url, {
            headers: this.getRequestHeaders("GET", headers),
            withCredentials: true
        });
    }

    post<T>(url: string, data: any, headers: {[key: string]: string} = {}) {
        return this.client.post<T>(url, data, {
            headers: this.getRequestHeaders("POST", headers),
            withCredentials: true
        });
    }
}
