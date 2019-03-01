import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-qrcodereader',
  templateUrl: 'qrcodereader.html',
})
export class QrcodereaderPage {
  
  scannedCode = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodereaderPage');
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodedData => {
      this.scannedCode = barcodedData.text;
    });
  }

}
