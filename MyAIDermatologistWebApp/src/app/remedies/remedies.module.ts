import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemediesPageRoutingModule } from './remedies-routing.module';

import { RemediesPage } from './remedies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemediesPageRoutingModule
  ],
  declarations: [RemediesPage]
})
export class RemediesPageModule {}
