import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersModule } from './modules/users/users.module';
import { AdminModule } from './modules/admin/admin.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './core/layout/layout.module';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { BlogModule } from './modules/blog/blog.module';
import { AccountModule } from './modules/account/account.module';
import { AccessDirective } from './core/directives';

@NgModule({
  declarations: [AppComponent, AccessDirective],
  imports: [
    AppRoutingModule,
    LayoutModule,
    CoreModule,
    BlogModule,
    UsersModule,
    AccountModule,
    AdminModule,
    MessageModule,
    MessagesModule,
    ToastModule,
  ],
  bootstrap: [AppComponent],
  exports: [AccessDirective],
})
export class AppModule {}
