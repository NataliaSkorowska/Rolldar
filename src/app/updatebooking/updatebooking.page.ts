import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CrudService } from './../services/crud.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Booking } from '../booking.model';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-updatebooking',
  templateUrl: './updatebooking.page.html',
  styleUrls: ['./updatebooking.page.scss'],
})

export class UpdatebookingPage implements OnInit {

  id: string='';
  bookingForm : FormGroup;
  image: string;

  constructor( private crudService: CrudService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    private afs: AngularFireStorage,
    private rout: Router,
    private route: ActivatedRoute,
    ) {
     this.bookingForm = this.formBuilder.group({
      name: new FormControl(''),
      mobile: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl(''),
      status: new FormControl(''),
      bookingDate: new FormControl(''),
      image: new FormControl('')
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
          status: new FormControl (data.status),
          bookingDate: new FormControl(data.bookingDate),
          image: new FormControl(data.image)
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
