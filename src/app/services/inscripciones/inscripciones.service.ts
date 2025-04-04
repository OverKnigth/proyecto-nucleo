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
    const inscripcionesRef = collection(this.fireStore, "inscripciones");
    return collectionData(inscripcionesRef) as Observable<Inscripcion[]>
  }

  getInscripcionesByCorreo(correo: string): Observable<Inscripcion[]> {
    const inscripcionesRef = collection(this.fireStore, 'inscripciones');
    const q = query(inscripcionesRef, where('correo', '==', correo));
    return collectionData(q, { idField: 'id' }) as Observable<Inscripcion[]>;
  }
  

  deleteInscripcion(id: string) {
    const inscripcionRef = doc(this.fireStore, 'inscripciones', id);  
    return deleteDoc(inscripcionRef)  
      .then(() => {
        console.log('Inscripción eliminada con ID:', id);
      })
      .catch((error) => {
        console.error('Error al eliminar la inscripción:', error); 
      });
  }
  
  getInscripcionById(id: string): Observable<Inscripcion | undefined> {
    const inscripcionRef = doc(this.fireStore, 'inscripciones', id);
    return docData(inscripcionRef, { idField: 'id' }) as Observable<Inscripcion | undefined>;
  }
  
  

    updateInscripcion(id: string, updatedInscripcion: Inscripcion) {
      const inscripcionRef = doc(this.fireStore, 'inscripciones', id);
      return updateDoc(inscripcionRef, updatedInscripcion)
        .then(() => {
          console.log('Inscripción actualizada con ID:', id);
        })
        .catch((error) => {
          console.error('Error al actualizar la inscripción:', error);
        });
    }
  
}
