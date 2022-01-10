import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { finalize, tap } from 'rxjs/operators';
import { CrudService } from '../services/crud.service';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';


export interface MyData {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})

export class InvoicesPage implements OnInit {

  private basePath = '/invoices'
 
  task: AngularFireUploadTask;

  percentage: Observable<number>;

  snapshot: Observable<any>;

  UploadedFileURL: Observable<string>;

  images: Observable<MyData[]>;

  fileName:string;
  fileSize:number;

  isUploading:boolean;
  isUploaded:boolean;

  private imageCollection: AngularFirestoreCollection<MyData>;

  constructor(private database: AngularFirestore,
    private storage: AngularFireStorage,
    private crudService: CrudService,
    private alertCtrl: AlertController,
    private db: AngularFireDatabase) { 
      this.isUploading = false;
      this.isUploaded = false;
    
      this.imageCollection = database.collection<MyData>('invoices');
      this.images = this.imageCollection.valueChanges();
      this.alertCtrl= alertCtrl;
  }

  ngOnInit() {
  }

  uploadFile(event: FileList) {
    
    const file = event.item(0)

    if (file.type.split('/')[0] !== 'image') { 
     console.error('unsupported file type :( ')
     return;
    }
    this.isUploading = true;
    this.isUploaded = false;

    this.fileName = file.name;

    const path = `invoices/${new Date().getTime()}_${file.name}`;

    const customMetadata = { app: 'Freaky Image Upload Demo' };

    const fileRef = this.storage.ref(path);

    this.task = this.storage.upload(path, file, { customMetadata });

    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      
      finalize(() => {
        this.UploadedFileURL = fileRef.getDownloadURL();
        
        this.UploadedFileURL.subscribe(resp=>{
          this.addImagetoDB({
            name: file.name,
            filepath: resp,
            size: this.fileSize
          });
          this.isUploading = false;
          this.isUploaded = true;
        },error=>{
          console.error(error);
        })
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    )
  }

  addImagetoDB(image: MyData) {
    const id = this.database.createId();
    this.imageCollection.doc(id).set(image).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("error " + error);
    });
  }
}