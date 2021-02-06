import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgForm } from '@angular/forms';
import { SettingService } from '../services/setting.service';
import { Setting } from '../services/model/setting';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  timeStart:any = {};
  timeEnd:any = {};
  point:number | undefined;
  settingId: string | undefined;
  firstSetting = true;
  alertType: string = "";
  alertMessage: string = "";

  title = 'my-drag-drop';
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi'
  ];

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  constructor(private service: SettingService) { }

  ngOnInit(): void {
    this.service.getAll().subscribe((result: Setting[])=> {
      if(result && result.length > 0){
        this.settingId = result[0].id;
        this.firstSetting = false;
        this.timeStart = {hour: result[0].bonus_time_start_hour, minute: result[0].bonus_time_start_minute};
        this.timeEnd = { hour: result[0].bonus_time_end_hour, minute: result[0].bonus_time_end_minute};
        this.point = result[0].bonus;
      }else{
        this.timeStart = {hour: 12, minute: 0};
        this.timeEnd = {hour: 12, minute: 0};
        this.point = 10;
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex)
    } else {
      moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    }
  }

  onSubmit(it: NgForm): void {
    const setting = new Setting(this.point, this.timeStart.hour, this.timeStart.minute, this.timeEnd.hour, this.timeEnd.minute);
      if(this.firstSetting){
        this.service.save(setting).subscribe((result: Setting)=> {
            this.settingId = result.id;
            this.firstSetting = false;
            this.alertType = "success";
            this.alertMessage = "บันทึกการเปลี่ยนแปลงตั้งค่าสำเร็จ.";
          }
        );
      }else{
        this.service.edit(this.settingId!, setting).subscribe(
          (result: Setting)=> {
            this.settingId = result.id;
            this.alertType = "success";
            this.alertMessage = "บันทึกการเปลี่ยนแปลงตั้งค่าสำเร็จ.";
          },
          (error) => {
            console.log('errro! ', error);
            this.alertType = "error";
          }
      );
      }
  }
}
