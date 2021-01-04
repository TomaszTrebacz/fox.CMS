import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../modules/header/header.component';
import { FooterComponent } from '../../modules/footer/footer.component';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, MenuModule, MenubarModule],
  exports: [HeaderComponent, FooterComponent],
})
export class LayoutModule {}
