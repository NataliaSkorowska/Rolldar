import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { CrudService } from "./../services/crud.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Booking } from "../booking.model";
import { AngularFireStorage } from "@angular/fire/storage";
import { Validators } from "@angular/forms";

@Component({
  selector: "app-updatebooking",
  templateUrl: "./updatebooking.page.html",
  styleUrls: ["./updatebooking.page.scss"],
})
export class UpdatebookingPage implements OnInit {
  id: string = "";
  bookingForm: FormGroup;
  submitError: string;
  isSubmitted = false;

  validation_messages = {
    email: [
      { type: "required", message: "Adres email jest wymagany" },
      { type: "pattern", message: "Wprowadź poprawny adres email" },
    ],
    name: [
      { type: "required", message: "Imię i nazwisko jest wymagane" },
      {
        type: "minLength",
        message: "Imię i nazwisko musi zawierać co najmniej 6 znaków",
      },
    ],
    address: [
      { type: "required", message: "Adres jest wymagany" },
      {
        type: "minLength",
        message: "Adres musi zawierać co najmniej 6 znaków",
      },
    ],
    mobile: [
      { type: "required", message: "Numer telefonu jest wymagany" },
      { type: "pattern", message: "Wprowadź poprawny numer telefonu" },
    ],
    status: [{ type: "required", message: "Status jest wymagany" }],
  };
  constructor(
    private crudService: CrudService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    private afs: AngularFireStorage,
    private rout: Router,
    private route: ActivatedRoute
  ) {
    this.bookingForm = this.formBuilder.group({
      name: new FormControl(""),
      mobile: new FormControl(""),
      address: new FormControl(""),
      email: new FormControl(""),
      status: new FormControl(""),
      bookingDate: new FormControl(""),
      startTime: new FormControl(""),
      endTime: new FormControl(""),
    });
  }
  get errorControl() {
    return this.bookingForm.controls;
  }

  ngOnInit() {
    this.id = this.actRoute.snapshot.paramMap.get("id");

    this.crudService
      .getBooking(this.actRoute.snapshot.paramMap.get("id"))
      .subscribe((data) => {
        this.bookingForm = this.formBuilder.group({
          name: new FormControl(data.name, [
            Validators.required,
            Validators.minLength(6),
          ]),
          mobile: new FormControl(data.mobile, [
            Validators.required,
            Validators.pattern("^[0-9]{9}$"),
          ]),
          address: new FormControl(data.address, [
            Validators.required,
            Validators.minLength(6),
          ]),
          email: new FormControl(
            data.email,
            Validators.compose([
              Validators.required,
              Validators.pattern(
                "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
              ),
            ])
          ),
          status: new FormControl(data.status, [Validators.required]),
          bookingDate: new FormControl(data.bookingDate),
          startTime: new FormControl(data.startTime),
          endTime: new FormControl(data.endTime),
        });
      });
  }
  onSubmit() {
    this.isSubmitted = true;
    if (!this.bookingForm.valid) {
      return false;
    } else {
      const booking: Booking = Object.assign({}, this.bookingForm.value);
      this.crudService.update(this.id, booking).then(() => {
        this.router.navigate(["/bookings"]);
      });
    }
  }
}
