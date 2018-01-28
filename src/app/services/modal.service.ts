import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {

  constructor() { }

  private _modals: any[] = [];

  public add(modal: any): void {
      this._modals.push(modal);
  }

  public remove(id: string) {
      let modal = this.findModal(id);
      let removeIndex = this._modals
                          .map(modal => modal.idModal)
                          .indexOf(id);
      this._modals.splice(removeIndex, 1);
  }

  public open(id: string): void  {
    let modal = this.findModal(id);
    modal.showModal = true;
  }

  public close(id: string): void {
    let modal = this.findModal(id);
    modal.showModal = false;
  }

  public findModal(idModal): any {
      return this._modals.find( obj => obj.idModal === idModal);
  }

}
