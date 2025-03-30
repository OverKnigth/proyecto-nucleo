import { Component, OnInit } from '@angular/core';
import { InscripcionesService } from '../../services/inscripciones/inscripciones.service';
import { Inscripcion } from '../../types/inscripciones';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-mis-cursos',
  imports: [],
  templateUrl: './mis-cursos.component.html',
  styleUrl: './mis-cursos.component.css'
})
export class MisCursosComponent {
  inscripciones: Inscripcion[] = [];
  correoUsuario: string = '';

  constructor(
    private router: Router,
    private inscripcionesService: InscripcionesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.correoUsuario = user.email!;
      this.getInscripciones();  // Obtener las inscripciones solo del usuario autenticado
    } else {
      this.router.navigate(['/login']);  // Si no está autenticado, redirigir a la página de login
    }
  }

  getInscripciones() {
    if (this.correoUsuario) {
      this.inscripcionesService.getInscripcionesByCorreo(this.correoUsuario).subscribe((inscripciones) => {
        this.inscripciones = inscripciones;
      });
    }
  }

  goToInscripcion(id: string) {
    this.router.navigate(['/inscribirse', id]);
  }

  eliminarInscripcion(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar esta inscripción?')) {
      this.inscripcionesService.deleteInscripcion(id).then(() => {
        this.getInscripciones(); // Actualizar la lista de inscripciones
      });
    }
  }

  editarInscripcion(id: string, updatedInscripcion: Inscripcion) {
    this.inscripcionesService.updateInscripcion(id, updatedInscripcion).then(() => {
      // Actualizar la lista de inscripciones después de editar
      this.getInscripciones();
    });
  }
}