import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class ProvidersStorageProvider {

  constructor(private storage: Storage) { }

  async get<T>(key: string) : Promise<T> {
    if (await this.contains(key) === false) {
      return null;
    }
    var storage = await this.getStorage();
    return await storage.getItem(key) as T;
  }

  async set<T>(key: string, items: T){
    var storage = await this.getStorage();
    await storage.setItem(key, items);
  }

  async remove(key: string){
    if (await this.contains(key) === false) return;
    
    var storage = await this.getStorage();
    await storage.removeItem(key);
  }

  async clear(){
    var storage = await this.getStorage();
    await storage.clear();
  }

  private async contains(key: string) : Promise<Boolean> {
    var storage = await this.getStorage();
    var keys = await storage.keys();
    var index = keys.indexOf(key);
    if (index == -1) { return false; }
    return true;
  }

  private async getStorage() : Promise<LocalForage> {
    return await this.storage.ready();
  }

}
