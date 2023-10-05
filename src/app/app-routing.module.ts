import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixturesComponent } from './fixtures/fixtures.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  { path: "", redirectTo: "overview", pathMatch: "full" },
  { path: "overview", component: OverviewComponent },
  { path: "overview/:leagueId", component: OverviewComponent },
  { path: "fixtures", component: FixturesComponent },
  { path: "fixtures/:teamId:leagueId", component: FixturesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
