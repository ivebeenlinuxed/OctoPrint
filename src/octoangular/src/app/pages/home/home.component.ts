import {AfterViewInit, Component, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef} from "@angular/core";
import { PluginManagerService, PluginTab } from "src/app/services/plugin-manager.service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements AfterViewInit {
    public tabs? : PluginTab[];
    
    @ViewChild('tabContainer', { read: ViewContainerRef }) entry!: ViewContainerRef;

    constructor(private pluginManager : PluginManagerService) {
    }
    ngAfterViewInit(): void {
        this.constructTab();
    }

    constructTab() {
        this.pluginManager.getTabs$().subscribe((tabs) => {
            tabs.forEach((tab : PluginTab) => {
                this.entry.createComponent(tab.component);
            });
        });
    }
}
