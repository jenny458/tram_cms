import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {

  @Input()
  message!: string | "";

  @Input()
  type!: string | "";

  constructor() { }

  ngOnInit(): void {
  }

  showSuccess(): boolean{
    return (this.type && this.type == 'success') ? true : false;
  }

  showError(type: string): boolean{
    return (this.type && this.type == 'error') ? true : false;
  }

  resetAlert(): void{
    this.type = "";
    this.message = "";
  }

}
