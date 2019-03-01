import { Component, ViewChild, ElementRef } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NgxQRCodeComponent } from 'ngx-qrcode2';
import { ProvidersHistoryProvider } from '../../providers/providers-history/providers-history';
import { QrCodeHistory } from '../../models/history';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(NgxQRCodeComponent) element: NgxQRCodeComponent;

  qrData = null;
  createdCode = null;

  constructor(private socialSharing: SocialSharing, private historyService: ProvidersHistoryProvider) {}

  async createCode() {
    if (!this.qrData) return;

    this.createdCode = this.qrData;
    var history = <QrCodeHistory>{
      Text: this.qrData,
      Date: new Date()
    };
    await this.historyService.saveToHistory(history);
  }

  async share() {
    var imgSrc = await this.element.toDataURL();
    this.socialSharing.share("QR Code", "QR Code share", imgSrc.toString());
  }

}
