import { Component, NgModule, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

interface PluginTab {
  name: string;
  import: string;
  component: Type<any>;
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule {
  public static TabComponents : PluginTab[] = [{name: "GCode Viewer", import: "./GCodeTab", component: AppComponent}]
}
