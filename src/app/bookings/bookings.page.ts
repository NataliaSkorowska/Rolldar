import { Component, OnInit } from '@angular/core';
import { CrudService } from './../services/crud.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

export class Booking {
  $key: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  public Bookings: Booking[];
  public BookingsBackup: any[];

  constructor(private crudService: CrudService,
    private firestore: AngularFirestore) { }

   async ngOnInit() {
    this.crudService.getBookings().subscribe((res) => {
      this.Bookings = res.map((t) => {
        return {
          id: t.payload.doc.id,
          ...t.payload.doc.data() as Booking
        };
      })
    });
    this.Bookings = await this.initializeItems();
  }

  async initializeItems(): Promise<any> {
    const bookings = await this.firestore.collection('bookings')
      .valueChanges().pipe(first()).toPromise();
    this.BookingsBackup = bookings;
    return this.bookings;
  }

 filterList(evt) {
  this.initializeItems();

  const searchTerm = evt.srcElement.value;

  if (!searchTerm) {
     return;
  }

  this.Bookings = this.BookingsBackup.filter(currentGoal => {
     if (currentGoal.title && searchTerm) {
        if (currentGoal.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
           return true;
        }
        return false;
     }
  });
}
  bookings() {
    this.crudService.getBookings()
    .subscribe((data) => {
      console.log(data)
    })
  }
  remove(id) {
    console.log(id)
    if (window.confirm('Jesteś pewny, że chcesz usunąć?')) {
      this.crudService.delete(id)
    }
  } 

}
