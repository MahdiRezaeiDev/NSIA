import {FormField} from "./FormField";
import {FieldOption} from "./FieldOption";
describe('TestIsVisible', () => {
    it('ShouldBeVisible', () => {
      let field=  new FormField('is_educated','زده کړه / سواد','radio',true,'',[
            new FieldOption("educated1",1,"هو/بلی"),
            new FieldOption("educated2",0,"نه/نخیر"),
        ]).setColumnWidth(2).setCondition('apply_for_new_id','بلی');
        
        expect(field.isVisible('بلی')).toBeTruthy();
        expect(field.isVisible('نخیر')).toBeFalsy();
      //  field.setCondition('')
      });
});