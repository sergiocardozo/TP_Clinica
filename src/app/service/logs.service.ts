import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  itemCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.itemCollection = this.afs.collection('logs');
  }

  addItem(item: any) {
    return this.itemCollection.add(JSON.parse(JSON.stringify(item)));
  }

  getLogs() {
    this.itemCollection = this.afs.collection('logs');
    return this.itemCollection.valueChanges({ idField: 'doc_id' });
  }
}
