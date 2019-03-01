import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrcodereaderPage } from './qrcodereader';

@NgModule({
  declarations: [
    QrcodereaderPage,
  ],
  imports: [
    IonicPageModule.forChild(QrcodereaderPage),
  ],
})
export class QrcodereaderPageModule {}
