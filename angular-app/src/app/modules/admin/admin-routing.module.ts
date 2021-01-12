import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { userRole } from 'src/app/core/enums';
import { AuthGuard } from 'src/app/core/guards';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { WorkboardComponent } from './workboard/workboard.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'workboard',
        component: WorkboardComponent,
        canActivate: [AuthGuard],
        data: { roles: [userRole.ADMIN, userRole.ROOT] },
      },
      {
        path: 'create-post',
        component: CreatePostComponent,
        canActivate: [AuthGuard],
        data: { roles: [userRole.ADMIN, userRole.ROOT] },
      },
      {
        path: 'create-category',
        component: CreateCategoryComponent,
        canActivate: [AuthGuard],
        data: { roles: [userRole.ADMIN, userRole.ROOT] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
