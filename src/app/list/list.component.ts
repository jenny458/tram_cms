import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AdvertizeService } from '../services/advertize.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input()
  list!: any[] | [];
  @Input()
  header!: string[] | [];
  @Input()
  showItem!: string[] | [];
  @Input()
  isDrag!: boolean | false;

  @Output() 
  deleteEvent:EventEmitter<string> =new EventEmitter();
  @Output() 
  editEvent:EventEmitter<string> =new EventEmitter();
  @Output() 
  viewEvent:EventEmitter<string> =new EventEmitter();

  imagePath!: string;

  constructor(
    private modalService: NgbModal,
    private service: AdvertizeService
  ) { }

  ngOnInit(): void {
  }

  delete(id: string): void{
    this.deleteEvent.emit(id);
  }

  edit(id: string): void{
    this.editEvent.emit(id);
  }

  view(id: string): void{
    this.viewEvent.emit(id);
  }

  open(content:any, id: string) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        this.deleteEvent.emit(id);
      }, 
      (reason) => {
      }
    );
  }

  openModal(content:any, path: string) {
    this.imagePath = path;
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  isPic(column: string, file: any): boolean{
    if(file && (column == 'quiz_pic' || column == 'choice_1' || column == 'choice_2' || column == 'detail') ){
      return file.startsWith('/quiz') || file.startsWith('/choice1') || file.startsWith('/choice2') || ( column == 'detail' && file.startsWith('/promotion') );
    }else{
      return false;
    }
  }

  isUrl(column: string, file: any): boolean {
    if(file){
      return column == 'url' || ( column == 'detail' && file.startsWith('http'));
    }else{
      return false;
    }
    
  }

  onDrop(event: CdkDragDrop<string[]>) {
    console.log(this.isDrag);
    if(this.isDrag){
      moveItemInArray(this.list, event.previousIndex, event.currentIndex);
      this.list.forEach((item, idx) => {
        item.ordering = idx + 1;
      });
      this.service.updateAll(this.list).subscribe(
        ()=>{
        },
        ()=>{
        }
      )
    }
    
  }
}
