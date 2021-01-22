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
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ChangeCategoryComponent } from './change-category/change-category.component';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ManageUsersComponent } from './manage-users/manage-users.component';

@NgModule({
  declarations: [
    WorkboardComponent,
    CreatePostComponent,
    CreateCategoryComponent,
    EditPostComponent,
    EditCategoryComponent,
    ChangeCategoryComponent,
    ManageUsersComponent,
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
    FileUploadModule,
    HttpClientModule,
    TableModule,
  ],
  exports: [WorkboardComponent],
})
export class AdminModule {}
