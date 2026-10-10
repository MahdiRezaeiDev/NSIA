 <div class="row">
        <div class="col-md-12 mt-5">
            <label> انتخاب روز های کاری</label>
        </div>
        <div class="col-md-2" ng-repeat="d in model.days">
            <button class="btn-default btn-border btn-block mt-3" ng-click="d.active=!d.active" type="button"> 
                    <i class="fas fa-check-square" style="color:green" ng-show="d.active"></i> 
                    <i class="fas fa-times-circle" style="color:red" ng-show="!d.active"></i> 
                    [[d.label]]
            </button>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 mt-5">
            <label> انتخاب اوقات کاری</label>
             
        </div>
        <div ng-repeat="(dayKey,day) in getActiveDays()"  class="col-md-12 mt-5" >
            <div class="card btn-border">
                <div class="card-body">
                    <h4 class="card-title">[[day.label]]</h4>
                    <button class="btn btn-secondary float-right" ng-show="dayKey!=0" ng-click="copyFromPreviousDay(dayKey)">کاپی اوقات از روز گذشته</button>
                    <div class="row">
                        <div class="col-md-4">
                            <label> آغاز فاصله زمانی</label>
                          
                            <select class="form-control" ng-model="day.slot.start">
                                <option ng-repeat="t in day.times" value="[[t.from_value]]"> [[t.from_label]] </label>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label> ختم فاصله زمانی</label>
                            <select class="form-control" ng-model="day.slot.end">
                                <option ng-repeat="t in day.times" value="[[t.to_value]]"> [[t.to_label]] </label>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label> تعداد وقت ملاقات</label>
                            <input type="number" class="form-control" ng-model="day.slot.number_of_appointments">
                        
                        </div>
                        
                        <div class="col-md-12 mt-5">
                            <button class="btn btn-primary btn-block" ng-click="addSlot(day)" type="button"> اضافه</button>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-md-12">
                        <button class="btn btn-warning pull-right mb-5" type="button" ng-show="day.slots.length > 0" ng-click="resetDayTimes(day)"> <i class="fas fa-undo"></i> انتخاب دوباره</button>
                            <ul class="list-group">
                                <li class="list-group-item btn-border" ng-repeat="s in day.slots">
                                      [[formatHour(s.start)]] الی  [[formatHour(s.end)]]   <span class="badge badge-primary float-right" style="font-size:130%"> [[s.number_of_appointments]]  ملاقات </span> 
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-3 mb-3">
        <div class="col-md-12">
            <label>تاریخ های رخصتی عمومی (هجری شمسی)</label>
           
        </div>
        <div class="col-md-3">
            <label> روز </label>
            <select class="form-control" ng-model="holiday.day">
                @foreach($days as $day)
                <option value="{{$day}}"> {{$day}} </option>
                @endforeach
            </select>
        </div>
        <div class="col-md-3">
            <label> ماه </label>
            <select class="form-control" ng-model="holiday.month">
                @foreach($months as $month)
                <option value="{{$month}}"> {{$month}} </option>
                @endforeach
            </select>
        </div>
        <div class="col-md-3">
            <label> سال </label>
            <select class="form-control" ng-model="holiday.year">
                @foreach($years as $year)
                <option value="{{$year}}"> {{$year}} </option>
                @endforeach
            </select>
        </div>
        <div class="col-md-3">
            <button class="btn btn-primary btn-block mt-3" ng-click="addPublicHoliday()" type="button"> اضافه</button>
        </div>

        <div class="col-md-12 mt-5">
            <ul class="list-group">
                <li class="list-group-item btn-border" ng-repeat="(k,dt) in model.public_holidays"> 
                    [[dt.day]] / [[dt.month]] / [[ dt.year]]
                    <button class="btn btn-danger float-right" ng-click="removePublicHoliday(k)" type="button">X</button>
                
                </li>
            </ul>
        </div>
    </div>