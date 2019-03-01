import { ProvidersHistoryProvider } from './../../providers/providers-history/providers-history';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QrCodeHistory } from '../../models/history';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  createdCode = null;
  histories: QrCodeHistory[];

  constructor(public navCtrl: NavController, private historyService: ProvidersHistoryProvider) { }

  async ionViewWillEnter(){
    await this.getHistories();
  }

  onHistoryClick(history: QrCodeHistory){
    console.log(history);
    this.createdCode = history.Text;
  }

  async cleanHistory(){
    await this.historyService.clear();
    await this.getHistories();
  }

  private async getHistories(){
    this.histories = await  this.historyService.getHistories();
  }

}
