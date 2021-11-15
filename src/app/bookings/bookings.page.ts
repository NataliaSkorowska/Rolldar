import { Component, OnInit } from '@angular/core';
import { CrudService } from './../services/crud.service';

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

  Bookings: Booking[];

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.crudService.getBookings().subscribe((res) => {
      this.Bookings = res.map((t) => {
        return {
          id: t.payload.doc.id,
          ...t.payload.doc.data() as Booking
        };
      })
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
    if (window.confirm('Are you sure?')) {
      this.crudService.delete(id)
    }
  }  
  

}
