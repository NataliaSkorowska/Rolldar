import { Component, OnInit } from '@angular/core';
import { CrudService } from './../services/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  bookingForm: FormGroup;

  constructor(
    private crudService: CrudService,
    public formBuilder: FormBuilder,    
    private router: Router
  ) { }

  ngOnInit() {
    this.bookingForm = this.formBuilder.group({
      name: [''],
      address: [''],
      mobile:[''],
      email:[''],
      service:['']
    })
  }
  submitBooking() {
    if (!this.bookingForm.valid) {
      return false;
    } else {
      this.crudService.create(this.bookingForm.value)
      .then(() => {
        this.bookingForm.reset();
        this.router.navigate(['/offer']);
      }).catch((err) => {
        console.log(err)
      });
    }
  }

}
