import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  horariosCollection: AngularFirestoreCollection<any>;
  horarioEspecialistaCollect: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.horariosCollection = this.afs.collection('horarios');
  }

  /* HORARIOS */
  addHorarios(item: any) {
    return this.horariosCollection.add(item);
  }

  getHorarios() {
    this.horariosCollection = this.afs.collection('horarios');
    return this.horariosCollection.valueChanges({ idField: 'doc_id' })
  }

  updateHorario(uid: string, item: any) {
    return this.horariosCollection.doc(uid).update({ horarios: item.horarios, })
  }
  
  /* HORARIOS-ESPECIALISTA */

  getHorarioEspecialista(uid: string) {
    this.horarioEspecialistaCollect = this.afs.collection('horarios', ref => ref.where('uidEspecialista', '==', uid));
    return this.horarioEspecialistaCollect.valueChanges({ idField: 'doc_id' });
  }

  getHorarEsp(uidEsp: string, uidEspecialidad) {
    this.horarioEspecialistaCollect = this.afs.collection('horarios', ref => ref.where('uidEspecialista', '==', uidEsp)
      .where('especialidad', '==', uidEspecialidad));
    return this.horarioEspecialistaCollect.valueChanges({ idField: 'doc_id' });
  }




}
