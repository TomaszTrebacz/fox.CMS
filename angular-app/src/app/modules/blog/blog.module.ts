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
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [BlogComponent, PostComponent, CategoryComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    DataViewModule,
    CardModule,
    PanelModule,
    ButtonModule,
  ],
  exports: [BlogComponent, PostComponent, CategoryComponent],
})
export class BlogModule {}
