import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./pages/login/login.component";
import {LoginGuard} from "./guards/login.guard";
import {HomeComponent} from "./pages/home/home.component";
import {GeneralLayoutComponent} from "./layouts/general-layout/general-layout.component";

const routes: Routes = [
    {path: "login", component: LoginComponent},
    {
        path: "",
        canActivate: [LoginGuard],
        component: GeneralLayoutComponent,
        children: [{path: "", component: HomeComponent}]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
