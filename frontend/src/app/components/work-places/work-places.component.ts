import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { WorkObjectsService } from 'src/app/core/services/work-objects.service';
import { Router } from '@angular/router';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';
import { Subscription } from 'rxjs';
import { WorkObjectModel, CreateWorkObjectModel } from '../../shared/models/work-object.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';


@Component({
  selector: 'app-work-places',
  templateUrl: './work-places.component.html',
  styleUrls: ['./work-places.component.css']
})
export class WorkPlacesComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  workObjects: WorkObjectModel[] = [];
  displayedColumns: string[] = ['id', 'name', 'address', 'link'];
  workObjectForm: FormGroup;

  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    private workObjectsService: WorkObjectsService,
    private authorizationService: AuthorizationService,
    private fb: FormBuilder,
    private router: Router,
    @Inject(L10N_LOCALE) public locale: L10nLocale
  ) {
    this.subscription.add(authorizationService.isLoggedIn.subscribe(logged => {
      if (!logged){
        this.router.navigate(['']);
      }
    }));
   }

  ngOnInit(): void {
    this.GetWorkObjects();
    this.createWorkObjectForm();
  }

  GetWorkObjects(): void {
    this.subscription.add(this.workObjectsService.GetWorkObjects()
      .subscribe(data => {
        this.workObjects = data;
      })
    );
  }

  createWorkObjectForm(): void {
    this.workObjectForm = this.fb.group({
      name: new FormControl(
        '', [Validators.required, Validators.maxLength(150)]),
      address: new FormControl(
        '', [Validators.required, Validators.maxLength(250)]),
    });
  }

  onSubmit(): void {
    const workObjectViewModel = this.workObjectForm.value as CreateWorkObjectModel;
    this.subscription.add(this.workObjectsService.CreateWorkObject(workObjectViewModel).subscribe(
      res => {
        this.workObjects.push(res);
        this.table.renderRows();
        this.workObjectForm.reset();
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
