import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { WorkboardComponent } from './workboard/workboard.component';
import { FieldsetModule } from 'primeng/fieldset';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreatePostComponent } from './create-post/create-post.component';
import { DividerModule } from 'primeng/divider';
import { EditorModule } from 'primeng/editor';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditPostComponent } from './edit-post/edit-post.component';

@NgModule({
  declarations: [
    WorkboardComponent,
    CreatePostComponent,
    CreateCategoryComponent,
    EditPostComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FieldsetModule,
    DividerModule,
    EditorModule,
    TabViewModule,
    DropdownModule,
  ],
  exports: [WorkboardComponent],
})
export class AdminModule {}
