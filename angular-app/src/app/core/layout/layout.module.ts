import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MenuComponent } from './menu/menu.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TabMenuModule } from 'primeng/tabmenu';
import { TopComponent } from './top/top.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SharedModule } from 'src/app/shared/shared.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [FooterComponent, MenuComponent, TopComponent],
  imports: [
    CommonModule,
    MenuModule,
    MenubarModule,
    ButtonModule,
    RippleModule,
    TabMenuModule,
    SplitButtonModule,
    SharedModule,
  ],
  exports: [FooterComponent, MenuComponent, TopComponent],
})
export class LayoutModule {}
