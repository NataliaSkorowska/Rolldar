import { Component, OnInit } from '@angular/core';
import { CrudService } from './../services/crud.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-updatebooking',
  templateUrl: './updatebooking.page.html',
  styleUrls: ['./updatebooking.page.scss'],
})
export class UpdatebookingPage implements OnInit {

  editForm: FormGroup;
  id: any;

  constructor( private crudService: CrudService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.crudService.getBooking(this.id).subscribe((data) => {
      this.editForm = this.formBuilder.group({
        title: [data['title']],
        description: [data['description']]
      })
    });
     }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      title: [''],
      description: ['']
    })    
  }
  onSubmit() {
    this.crudService.update(this.id, this.editForm.value)
  }
}
