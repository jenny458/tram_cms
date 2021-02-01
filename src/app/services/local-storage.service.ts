import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
// key that is used to access the data in local storageconst STORAGE_KEY = 'local_todolist';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  anotherTodolist = [];
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
     public storeOnLocalStorage(isLogin: boolean): void {
          this.storage.set("isLogin", isLogin);
          this.storage.set("timestamp", new Date().getTime());
     }

    public getOnLocalStorage(): boolean {
      return this.storage.get("isLogin");
    }

    public getOnLocalTimeStampStorage(): number {
      return this.storage.get("timestamp");
    }
}
