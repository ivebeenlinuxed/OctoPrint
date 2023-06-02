import { loadManifest } from '@angular-architects/module-federation';
 
 loadManifest("/api/angular_entrypoints")
   .catch(err => console.error(err))
   .then(_ => import('./bootstrap'))
   .catch(err => console.error(err));


//import('./bootstrap')
//	.catch(err => console.error(err));

