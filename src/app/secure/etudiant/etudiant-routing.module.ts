import { RouterModule, Routes } from '@angular/router';

import { EtudiantComponent } from './etudiant.component';
import { NotesComponent } from './notes/notes.component';
import { PresenceComponent } from './presence/presence.component';

const routes: Routes = [
  {
    path: '',
    component: EtudiantComponent,
    children: [
      {
        path: '',
        redirectTo: 'notes',
        pathMatch: 'full',
      },
      {
        path: 'notes',
        component: NotesComponent,
      },
      {
        path: 'presence',
        component: PresenceComponent,
      },
      {
        path: '**',
        redirectTo: '/404',
        pathMatch: 'full',
      },
    ],
  },
];

export const EtudiantRoutingRoutes = RouterModule.forChild(routes);
