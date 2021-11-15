import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";

export class Booking {
  $key: string;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private ngFirestore: AngularFirestore,
    private router: Router
  ) { }
  create(booking: Booking) {
    return this.ngFirestore.collection('bookings').add(booking);
  }

  getBookings() {
    return this.ngFirestore.collection('bookings').snapshotChanges();
  }
  
  getBooking(id) {
    return this.ngFirestore.collection('bookings').doc(id).valueChanges();
  }

  update(id, booking: Booking) {
    this.ngFirestore.collection('bookings/').doc(id).update(booking)
      .then(() => {
        this.router.navigate(['/bookings']);
      }).catch(error => console.log(error));;
  }

  delete(id: string) {
    this.ngFirestore.doc('bookings/' + id).delete();
  }
}
