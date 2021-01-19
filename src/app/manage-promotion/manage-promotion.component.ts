import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Promotion } from '../services/model/promotion';
import { PromotionService } from '../services/promotion.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-manage-promotion',
  templateUrl: './manage-promotion.component.html',
  styleUrls: ['./manage-promotion.component.scss']
})
export class ManagePromotionComponent implements OnInit {

  list: Promotion[] = [];
  header: string[] = [
    "โปรโมชั่น", "ประเภทโปรโมชั่น", "สถานะ"
  ];
  item: string[] = [
    "detail", "detail_type", "active"
  ];

  isNew: boolean = false;
  isEdit: boolean = false;
  selectedTypeText: boolean = true;
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


  pro!: Promotion;
  proId!: string;


  constructor(
    private service: PromotionService,
    private rout: Router,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.getAllPromotion();
  }

  getAllPromotion(): void {
    this.service.getAll().subscribe((res) => {
      this.list = res;
    });
  }

  create(): void {
    this.isNew = true;
    this.pro = new Promotion();
    setTimeout(() => {
      this.newTarget.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  showTypeText(): void {
    this.selectedTypeText = true;
  }

  showTypePic(): void {
    this.selectedTypeText = false;
  }

  onSubmit(it: NgForm): void {
    if (this.isNew) {
      this.service.save(this.pro).subscribe(
        (resp) => {
          this.onCancel();
          this.alertType = "success";
          this.alertMessage = "คุณเพิ่มโปรโมชั่นใหม่สำเร็จแล้ว.";
          this.scrollToAlert();
        },
        (error) => {
          console.log('errro! ', error);
          this.alertType = "error";
          this.scrollToAlert();
        }
      );
    } else if (this.isEdit) {
      this.service.edit(this.proId, this.pro).subscribe(
        (resp) => {
          this.onCancel();
          this.alertType = "success";
          this.alertMessage = "คุณได้ทำการแก้ไขโปรโมชั่นสำเร็จแล้ว.";
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
    this.getAllPromotion();
    this.isNew = false;
    this.isEdit = false;
    if (form) form.resetForm();
    this.pro = new Promotion();
  }

  delete(id: string): void {
    this.service.delete(id).subscribe(
      (resp) => {
        this.onCancel();
        this.alertType = "success";
        this.alertMessage = "คุณได้ลบโปรโมชั่นไปแล้ว.";
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
    this.proId = id;
    this.service.get(id).subscribe(
      (resp) => {
        this.pro = resp as Promotion;
        this.isEdit = true;
        if(this.pro.detail_type == 'รูปภาพ'){
          this.selectedTypeText = false;
        }else{
          this.selectedTypeText = true;
        }
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

  upload(event: any): void {
    this.uploadService.upload('promotion',event.target.files[0] as File)
      .subscribe(resp => {
        this.pro.detail = resp['url'];
      });
  }

}
