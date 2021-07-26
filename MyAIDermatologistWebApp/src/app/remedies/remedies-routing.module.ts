import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemediesPage } from './remedies.page';

const routes: Routes = [
  {
    path: '',
    component: RemediesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemediesPageRoutingModule {}
