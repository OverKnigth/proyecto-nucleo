import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscripcionesService } from '../../services/inscripciones/inscripciones.service';
import { Inscripcion } from '../../types/inscripciones';

@Component({
  selector: 'app-inscribirse',
  imports: [ReactiveFormsModule],
  templateUrl: './inscribirse.component.html',
  styleUrl: './inscribirse.component.css'
})
export class InscribirseComponent {
  inscripcionForm: FormGroup;
  id: number = 0;

  constructor(private formBuilder: FormBuilder, private inscripcionesService: InscripcionesService) { 
    this.inscripcionForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      curso: ['', Validators.required],
      nivelConocimiento: ['', Validators.required],
      horario: ['', Validators.required],
      motivo: ['', Validators.required]
    })
  }
  
  guardarInscripcion() {
    if (this.inscripcionForm.valid) {
      const inscripcion: Inscripcion = this.inscripcionForm.value;
      this.inscripcionesService.addInscripcion(inscripcion).then(() => {
        console.log('Inscripción guardada exitosamente');
        // Aquí podrías limpiar el formulario o hacer otra acción
      }).catch((error) => {
        console.error('Error al guardar la inscripción:', error);
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
