import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NgxQRCodeComponent } from 'ngx-qrcode2';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(NgxQRCodeComponent) element: NgxQRCodeComponent;

  qrData = null;
  createdCode = null;
  scannedCode = null;

  constructor(private barcodeScanner: BarcodeScanner, private socialSharing: SocialSharing) {

  }

  createCode() {
    this.createdCode = this.qrData;
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodedData => {
      this.scannedCode = barcodedData.text;
    });
  }

  async share() {
    var imgSrc = await this.element.toDataURL();
    this.socialSharing.share("QR Code", "QR Code share", imgSrc.toString());
  }

}
