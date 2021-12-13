import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';
import { Booking } from '../booking.model';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private ngFirestore: AngularFirestore,
    private router: Router,
    public angularFireDatabase: AngularFireDatabase
  ) { }
  create(booking: Booking) {
    return this.ngFirestore.collection('bookings').add(booking);
  }

  getBookings() {
    return this.ngFirestore.collection('bookings').snapshotChanges();
  }
  
  getBooking(id:string) {
    return this.ngFirestore.collection('bookings').doc<Booking>(id).snapshotChanges()
    .pipe(
      map(a => {
        const id = a.payload.id;
        const data = a.payload.data();
        return { id, ...data };
      })
    );
  }

  update(id: string, booking: Booking): Promise<void>{
    return this.ngFirestore.collection('bookings/').doc<Booking>(id).update(booking)
      .then(() => {
        this.router.navigate(['/bookings']);
      }).catch(error => console.log(error));;
  }
  
  delete(id: string) {
    this.ngFirestore.doc('bookings/' + id).delete();
  }

}
