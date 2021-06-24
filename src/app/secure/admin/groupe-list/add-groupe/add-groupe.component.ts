import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Etudiant } from 'src/app/shared/models/Etudiant.model';
import { EtudiantService } from 'src/app/secure/services/etudiant.service';
import { Groupe } from 'src/app/shared/models/Groupe.model';
import { GroupeService } from 'src/app/secure/services/groupe.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Matiere } from 'src/app/shared/models/Matiere.model';
import { MatiereService } from 'src/app/secure/services/matiere.service';
import { Observable } from 'rxjs';
import { getFullname } from 'src/app/shared/functions/commun';

@Component({
  selector: 'app-add-groupe',
  templateUrl: './add-groupe.component.html',
  styleUrls: ['./add-groupe.component.scss'],
})
export class AddGroupeComponent implements OnInit {
  etudiants$: Observable<Etudiant[]>;
  matiere$: Observable<Matiere[]>;
  groupeForm: FormGroup;
  getFullname = getFullname;
  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private groupeService: GroupeService,
    private etudiantService: EtudiantService,
    private matiereService: MatiereService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.groupeForm = this.createForm();
    this.addEtudiant();
    this.addMatiere();
    this.loadEtudiants();
    this.loadMatiere();
  }

  loadEtudiants(): void {
    this.etudiants$ = this.etudiantService.getEtudiants();
  }

  loadMatiere(): void {
    this.matiere$ = this.matiereService.getMatieres();
  }

  createForm(): FormGroup {
    return this.fb.group({
      libelleControl: [null, [Validators.required]],
      listEtudiantControl: this.fb.array([]),
      listMatiereControl: this.fb.array([]),
    });
  }

  get etudiants(): FormArray {
    return this.groupeForm.get('listEtudiantControl') as FormArray;
  }

  get matieres(): FormArray {
    return this.groupeForm.get('listMatiereControl') as FormArray;
  }

  addEtudiant(): void {
    this.etudiants.push(
      this.fb.group({
        etudiantControl: [null, [Validators.required]],
      })
    );
  }

  removeEtudiant(i: number): void {
    this.etudiants.removeAt(i);
  }

  addMatiere(): void {
    this.matieres.push(
      this.fb.group({
        matiereControl: [null, [Validators.required]],
      })
    );
  }

  removeMatiere(i: number): void {
    this.matieres.removeAt(i);
  }

  submitGroupe(): void {
    if (this.groupeForm.valid) {
      const inputValues = this.groupeForm.getRawValue();
      const groupe: Groupe = {
        libelle: inputValues.libelleControl,
        listEtudiant: inputValues.listEtudiantControl.map((etudiant) => {
          return { id: etudiant.etudiantControl };
        }),
        listMatiere: inputValues.listMatiereControl.map((matiere) => {
          return { id: matiere.matiereControl };
        }),
      };
      this.groupeService.createGroupe(groupe).subscribe((data) => {
        if (data) {
          this.snackBar.open('Groupe a été créé avec succès', 'OK', {
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-primary'],
          });
          this.router.navigate(['./'], { relativeTo: this.route.parent });
        }
      });
    } else {
      this.snackBar.open('Formulaire invalid', 'OK', {
        duration: 3500,
        panelClass: ['mat-toolbar', 'mat-primary'],
      });
    }
  }

  onBack(): void {
    this.location.back();
  }
}
