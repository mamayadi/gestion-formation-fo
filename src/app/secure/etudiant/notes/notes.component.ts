import { Component, OnInit } from '@angular/core';

import { Etudiant } from 'src/app/shared/models/Etudiant.model';
import { MatTableDataSource } from '@angular/material/table';
import { Note } from 'src/app/shared/models/Note.model';
import { TokenStorageService } from 'src/app/core/service/TokenStorage.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  displayedColumns: string[] = ['matiere', 'noteds', 'notedc', 'moyenne'];
  notes: Note[] = [];
  public dataSource = new MatTableDataSource(this.notes);
  constructor(private tokenStorage: TokenStorageService) {}

  ngOnInit() {
    this.notes = (this.tokenStorage.getUser() as Etudiant).listNote;
    this.dataSource = new MatTableDataSource(this.notes);
  }
}
