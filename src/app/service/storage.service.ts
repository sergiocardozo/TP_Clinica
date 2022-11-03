import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private filePath: any;
  private downloadURL?: Observable<any>;

  constructor(private storage: AngularFireStorage) { }

  uploadFile(path: string, file: any) {
    console.log('path: ' + path  + ' ' + file);
    return this.storage.upload(path, file);
  }

  refCloudStorage(archivo: string) {
    return this.storage.ref(archivo);
  }
}
