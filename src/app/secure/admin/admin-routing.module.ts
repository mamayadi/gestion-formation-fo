import { RouterModule, Routes } from '@angular/router';

import { AddAdminComponent } from './admin-list/add-admin/add-admin.component';
import { AddEtudiantComponent } from './etudiant-list/add-etudiant/add-etudiant.component';
import { AddFormateurComponent } from './formateur-list/add-formateur/add-formateur.component';
import { AddGroupeComponent } from './groupe-list/add-groupe/add-groupe.component';
import { AdminComponent } from './admin.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { EditAdminComponent } from './admin-list/edit-admin/edit-admin.component';
import { EditEtudiantComponent } from './etudiant-list/edit-etudiant/edit-etudiant.component';
import { EditFormateurComponent } from './formateur-list/edit-formateur/edit-formateur.component';
import { EditGroupeComponent } from './groupe-list/edit-groupe/edit-groupe.component';
import { EtudiantListComponent } from './etudiant-list/etudiant-list.component';
import { FormateurListComponent } from './formateur-list/formateur-list.component';
import { GroupeListComponent } from './groupe-list/groupe-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'admin-list',
        pathMatch: 'full',
      },
      { path: 'admin-list', component: AdminListComponent },
      { path: 'admin-list/add', component: AddAdminComponent },
      { path: 'admin-list/edit/:id', component: EditAdminComponent },
      { path: 'formateur-list', component: FormateurListComponent },
      { path: 'etudiant-list', component: EtudiantListComponent },
      { path: 'etudiant-list/add', component: AddEtudiantComponent },
      { path: 'etudiant-list/edit/:id', component: EditEtudiantComponent },
      { path: 'formateur-list', component: FormateurListComponent },
      { path: 'formateur-list/add', component: AddFormateurComponent },
      { path: 'formateur-list/edit/:id', component: EditFormateurComponent },
      { path: 'groupe-list', component: GroupeListComponent },
      { path: 'groupe-list/add', component: AddGroupeComponent },
      { path: 'groupe-list/edit/:id', component: EditGroupeComponent },
      {
        path: '**',
        redirectTo: '/404',
        pathMatch: 'full',
      },
    ],
  },
];

export const AdminRoutes = RouterModule.forChild(routes);
