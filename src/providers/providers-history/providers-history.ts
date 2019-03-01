import { ProvidersStorageProvider } from './../providers-storage/providers-storage';

import { Injectable } from '@angular/core';
import { QrCodeHistory } from '../../models/history';

const historyKey: string = "historyKey";

@Injectable()
export class ProvidersHistoryProvider {

  constructor(private storage: ProvidersStorageProvider) {}

  async saveToHistory(history: QrCodeHistory) {
    try {
      var histories = await this.getHistories();
      if (histories != null && !this.isHistoryIncluedIn(history, histories)) {
        histories.push(history);
      }
      else {
        histories = [history];
      }

      await this.storage.set(historyKey, histories);
    } catch (error) {
      console.log(error);
    }
  }

  async removeFromHistory(history: QrCodeHistory) {
    try {
      var histories = await this.getHistories();
      if (histories === null){
        console.log("Try to remove qr code history" + history.Text + ", but no one is stored.");
        return;
      };

      histories = histories.filter(e => e.Text != history.Text);
      await this.storage.set(historyKey, histories);

    } catch (error) {
      console.log(error);
    }
  }

  async getHistories() : Promise<QrCodeHistory[]>{
    try {
      return await this.storage.get<QrCodeHistory[]>(historyKey);
    } catch (error) {
      console.log("QR Code History error =" + error);
    }
  }

  async isHistoryAlreadyStored(history: QrCodeHistory) : Promise<boolean> {
    try {
      var bookmarkedMedias = await this.storage.get<QrCodeHistory[]>(historyKey);
      console.log(bookmarkedMedias);
      console.log(this.isHistoryIncluedIn(history, bookmarkedMedias));
      return this.isHistoryIncluedIn(history, bookmarkedMedias);
    } catch (error) {
      console.log(error);
    }
  }

  private isHistoryIncluedIn(history: QrCodeHistory, histories: QrCodeHistory[]) : boolean {
    for (let i in histories) {
      if (histories[i].Text == history.Text) {
        return true;
      }
    }
    return false;
  }

}
