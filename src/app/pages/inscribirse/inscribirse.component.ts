import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscripcionesService } from '../../services/inscripciones/inscripciones.service';
import { Inscripcion } from '../../types/inscripciones';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inscribirse',
  imports: [ReactiveFormsModule],
  templateUrl: './inscribirse.component.html',
  styleUrl: './inscribirse.component.css'
})
export class InscribirseComponent {
  inscripcionForm: FormGroup;
  inscripcionId: string | null = null; // Para detectar si es edición

  constructor(
    private formBuilder: FormBuilder,
    private inscripcionesService: InscripcionesService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.inscripcionForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      curso: ['', Validators.required],
      nivelConocimiento: ['', Validators.required],
      horario: ['', Validators.required],
      motivo: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.inscripcionId = params.get('id'); // Obtener el ID de la URL
      if (this.inscripcionId) {
        this.cargarInscripcion(this.inscripcionId);
      }
    });
  }

  cargarInscripcion(id: string) {
    this.inscripcionesService.getInscripcionById(id).subscribe(inscripcion => {
      if (inscripcion) {
        this.inscripcionForm.patchValue(inscripcion);
      }
    });
  }

  guardarInscripcion() {
    if (this.inscripcionForm.valid) {
      const inscripcion: Inscripcion = this.inscripcionForm.value;
      
      if (this.inscripcionId) {
        // Si hay un ID, actualizamos
        this.inscripcionesService.updateInscripcion(this.inscripcionId, inscripcion).then(() => {
          console.log('Inscripción actualizada');
          this.router.navigate(['/mis-inscripciones']);
        });
      } else {
        // Si no hay ID, creamos una nueva inscripción
        this.inscripcionesService.addInscripcion(inscripcion).then(() => {
          console.log('Inscripción guardada');
          this.router.navigate(['/mis-inscripciones']);
        });
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  get nombre(){return this.inscripcionForm.get("nombre")};
  get correo(){return this.inscripcionForm.get("correo")};
  get telefono(){return this.inscripcionForm.get("telefono")};
  get curso(){return this.inscripcionForm.get("curso")};
  get nivelConocimiento(){return this.inscripcionForm.get("nivelConocimiento")};
  get horario(){return this.inscripcionForm.get("horario")};
  get motivo(){return this.inscripcionForm.get("motivo")};

}