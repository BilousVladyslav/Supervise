import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Router, ActivatedRoute } from '@angular/router';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';
import { AreasService } from 'src/app/core/services/areas.service';
import { AreaModel, CreateAreaModel, EditAreaModel } from '../../shared/models/area.model';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { WorkObjectsService } from 'src/app/core/services/work-objects.service';
import { WorkObjectModel, CreateWorkObjectModel } from '../../shared/models/work-object.model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-work-object',
  templateUrl: './edit-work-object.component.html',
  styleUrls: ['./edit-work-object.component.css']
})
export class EditWorkObjectComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  workObjectId: string;
  workObjectForm: FormGroup;
  newAreaFormGroup: FormGroup;
  areasFormGroup: FormGroup;
  areasFormArray: FormArray;

  constructor(
    private authorizationService: AuthorizationService,
    private areasService: AreasService,
    private workObjectsService: WorkObjectsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(L10N_LOCALE) public locale: L10nLocale
  ) {
    this.subscriptions.add(authorizationService.isLoggedIn.subscribe(logged => {
      if (!logged){
        this.router.navigate(['']);
      }
    }));
    this.workObjectId = this.route.snapshot.params['objectId'];
   }

  ngOnInit(): void {
    this.getWorkObject();
    this.getAreas();
    this.createNewAreaFormGroup();
  }

  createWorkObjectForm(workObjectViewModel: WorkObjectModel): void {
    this.workObjectForm = this.fb.group({
      name: new FormControl(
        workObjectViewModel.name, [Validators.required, Validators.maxLength(150)]),
      address: new FormControl(
        workObjectViewModel.address, [Validators.required, Validators.maxLength(250)]),
    });
  }

  getWorkObject(): void {
    this.subscriptions.add(this.workObjectsService.GetConcreteWorkObject(this.workObjectId).subscribe(
      res => this.createWorkObjectForm(res)
    ));
  }

  saveWorkObject(): void {
    const workObjectViewModel = this.workObjectForm.value as CreateWorkObjectModel;
    this.subscriptions.add(this.workObjectsService.EditWorkObject(workObjectViewModel, this.workObjectId).subscribe(
      res => {
        this._snackBar.open('Successfully updated work object', 'Close', {
          duration: 3000,
        });
      }
    ));
  }

  deleteWorkObject(): void {
    this.subscriptions.add(this.workObjectsService.DeleteWorkObject(this.workObjectId).subscribe(
      res => this.router.navigate(['workobjects'])
    ));
  }

  createAreaForm(area: AreaModel): FormGroup {
    return this.fb.group({
      id: new FormControl(area.id),
      title: new FormControl(
        area.title, [Validators.required, Validators.maxLength(150)]),
      description: new FormControl(
        area.description, [Validators.required]),
      workers_count: new FormControl(
        area.workers_count, [Validators.required, Validators.pattern(new RegExp('^\\d+$'))])
    });
  }

  getAreas(): void {
    this.areasFormGroup = this.fb.group({
      areas: new FormArray([]),
    });
    this.areasFormArray = this.areasFormGroup.get('areas') as FormArray;
    this.subscriptions.add(this.areasService.SearchAreas(this.workObjectId).subscribe( res => {
      res.forEach(area => {
        this.areasFormArray.push(this.createAreaForm(area));
      });
    }));
  }

  deleteArea(index): void {
    if (index < this.areasFormArray.length) {
      const areaId = (this.areasFormArray.at(index) as FormGroup).get('id').value;
      this.subscriptions.add(this.areasService.DeleteArea(areaId).subscribe(
          res => this.areasFormArray.removeAt(index)
      ));
    }
  }

  saveArea(index): void {
    if (index < this.areasFormArray.length) {
      const areaId = (this.areasFormArray.at(index) as FormGroup).get('id').value;
      const areaViewModel = (this.areasFormArray.at(index) as FormGroup).value as EditAreaModel;
      this.subscriptions.add(this.areasService.EditArea(areaViewModel, areaId).subscribe(
        res => {
          this._snackBar.open('Successfully updated area', 'Close', {
            duration: 3000,
          });
        }
      ));
    }
  }

  createNewArea(): void {
    const createNewAreaViewmodel = this.newAreaFormGroup.value as CreateAreaModel;
    this.subscriptions.add(this.areasService.CreateArea(createNewAreaViewmodel).subscribe(
      area => {
        this.areasFormArray.push(this.createAreaForm(area));
        this.newAreaFormGroup.reset();
      }
    ));
  }

  createNewAreaFormGroup(): void{
    this.newAreaFormGroup = this.fb.group({
      title: new FormControl(
        '', [Validators.required, Validators.maxLength(150)]),
      description: new FormControl(
        '', [Validators.required]),
      workers_count: new FormControl(
        '', [Validators.required, Validators.pattern(new RegExp('^\\d+$'))])
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
