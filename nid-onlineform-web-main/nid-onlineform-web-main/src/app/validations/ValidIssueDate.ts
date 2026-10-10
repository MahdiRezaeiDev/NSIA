import { AbstractControl,ValidatorFn ,FormGroup,ValidationErrors} from "@angular/forms";
import * as moment from 'moment';
export const ValidIssueDateValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
      if (!String.prototype.padStart) {
            String.prototype.padStart = function padStart(targetLength,padString) {
                targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
                padString = String((typeof padString !== 'undefined' ? padString : ' '));
                if (this.length > targetLength) {
                    return String(this);
                }
                else {
                    targetLength = targetLength-this.length;
                    if (targetLength > padString.length) {
                        padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
                    }
                    return padString.slice(0,targetLength) + String(this);
                }
            };
        }
      let dayControl = control.get('birthday_day');
      if(!dayControl){
            return;
      }
      let day ="";
      if(dayControl){
            day = dayControl.value.toString();
  
            day = day.padStart(2,'0');
      }
      let monthControl = control.get('birthday_month')
      let month="";
      if(monthControl){
            month = monthControl.value.toString();
            month = month.padStart(2,'0');
      }
        
    

      let issueDayControl = control.get('id_issue_date_day');
      let issueDay="";

      if(issueDayControl && issueDayControl.value!=null){
            issueDay = issueDayControl.value.toString();
            issueDay = issueDay.padStart(2,'0')
      }

      let issueMonthControl = control.get('id_issue_date_month');
      let issueMonth="";
      if(issueMonthControl && issueMonthControl.value!=null){
            issueMonth = issueMonthControl.value.toString();
            issueMonth = issueMonth.padStart(2,'0')
      }
      let issueYearControl =control.get('id_issue_date_year');
      let result = false;
      if(issueYearControl && issueYearControl.value!=null){
            const birthday              = control.get('birthday_year').value+month+day;
            const paper_id_issueDate    = issueYearControl.value+issueMonth+issueDay;

       
          if(birthday.length == 8 && paper_id_issueDate.length == 8){
        
                let birthDate = moment(birthday, "YYYYMMDD");
                let issueDate = moment(paper_id_issueDate, "YYYYMMDD");
                result = issueDate < birthDate;
          }
      }
    return result ? { 'ValidIssueDate': true } : null;
  };