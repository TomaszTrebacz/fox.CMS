import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { WorkboardComponent } from './workboard/workboard.component';

@NgModule({
  declarations: [WorkboardComponent],
  imports: [CommonModule, AdminRoutingModule],
  exports: [WorkboardComponent],
})
export class AdminModule {}
