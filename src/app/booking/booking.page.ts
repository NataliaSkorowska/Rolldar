import { Component, OnInit } from '@angular/core';
import { CrudService } from './../services/crud.service';
import { FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
  defaultHour ="";

  constructor(
    private crudService: CrudService,
    public formBuilder: FormBuilder,    
    private router: Router,
    private alertCtrl: AlertController
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
      bookingDate: [this.defaultDate]
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
      .then(
        async () =>{
         const alert = await this.alertCtrl.create({
          header: 'Potwierdzenie',
          cssClass: 'alert',
          message: 'Dziękujemy za dokonanie rezerwacji.'+
            'W ciągu dwóch dni roboczych otrzymasz wiadomość z potwierdzeniem daty wizyty naszego fachowca.',
           buttons:[{text:'Ok',role:'cancel',handler:() =>{
             this.router.navigateByUrl('offer');
           },},],
         });
         await alert.present();
       },
       async error => {
         const errorAlert = await this.alertCtrl.create({
           message: error.message,
           buttons:[{text:'Ok',role:'cancel'}],
           
         });
         await errorAlert.present();
         }
       );
      }
    }
  }