import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  itemCollection: AngularFirestoreCollection<any>;
  especialidadesCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.itemCollection = this.afs.collection('usuarios');
    this.especialidadesCollection = this.afs.collection('especialidades');
  }


  /* REGISTRO USUARIO */
  setItemId(item: any, id: string) {
    return this.itemCollection.doc(id).set(Object.assign({}, { uid: id, ...item }));
  }

  getUserByUid(uid:string){
    return this.getItemById(uid);
  }

  protected getItemById(id:string){
    return this.itemCollection.doc(id).get();
  }
  /* ESPECIALIDADES */
  addEspecialidad(item: any) {
    this.especialidadesCollection = this.afs.collection('especialidades');
    return this.especialidadesCollection.add(Object.assign({}, item));
  }

  getEspecialidad() {
    return this.especialidadesCollection.valueChanges({ idfield: 'doc_id' });
  }
}
