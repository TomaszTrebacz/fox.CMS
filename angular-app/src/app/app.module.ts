import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { BlogModule } from './modules/blog/blog/blog.module';
import { UsersModule } from './modules/users/users.module';
import { AdminModule } from './modules/admin/admin.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './core/layout/layout.module';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    AppRoutingModule,
    LayoutModule,
    CoreModule,
    BlogModule,
    UsersModule,
    AdminModule,
    MessageModule,
    MessagesModule,
    ToastModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
