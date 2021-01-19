import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Advertize } from '../services/model/advertize';
import { AdvertizeService } from '../services/advertize.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-advertize',
  templateUrl: './manage-advertize.component.html',
  styleUrls: ['./manage-advertize.component.scss']
})
export class ManageAdvertizeComponent implements OnInit {

  list: Advertize[] = [];
  header: string[] = [
    "link", "วันที่เริ่มใช้โฆษณา", "สถานะ"
  ];
  item: string[] = [
    "url", "active_date", "active"
  ];

  isNew: boolean = false;
  isEdit: boolean = false;
  alertType: string = "";
  alertMessage: string = "";
  selectedDate: any = {};
  selectedTime: any = {
    "hour": 0,
    "minute": 0
  };

  @ViewChild('target', { static: false })
  newTarget!: ElementRef;

  @ViewChild('alert', { static: false })
  alertTarget!: ElementRef;


  adv!: Advertize;
  advId!: string;


  constructor(
    private service: AdvertizeService,
    private rout: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getAllAdvertise();
  }

  getAllAdvertise(): void {
    this.service.getAll().subscribe((res) => {
      this.list = res;
    });
  }

  create(): void {
    this.isNew = true;
    this.adv = new Advertize();
    setTimeout(() => {
      this.newTarget.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  onSubmit(it: NgForm): void {
    this.convertToDateFormat();
    if (this.isNew) {
      this.service.save(this.adv).subscribe(
        (resp) => {
          this.onCancel();
          this.alertType = "success";
          this.alertMessage = "คุณเพิ่มลิงค์โฆษณาใหม่สำเร็จแล้ว.";
          this.scrollToAlert();
        },
        (error) => {
          console.log('errro! ', error);
          this.alertType = "error";
          this.scrollToAlert();
        }
      );
    } else if (this.isEdit) {
      this.service.edit(this.advId, this.adv).subscribe(
        (resp) => {
          this.onCancel();
          this.alertType = "success";
          this.alertMessage = "คุณได้ทำการแก้ไขลิงค์โฆษณาสำเร็จแล้ว.";
          this.scrollToAlert();
        },
        (error) => {
          console.log('errro! ', error);
          this.alertType = "error";
          this.scrollToAlert();
        }
      );
    }

  }

  onClear(form: NgForm): void {
    form.resetForm();
  }

  onCancel(form?: NgForm): void {
    this.getAllAdvertise();
    this.isNew = false;
    this.isEdit = false;
    if (form) form.resetForm();
    this.adv = new Advertize();
  }

  delete(id: string): void {
    this.service.delete(id).subscribe(
      (resp) => {
        this.onCancel();
        this.alertType = "success";
        this.alertMessage = "คุณได้ลบลิ้งค์โฆษณาไปแล้ว.";
        this.scrollToAlert();
      },
      (error) => {
        console.log('errro! ', error);
        this.alertType = "error";
        this.scrollToAlert();
      }
    );
  }

  edit(id: string): void {
    this.advId = id;
    this.service.get(id).subscribe(
      (resp) => {
        this.adv = resp as Advertize;
        this.transformDate();
        this.isEdit = true;
        setTimeout(() => {
          this.newTarget.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      },
      (error) => {
        console.log('errro! ', error);
        this.alertType = "error";
        this.scrollToAlert();
      }
    );
  }

  transformDate(){
    const date: any = this.datePipe.transform(this.adv.active_date, "yyyy-MM-dd");
    const dateStr: string[] = date.split('-');
    this.selectedDate = {
      year: parseInt(dateStr[0]),
      month: parseInt(dateStr[1]),
      day: parseInt(dateStr[2])
    };
  }

  convertToDateFormat(){
    this.adv.active_date = new Date(this.selectedDate['year']+'-'+this.selectedDate['month']+'-'+this.selectedDate['day']);
  }

  view(id: string): void {
    // console.log("view from manage-quiz.component", id);
    // this.service.delete(id).subscribe(
    //   (resp)=>{
    //       this.onCancel();
    //       this.saveSuccess = true;
    //   },
    //   (error)=>{
    //       console.log('errro! ', error);
    //       this.saveError = true;
    //       setTimeout(()=>{ 
    //         this.errorTarget.nativeElement.scrollIntoView({behavior: 'smooth'});
    //       },0); 
    //   }
    // );
  }

  scrollToAlert(): void {
    if(this.alertTarget && this.alertTarget.nativeElement){
      setTimeout(() => {
        this.alertTarget.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  }

}
