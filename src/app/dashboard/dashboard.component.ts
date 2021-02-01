import { Component, OnInit } from '@angular/core';
import { UserActivitiesService } from '../services/user-activities.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  advPieChart: {
    name: any;
    value: any;
  }[] = [];

  top: {
    full_name: any;
    point: any;
  }[] = [];

  users:{
    full_name: any;
    gender: any;
    email: any;
  }[] = [];

  hour:{
    name: string;
    series: {
      value: any,
      name: any
    }[];
  }[] = [];

  pieChart = [
    {
      "name": "ชาย",
      "value": 20
    },
    {
      "name": "หญิง",
      "value": 8
    }
  ];
  bubbleData =  [
    {
      "name": "15/01",
      "series": [
        {
          "name": "15/01",
          "x": "2010",
          "y": 80.3,
          "r": 80.4
        },
        {
          "name": "2000",
          "x": "2000",
          "y": 80.3,
          "r": 78
        },
        {
          "name": "1990",
          "x": "1990",
          "y": 75.4,
          "r": 79
        }
      ]
    },
    // {
    //   "name": "16/01",
    //   "series": [
    //     {
    //       "name": "16/01",
    //       "x": "2010",
    //       "y": 78.8,
    //       "r": 310
    //     },
    //     {
    //       "name": "2000",
    //       "x": "2000",
    //       "y": 76.9,
    //       "r": 283
    //     },
    //     {
    //       "name": "1990",
    //       "x": "1990",
    //       "y": 75.4,
    //       "r": 253
    //     }
    //   ]
    // },
    // {
    //   "name": "17/01",
    //   "series": [
    //     {
    //       "name": "2010",
    //       "x": "2010",
    //       "y": 81.4,
    //       "r": 63
    //     },
    //     {
    //       "name": "2000",
    //       "x": "2000",
    //       "y": 79.1,
    //       "r": 59.4
    //     },
    //     {
    //       "name": "1990",
    //       "x": "1990",
    //       "y": 77.2,
    //       "r": 56.9
    //     }
    //   ]
    // },
    // {
    //   "name": "18/01",
    //   "series": [
    //     {
    //       "name": "2010",
    //       "x": "2010",
    //       "y": 80.2,
    //       "r": 62.7
    //     },
    //     {
    //       "name": "2000",
    //       "x": "2000",
    //       "y": 77.8,
    //       "r": 58.9
    //     },
    //     {
    //       "name": "1990",
    //       "x": "1990",
    //       "y": 75.7,
    //       "r": 57.1
    //     }
    //   ]
    // },
    // {
    //   "name": "19/01",
    //   "series": [
    //     {
    //       "name": "2010",
    //       "x": "2010",
    //       "y": 80.2,
    //       "r": 62.7
    //     },
    //     {
    //       "name": "2000",
    //       "x": "2000",
    //       "y": 77.8,
    //       "r": 58.9
    //     },
    //     {
    //       "name": "1990",
    //       "x": "1990",
    //       "y": 75.7,
    //       "r": 57.1
    //     }
    //   ]
    // },
    // {
    //   "name": "20/01",
    //   "series": [
    //     {
    //       "name": "2010",
    //       "x": "2010",
    //       "y": 80.2,
    //       "r": 62.7
    //     },
    //     {
    //       "name": "2000",
    //       "x": "2000",
    //       "y": 77.8,
    //       "r": 58.9
    //     },
    //     {
    //       "name": "1990",
    //       "x": "1990",
    //       "y": 75.7,
    //       "r": 57.1
    //     }
    //   ]
    // }
  ];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  pieColorScheme = {
    domain: ['#647c8a', '#3f51b5', '#2196f3', '#00b862', '#afdf0a', '#a7b61a']
  };

  colorScheme = {
    domain: ["#71b2d0",
    "#d84d34",
    "#5cd460",
    "#7a40ce",
    "#a5de41",
    "#d051c2",
    "#d8c842",
    "#472776",
    "#bbdc85",
    "#7677d4",
    "#5a8b39",
    "#d94978",
    "#67d6b3",
    "#8d3a6e",
    "#c98433",
    "#576186",
    "#bda56a",
    "#382332",
    "#c3d1be",
    "#82352a",
    "#507b66",
    "#cca0cf",
    "#4f4b27",
    "#c4837e"]
  };

  hourMap = new Map<any, any>();

  constructor(
    private reportService: UserActivitiesService
  ) {
  }

  ngOnInit(): void {
    this.getCountByDate();
    this.getTop();
    this.getNewUser();
    this.getCountByHour();
  }

  getCountByHour(){
    this.reportService.countByHour().subscribe((res) => {
      if(res){
        this.reportService.getDateReport().subscribe((resp)=>{
          if(resp){
            res.forEach((el: any) => {
              this.hourMap.set(el._id.hour+"/"+el._id.day+"/"+el._id.month, el.count);
            });
            for(let i=0; i<24; i++){
              let series: { name:any, value: any}[] = [];
              resp.forEach((el: any) => {
                const row = {
                  name : el._id.month + " / " + el._id.day + " / " + el._id.year,
                  value : this.hourMap.get(i+"/"+el._id.day+"/"+el._id.month) ? this.hourMap.get(i+"/"+el._id.day+"/"+el._id.month) : 0
                };
                series.push(row);
              });
    
              const h = {
                name: i+".00-"+i+".59",
                series: series,
              }
              this.hour.push(h);
            }
          }
        });
      }
    });
  }

  getCountByDate(){
    this.reportService.countByDate().subscribe((res) => {
      if(res){
        res.forEach((el: any) => {
          const row = {
            name : el._id.month + " / " + el._id.day + " / " + el._id.year,
            value : el.count
          };
          this.advPieChart.push(row);
        });
      }
    });
  }

  getTop(){
    this.reportService.top10().subscribe((res) => {
      if(res){
        this.top = res;
      }
    });
  }

  getNewUser(){
    this.reportService.getNewUser().subscribe((res) => {
      if(res){
        this.users = res;
      }
    });
  }

  getGenderInThai(gender:string): string{
    return gender === "male" ? "ชาย" : "หญิง";
  }

}
