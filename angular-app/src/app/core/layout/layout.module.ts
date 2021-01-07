import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../modules/footer/footer.component';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MenuComponent } from './menu/menu.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TabMenuModule } from 'primeng/tabmenu';
import { TopComponent } from './top/top.component';

@NgModule({
  declarations: [FooterComponent, MenuComponent, TopComponent],
  imports: [
    CommonModule,
    MenuModule,
    MenubarModule,
    ButtonModule,
    RippleModule,
    TabMenuModule,
  ],
  exports: [FooterComponent, MenuComponent, TopComponent],
})
export class LayoutModule {}
