import { Component, OnInit, Inject } from '@angular/core';
import { AreasService } from 'src/app/core/services/areas.service';
import { AreaModel } from '../../shared/models/area.model';
import { Subscription } from 'rxjs';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Router } from '@angular/router';
import { L10nLocale, L10N_LOCALE } from 'angular-l10n';

@Component({
  selector: 'app-all-areas',
  templateUrl: './all-areas.component.html',
  styleUrls: ['./all-areas.component.css']
})
export class AllAreasComponent implements OnInit {
  subscription: Subscription;
  areas: AreaModel[] = [];
  displayedColumns: string[] = ['area_id', 'location_name', 'location_address', 'area_title', 'area_description', 'workers_must_be', 'working_now'];

  constructor(
    private areasService: AreasService,
    private authorizationService: AuthorizationService,
    private router: Router,
    @Inject(L10N_LOCALE) public locale: L10nLocale
  ) {
    authorizationService.isLoggedIn.subscribe(logged => {
      if (!logged){
        this.router.navigate(['']);
      }
    });
   }

  ngOnInit(): void {
    this.getAreas();
  }

  getAreas(): void {
    this.areasService.GetAllAreas().subscribe(
      res => {
        this.areas = res;
      }
    );
  }

  getColor(workersNow: number, workersMustBe: number): string{
    if (workersNow < workersMustBe){
      return 'red';
    }
    if (workersNow > workersMustBe){
      return 'yellow';
    }
    return 'green';
  }

}
