import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

@Injectable()

export class DariCalender implements NgbDatepickerI18n{
  getDayNumerals(date: NgbDateStruct): string {
      return date.day.toString(); 
  }
  getWeekNumerals(weekNumber: number): string {
    return weekNumber.toString();
  }
  getYearNumerals(year: number): string {
    return year.toString();
  }
  getWeekdayShortName(weekday:number){
      console.log("Week day",weekday);
    switch (weekday) {
      case 1:
        return 'د';
        break;
      case 2:
        return 'س';
        break;

      case 3:
          return 'چ';
          break;

      case 4:
            return 'پ';
            break;
      case 5:
            return 'ج';
            break; 
    case 6:
            return 'ش';
            break; 

    case 7:
            return 'ی';
            break; 
      default:
        break;
    }
  }
  getMonthShortName(month:number){
    switch (month) {
      case 1:
          return 'حمل';
       break;  
      case 2:
        return 'ثور';
      break; 
      case 3:
          return 'جوزا';
       break;  
      case 4:
        return 'سرطان';
      break; 

      case 5:
          return 'اسد';
       break;  
      case 6:
        return 'سنبله';
      break; 
      case 7:
        return 'میزان';
      break; 
      case 8:
        return 'عقرب';
      break; 
      case 9:
        return 'قوس';
      break; 
      case 10:
        return 'جدی';
      break; 
      case 11:
        return 'دلو';
      break; 
      case 12:
        return 'حوت';
      break; 
    
      default:
        break;
    }
    return '';
  }
  getMonthFullName(month:number){
    return 'abc';
  }
  getDayAriaLabel(date: NgbDateStruct){
    return 'abc';
  }
}
