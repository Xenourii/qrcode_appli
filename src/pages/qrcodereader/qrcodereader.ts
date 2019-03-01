import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
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
    var options = <BarcodeScannerOptions> {
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
      prompt : "Place a QR Code inside the scan area", // Android
    }
    this.barcodeScanner.scan(options).then(barcodedData => {
      this.scannedCode = barcodedData.text;
    });
  }

}
