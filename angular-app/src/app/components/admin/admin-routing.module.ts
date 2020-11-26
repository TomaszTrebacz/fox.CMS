import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/helpers/auth.guard';
import { userRole } from 'src/app/models/userRole.interface';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
