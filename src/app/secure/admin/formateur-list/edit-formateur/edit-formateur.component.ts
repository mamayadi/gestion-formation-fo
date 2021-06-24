import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Formateur } from 'src/app/shared/models/Formateur.model';
import { FormateurService } from 'src/app/secure/services/formateur.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-formateur',
  templateUrl: './edit-formateur.component.html',
  styleUrls: ['./edit-formateur.component.scss'],
})
export class EditFormateurComponent implements OnInit {
  formateur$: Observable<Formateur>;
  formateur: Formateur;
  formateurForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private formateurService: FormateurService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.formateur$ = this.formateurService.getFormateur(params.id);
    });
    this.formateur$?.subscribe(
      (formateur) => {
        this.formateur = formateur;
        this.formateurForm = this.createForm(formateur);
      },
      (error) => {
        this.snackBar.open('Etudiant introuvable!', 'OK', {
          duration: 3500,
          panelClass: ['mat-toolbar', 'mat-primary'],
        });
        this.router.navigate(['/list-formateur']);
      }
    );
  }

  createForm(formateur?: Formateur): FormGroup {
    return this.fb.group({
      nomControl: [formateur.nom, [Validators.required]],
      prenomControl: [formateur.prenom, [Validators.required]],
      usernameControl: [formateur.username, [Validators.required]],
      passwordControl: [formateur.password, [Validators.required]],
    });
  }

  submitFormateur(): void {
    if (this.formateurForm.valid) {
      const inputValues = this.formateurForm.getRawValue();
      const formateur: Formateur = {
        id: this.formateur.id,
        nom: inputValues.nomControl,
        prenom: inputValues.prenomControl,
        username: inputValues.usernameControl,
        password: inputValues.passwordControl,
      };
      this.formateurService.updateFormateur(formateur).subscribe((data) => {
        if (data) {
          this.snackBar.open('Formateur modifié avec succès', 'OK', {
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
