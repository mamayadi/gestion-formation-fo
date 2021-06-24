import { Component, OnInit } from '@angular/core';

import { Etudiant } from 'src/app/shared/models/Etudiant.model';
import { Groupe } from 'src/app/shared/models/Groupe.model';
import { MatTableDataSource } from '@angular/material/table';
import { Matiere } from 'src/app/shared/models/Matiere.model';
import { Seance } from 'src/app/shared/models/Seance.model';
import { TokenStorageService } from 'src/app/core/service/TokenStorage.service';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss'],
})
export class PresenceComponent implements OnInit {
  displayedColumns: string[] = ['matiere', 'nombreHeureEnseigne', 'volumeHoraire', 'seance', 'presence'];
  matieres: Matiere[] = [];
  etudiant: Etudiant;
  groupe: Groupe;
  public dataSource = new MatTableDataSource(this.matieres);
  constructor(private tokenStorage: TokenStorageService) {}

  ngOnInit() {
    this.etudiant = this.tokenStorage.getUser() as Etudiant;
    this.groupe = this.etudiant.groupe;
    console.log(this.groupe);
    this.matieres = this.groupe.listMatiere;
    this.dataSource = new MatTableDataSource(this.matieres);
  }

  getPresenceFromSeance(seance: Seance): string {
    const presence = seance.listFichePresence.find(
      (fiche) => fiche.etudiant.id === this.etudiant.id
    );
    return presence.presence ? '🟢' : '🔴';
  }
}
