import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() idModal;
  public showModal: boolean = false;

  constructor(private modalService: ModalService) { }

  public ngOnInit(): void {
    this.modalService.add(this); 
  }

  public ngOnDestroy(): void {
    this.modalService.remove(this.idModal);
  }

  public closeModal(id: string): void {
      this.modalService.close(id);
  }

  public closeModalOnClickOutside(evt, ctx): void {
    if(evt.target.className === 'modal-container'){
      this.closeModal(ctx.idModal);
    }
  }
}
