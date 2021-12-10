import { Component, OnInit } from '@angular/core';
import { CrudService } from './../services/crud.service';
import { FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

  bookingForm: FormGroup;
  submitError: string;
  isSubmitted = false;
  defaultDate = "2022-01-01";

  constructor(
    private crudService: CrudService,
    public formBuilder: FormBuilder,    
    private router: Router
  ) { }

  ngOnInit() {
    this.bookingForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(6)]],
      address: ['',[Validators.required, Validators.minLength(6)]],
      mobile:['',[Validators.required,Validators.pattern('^[0-9]{9}$')]],
      email:['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      service:['',[Validators.required]],
      blindType:['',[Validators.required]],
      status:['nowy'],
      bookingDate: [this.defaultDate],
    })
  }

  get errorControl() {
    return this.bookingForm.controls;
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.bookingForm.get('bookingDate').setValue(date, {
      onlyself: true
    })
  }

  submitBooking() {
    this.isSubmitted = true;
    if (!this.bookingForm.valid) {
      return false;
    } else {
      this.crudService.create(this.bookingForm.value)
      .then(() => {
        this.bookingForm.reset();
        this.router.navigate(['/offer']);
      })
    }
  }
}
