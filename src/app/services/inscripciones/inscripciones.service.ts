import { Injectable } from '@angular/core';
import { Inscripcion } from '../../types/inscripciones';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  constructor(private fireStore: Firestore) { }

  addInscripcion(inscripcion: Inscripcion) {
    const inscripcionesRef = collection(this.fireStore, 'inscripciones');
    return addDoc(inscripcionesRef, inscripcion)
      .then((docRef) => {
        console.log('Inscripción guardada con ID:', docRef.id);
      })
      .catch((error) => {
        console.error('Error al guardar la inscripción: ', error);
      });
  }

  getInscripciones(): Observable<Inscripcion[]>{
    //return this.http.get<Product[]>(this.url);
    const inscripcionesRef = collection(this.fireStore, "inscripciones");
    return collectionData(inscripcionesRef) as Observable<Inscripcion[]>
  }

  getInscripcionesByCorreo(correo: string): Observable<Inscripcion[]> {
    const inscripcionesRef = collection(this.fireStore, 'inscripciones');
    const q = query(inscripcionesRef, where('correo', '==', correo));
    return collectionData(q, { idField: 'id' }) as Observable<Inscripcion[]>;
  }
  

  deleteInscripcion(id: string) {
    const inscripcionRef = doc(this.fireStore, 'inscripciones', id);  // Referencia al documento de la inscripción
    return deleteDoc(inscripcionRef)  // Eliminar el documento por su ID
      .then(() => {
        console.log('Inscripción eliminada con ID:', id);
      })
      .catch((error) => {
        console.error('Error al eliminar la inscripción:', error);  // Verificar errores
      });
  }
  
  
}
