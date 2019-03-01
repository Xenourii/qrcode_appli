import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import jsqrcode from 'jsqrcode';

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
      showFlipCameraButton: true,
      showTorchButton: true,
      prompt : "Place a QR Code inside the scan area",
    }
    this.barcodeScanner.scan(options).then(barcodedData => {
      this.scannedCode = barcodedData.text;
    });
  }

  onInputImage(event){
    var file = event.target.files[0] as File;
    this.readQrCodeFromFile(file);

  }

  private readQrCodeFromFile(file: File){
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      var imgData = e.target.result;
      var jsqr = new jsqrcode();
      var image = new Image()
      image.onload = () => {
      var result;
      try{
        result = jsqr.decode(image);
        this.scannedCode = result;
      }catch(e){
        console.log('unable to read qr code');
      }
    }
    image.src = imgData;
    }
  }
}
