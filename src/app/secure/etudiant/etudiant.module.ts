import { CommonModule } from '@angular/common';
import { EtudiantComponent } from './etudiant.component';
import { EtudiantRoutingRoutes } from './etudiant-routing.module';
import { NgModule } from '@angular/core';
import { NotesComponent } from './notes/notes.component';
import { PresenceComponent } from './presence/presence.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [CommonModule, EtudiantRoutingRoutes, SharedModule],
  declarations: [EtudiantComponent, NotesComponent, PresenceComponent],
})
export class EtudiantModule {}
