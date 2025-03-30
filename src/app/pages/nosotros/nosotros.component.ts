import { Component } from '@angular/core';
import { Inscripcion } from '../../types/inscripciones';

@Component({
  selector: 'app-nosotros',
  imports: [],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {
  inscripcion: Inscripcion | undefined;

}
