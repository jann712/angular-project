import { Component, inject } from "@angular/core";
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from "../housinglocation";
import { CommonModule } from "@angular/common";
import { HousingService } from "../housing.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [HousingLocationComponent, CommonModule, ActivatedRoute],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter/>
        <button class="primary" type="button"
        (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
    <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation" />
    </section>  
  `,
  styles: ``,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocationList: HousingLocation[] = []
  housingService: HousingService = inject(HousingService)
  filteredLocationList: HousingLocation[] = []
  housingLocation: HousingLocation | undefined;

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
      this.housingLocation = housingLocation;
    });
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) => housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }

}