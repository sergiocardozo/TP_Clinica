import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  itemCollection: AngularFirestoreCollection<any>;
  itemEspecialistaCollection: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore) {
    this.itemCollection = afs.collection('turnos');
    this.itemEspecialistaCollection = afs.collection('turnos');
  }

  addTurno(item: any) {
    return this.itemCollection.add(item);
  }

  getTurnos() {
    this.itemCollection = this.afs.collection('turnos', ref => ref.orderBy('dia', 'asc'));
    return this.itemCollection.valueChanges({ idField: 'doc_id' });
  }

  getTurnosEspec_Especialidad(uidEsp: string, especialidad: string) {
    this.itemEspecialistaCollection = this.afs.collection('turnos', ref => ref.where('especialista', '==', uidEsp).where('especialidad', '==', especialidad));
    return this.itemEspecialistaCollection.valueChanges({ idField: 'doc_id' });
  }

  updateTurno(id: string, item: any) {

    return this.itemCollection.doc(id).update({
      dia: item.dia,
      especialidad: item.especialidad,
      uidEspecialista: item.uidEspecialista,
      estado: item.estado,
      hora: item.hora,
      uidPaciente: item.uidPaciente,
      reseña: item.reseña,
      comentario_cancela: item.comentario_cancela,
      comentario_anula: item.comentario_anula,
      calificacion: item.calificacion
    })
  }
}
