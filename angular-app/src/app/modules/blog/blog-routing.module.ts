import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { PostComponent } from './post/post.component';

const blogRoutes: Routes = [
  {
    path: 'blog',
    children: [
      {
        path: 'post/:id',
        component: PostComponent,
      },
      {
        path: 'category/:id',
        component: CategoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(blogRoutes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
