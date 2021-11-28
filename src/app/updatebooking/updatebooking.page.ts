import { Component, OnInit } from '@angular/core';
import { CrudService } from './../services/crud.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Booking } from '../booking.model';

@Component({
  selector: 'app-updatebooking',
  templateUrl: './updatebooking.page.html',
  styleUrls: ['./updatebooking.page.scss'],
})
export class UpdatebookingPage implements OnInit {
  id: string='';
  bookingForm : FormGroup;


  constructor( private crudService: CrudService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder) {
     this.bookingForm = this.formBuilder.group({
      name: new FormControl(''),
      mobile: new FormControl(''),
      address: new FormControl(''),
      status: new FormControl(''),
      email: new FormControl(''),
      employee: new FormControl('')
    });
    }

  ngOnInit() {
    this.id= this.actRoute.snapshot.paramMap.get("id");

    this.crudService.getBooking(this.actRoute.snapshot.paramMap.get("id"))
      .subscribe(data => {
        this.bookingForm = this.formBuilder.group({
          name: new FormControl(data.name),
          mobile: new FormControl(data.mobile),
          address: new FormControl(data.address),
          email: new FormControl(data.email),
          status: new FormControl(data.status),
          employee: new FormControl(data.employee)
        });
      });
  }
  onSubmit() {
    const booking: Booking = Object.assign({}, this.bookingForm.value);
    this.crudService.update(this.id,booking)
    .then(()=>{
      this.router.navigate(['/bookings']);
    });
  }

}
