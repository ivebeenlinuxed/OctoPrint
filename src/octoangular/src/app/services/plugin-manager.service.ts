import { loadRemoteModule } from '@angular-architects/module-federation';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable, concatAll, filter, forkJoin, map } from 'rxjs';

export interface PluginTab {
  name: string;
  import: string;
  component: Type<Component>;
}

@Injectable({
  providedIn: 'root'
})
export class PluginManagerService {
  constructor(private client : HttpClient) { }

  TabComponents : PluginTab[] = [];

  private isLoaded : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  Register() {
    this.client.get<Object>("/api/angular_entrypoints").subscribe((data) => {
      Object.keys(data).forEach((plugin_name : string) => {
          const entrypoint : string = (<any>data)[plugin_name]!;
          
          let moduleLoads = [];

          moduleLoads.push(loadRemoteModule({
            type: 'module',
            remoteEntry: entrypoint,
            exposedModule: './Module'
          }).then((module) => {
              let allTabPromises = [];
              if (module.AppModule.TabComponents != null) {
                  let tabPromise;
                   module.AppModule.TabComponents.forEach((component: PluginTab) => {
                      tabPromise = loadRemoteModule({
                          type: 'module',
                          remoteEntry: entrypoint,
                          exposedModule: component.import
                      }).then(m => {
                          component.component = m[Object.keys(m)[0]];
                          this.TabComponents.push(component);
                      })
                  });
                  allTabPromises.push(tabPromise);
              }
              return Promise.all(allTabPromises);
          }))

          Promise.all(moduleLoads).then(() => {
            this.isLoaded.next(true);
          });

      });
    });
  }

  getTabs$() : Observable<PluginTab[]> {
    return this.isLoaded.pipe(filter((loaded) => loaded), map(() => this.TabComponents));
  }
}
