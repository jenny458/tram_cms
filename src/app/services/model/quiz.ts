export class Quiz {
    constructor(){
        this.type = "ข้อความ";
        this.quiz = "";
        this.quiz_pic = "";
        this.choice_type = "ข้อความ";
        this.choice_1 = "";
        this.choice_2 = "";
        this.answer = "1";
        this.timer = 30;
        this.point = 1;
    }
    type: string; //ประเภทคำถาม
    quiz: string; //คำถาม text or path image
    quiz_pic: string;
    choice_type: string; // ประเภทคำตอบ
    choice_1: string; // ช้อย1 text or path image
    choice_2: string;// ช้อย2 text or path image
    answer: string; // คำตอบ
    timer: number;// เวลา
    point: number;// คะแนน
}
  