import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "./pages/login/login.component";
import {HomeComponent} from "./pages/home/home.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GeneralLayoutComponent} from "./layouts/general-layout/general-layout.component";

@NgModule({
    declarations: [AppComponent, LoginComponent, HomeComponent, GeneralLayoutComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
