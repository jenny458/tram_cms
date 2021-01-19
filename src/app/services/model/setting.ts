export class Setting{
    constructor(bonus?: number,
        bonus_time_start_hour?: number,
        bonus_time_start_minute?: number,
        bonus_time_end_hour?: number,
        bonus_time_end_minute?: number){
        this.bonus = bonus;
        this.bonus_time_start_hour = bonus_time_start_hour;
        this.bonus_time_start_minute = bonus_time_start_minute;
        this.bonus_time_end_hour = bonus_time_end_hour;
        this.bonus_time_end_minute = bonus_time_end_minute;
    }
    id?: string;
    bonus?: number;
    bonus_time_start_hour?: number;
    bonus_time_start_minute?: number;
    bonus_time_end_hour?: number;
    bonus_time_end_minute?: number;
}