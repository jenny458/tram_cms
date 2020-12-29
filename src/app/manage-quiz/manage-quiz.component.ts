import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Quiz } from '../services/model/quiz';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-manage-quiz',
  templateUrl: './manage-quiz.component.html',
  styleUrls: ['./manage-quiz.component.scss']
})
export class ManageQuizComponent implements OnInit {

  quizList: Quiz[] = [];
  quizeHeader: string[] = [
    "ประเภทคำถาม", "คำถาม/ภาพคำถาม", "ประเภทตัวเลือก", "ตัวเลือกที่ 1", "ตัวเลือกที่ 2", "เฉลย", "เวลา", "คะแนน"
  ];
  quizeItem: string[] = [
    "type", "quiz", "choice_type", "choice_1", "choice_2", "answer", "timer", "point"
  ];

  isNew: boolean = false;
  isEdit: boolean = false;
  selectedTypeText: boolean = true;
  selectedChoiceTypeText: boolean = true;
  alertType: string = "";
  alertMessage: string = "";

  @ViewChild('target', { static: false })
  newTarget!: ElementRef;

  @ViewChild('alert', { static: false })
  alertTarget!: ElementRef;


  quiz!: Quiz;
  quizId!: string;


  constructor(
    private service: QuizService,
    private rout: Router,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.getQuizzes();
  }

  getQuizzes(): void {
    this.service.getAll().subscribe((res) => {
      this.quizList = res;
    });
  }

  create(): void {
    this.isNew = true;
    this.quiz = new Quiz();
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

  showChoiceTypeText(): void {
    this.selectedChoiceTypeText = true;
  }

  showChoiceTypePic(): void {
    this.selectedChoiceTypeText = false;
  }

  onSubmit(it: NgForm): void {
    if (this.isNew) {
      this.service.save(this.quiz).subscribe(
        (resp) => {
          this.onCancel();
          this.alertType = "success";
          this.alertMessage = "คุณเพิ่มคำถามใหม่สำเร็จแล้ว.";
          this.scoreToAlert();
        },
        (error) => {
          console.log('errro! ', error);
          this.alertType = "error";
          this.scoreToAlert();
        }
      );
    } else if (this.isEdit) {
      this.service.edit(this.quizId, this.quiz as Quiz).subscribe(
        (resp) => {
          this.onCancel();
          this.alertType = "success";
          this.alertMessage = "คุณได้ทำการแก้ไขคำถามสำเร็จแล้ว.";
          this.scoreToAlert();
        },
        (error) => {
          console.log('errro! ', error);
          this.alertType = "error";
          this.scoreToAlert();
        }
      );
    }

  }

  upload(folder: string, event: any): void {
    this.uploadService.upload(folder,event.target.files[0] as File)
      .subscribe(resp => {
        console.log(resp);
        if(folder == 'quiz'){
          this.quiz.quiz = resp['url'];
        }else if(folder == 'choice1'){
          this.quiz.choice_1 = resp['url'];
        }else if(folder == 'choice2'){
          this.quiz.choice_2 = resp['url'];
        }
      });
  }

  onClear(form: NgForm): void {
    form.resetForm();
    // this.quiz = new Quiz();
    // console.log('onclear', this.quiz);
  }

  onCancel(form?: NgForm): void {
    this.getQuizzes();
    this.isNew = false;
    this.isEdit = false;
    if (form) form.resetForm();
    this.quiz = new Quiz();
  }

  delete(id: string): void {
    this.service.delete(id).subscribe(
      (resp) => {
        this.onCancel();
        this.alertType = "success";
        this.alertMessage = "คุณได้ลบคำถามไปแล้ว.";
        this.scoreToAlert();
      },
      (error) => {
        console.log('errro! ', error);
        this.alertType = "error";
        this.scoreToAlert();
      }
    );
  }

  edit(id: string): void {
    this.quizId = id;
    this.service.get(id).subscribe(
      (resp) => {
        this.quiz = resp as Quiz;
        this.isEdit = true;
        if(this.quiz.type == 'รูปภาพ'){
          this.selectedTypeText = false;
        }else{
          this.selectedTypeText = true;
        }
        if(this.quiz.choice_type == 'รูปภาพ'){
          this.selectedChoiceTypeText = false;
        }else{
          this.selectedChoiceTypeText = true;
        }
        setTimeout(() => {
          this.newTarget.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      },
      (error) => {
        console.log('errro! ', error);
        this.alertType = "error";
        this.scoreToAlert();
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

  scoreToAlert(): void {
    setTimeout(() => {
      this.alertTarget.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

}
