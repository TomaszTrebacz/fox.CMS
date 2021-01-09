import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogComponent } from './blog/blog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { PostComponent } from './post/post.component';
import { BlogRoutingModule } from './blog-routing.module';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [BlogComponent, PostComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    DataViewModule,
    CardModule,
    PanelModule,
    ButtonModule,
  ],
  exports: [BlogComponent, PostComponent],
})
export class BlogModule {}
