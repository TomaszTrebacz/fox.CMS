import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [BlogComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    DataViewModule,
    CardModule,
  ],
  exports: [BlogComponent],
})
export class BlogModule {}
