import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class HistoriaService {

  itemCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.itemCollection = this.afs.collection('historiaclinica');
  }

  addItem(item: any) {
    return this.itemCollection.add(item);
  }

  getHistorias() {
    this.itemCollection = this.afs.collection('historiaclinica');
    return this.itemCollection.valueChanges({id_field: 'doc_id'});
  }

  getHistorias_paciente(uid: string) {
    this.itemCollection = this.afs.collection('historiaclinica', ref => ref.where('uidPaciente', '==', uid));
    return this.itemCollection.valueChanges({id_field: 'doc_id'});
  }

  getHistorias_especialista(uid: string) {
    this.itemCollection = this.afs.collection('historiaclinica', ref => ref.where('uidEspecialista', '==', uid));
    return this.itemCollection.valueChanges({id_field: 'doc_id'});
  }

  getHistoriasOrdenadas() {
    this.itemCollection = this.afs.collection('historiaclinica',ref => ref.orderBy('dia',  "asc"));
    return this.itemCollection.valueChanges({idField: "doc_id"});
  }
}
