var app = angular.module(
    "MainApp",
    [
        "ui.grid",
        "ui.grid.selection",
        "ui.grid.pagination",
        "ui.grid.resizeColumns",
        "ui.grid.grouping"
    ],
    function($interpolateProvider) {
        $interpolateProvider.startSymbol("[[");
        $interpolateProvider.endSymbol("]]");
    }
);

app.controller("DashboardCtrl", function($scope) {});
app.controller("ApplicationsCtrl", function(
    $scope,
    $http,
    $window,
    NoteService,
    uiGridGroupingConstants,
    uiGridTreeBaseConstants
) {

    $window.onbeforeunload = function(){
        var isApplicationView=window.location.href.indexOf('viewIndividualApplication')!=-1;
        $scope.closeApplication();
        return null;
    }
    $scope.closeApplication=function(){
        $http.get("/applicationViewClosed?reference_no="+$scope.application_reference_no).then(function(res){

        },function(){
           //alert('Can not close');
        });
    }
    var paginationOptions = {
        pageNumber: 1,
        pageSize: 50,
        sort: null
    };
    $scope.limit = 50;
    $scope.page = 1;
    $scope.rm_individual_application_no = "";
    $scope.appointmentDate = {};
    $scope.tableOptions = {
        enableSorting: false,
        enableFiltering: false,
        showGridFooter: true,
        showColumnFooter: true,
        paginationPageSizes: [100, 500, 1000, 5000],

        onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.pagination.on.paginationChanged(null, function(
                newPage,
                pageSize
            ) {
                paginationOptions.pageNumber = newPage;
                paginationOptions.pageSize = pageSize;
                paginationOptions.pageNumber = newPage;
                paginationOptions.pageSize = pageSize;
                $scope.getIndividualApplications({
                    status: $scope.status,
                    limit: pageSize,
                    page: newPage
                });
            });

            $scope.gridApi.core.on.filterChanged($scope, function() {
                var grid = this.grid;
                var q = grid.columns[1].filters[0].term;
                $scope.getIndividualApplications({
                    status: $scope.status,
                    limit: paginationOptions.pageSize,
                    page: paginationOptions.pageNumber,
                    q: q
                });
            });

            $scope.gridApi.core.on.columnVisibilityChanged($scope, function(
                changedColumn
            ) {
                $scope.columnChanged = {
                    name: changedColumn.colDef.name,
                    visible: changedColumn.colDef.visible
                };
            });
        },
        enableRowSelection: true,
        enableSelectAll: true,
        selectionRowHeaderWidth: 35,
        enableRowHeaderSelection: true,
        multiSelect: true,

        enableCellEditOnFocus: true,
        enableGridMenu: true,
        useExternalPagination: true,
        columnDefs: [
            {
                field: "family_form_reference_no",

                displayName: "نمبر درخواست فامیلی",
                visible: true
            },
            {
                field: "name",
                displayName: "نام رئیس فامیل",
                visible: true,
                cellTemplate:
                    "<div>[[row.treeNode.children[0].row.entity.name]] [[row.entity.name]]</div>"
            },
            {
                field: "center_name",
                displayName: "مرکز",
                visible: true
            },
            {
                field: "appointment_date",
                displayName: "تاریخ ملاقات",
                visible: true,
                cellTemplate:
                    "<div>[[row.treeNode.children[0].row.entity.appointment_date]] [[row.entity.appointment_date]]</div>"
            },
            {
                field: "queue_no",
                displayName: "نوبت",
                visible: true,
                cellTemplate:
                    "<div>[[row.treeNode.children[0].row.entity.queue_no]] [[row.entity.queue_no]]</div>"
            },
            {
                field: "total_applicants",
                displayName: "تعداد",
                visible: true
            },

            {
                field: "reference_no",
                displayName: "",
                enableFiltering: false,
                cellTemplate:
                    '<div class="btn-group" ><a  href="/viewIndividualApplication?reference_no=[[COL_FIELD]]"  class="btn btn-outline-primary"> معلومات بیشتر  </a><strong ng-if="row.entity.opened==1"> زیر کار [[row.entity.opened_by]] </strong> </div>   '
            }
        ],
        rowHeight: "50px",
        data: []
    };
    // $scope.USER_ID = USER_ID;
   
 
    window.Echo.channel('nsia_database_private-applications')
    .listen('.opened', function (data) {
        $scope.toggleOpenedStatus(true,data);
    
    })
    .listen('.closed', function (data) {
        $scope.toggleOpenedStatus(false,data);
      
    })
   
   

    $scope.toggleOpenedStatus=function(status,data){
        for(var i=0;i< $scope.tableOptions.data.length;i++){
            var row= $scope.tableOptions.data[i];
           
                console.log('row comparision',row.reference_no,'==', data.application.reference_no);
                if(row.reference_no == data.application.reference_no){
                  
                    $scope.tableOptions.data[i].opened=status;

                    $scope.tableOptions.data[i].opened_by=data.application.username;
                    $scope.tableOptions.data[i].opened_by_user_id=data.application.user_id;
                    if(status == false){
                        $scope.tableOptions.data[i].opened_by="";
                        $scope.tableOptions.data[i].opened_by_user_id=0;
                    }
                    $scope.gridApi.core.refresh();

                }
            

        }
    }
    
    $scope.getIndividualApplications = function(queries) {
        for (q in queries) {
            $scope[q] = queries[q];
        }
        var appointmentDate = $scope.appointmentDate;
        if ($scope.searchQuery && $scope.searchQuery.length > 0) {
            appointmentDate.enabled = false;
        }
        var searchQuery = {
            status: $scope.status,
            center_id: $scope.center_id,
            q: $scope.searchQuery,
            limit: $scope.limit,
            page: $scope.page
        };
        if (
            appointmentDate.hasOwnProperty("enabled") &&
            appointmentDate.enabled
        ) {
            searchQuery["appointment_year"] = appointmentDate.year;
            searchQuery["appointment_month"] = appointmentDate.month;
            searchQuery["appointment_day"] = appointmentDate.day;
        }

        $http
            .get("/getIndividualApplications", { params: searchQuery })
            .then(function(res) {
                $scope.appointmentDate = res.data.appointmentDate;
                $scope.tableOptions.totalItems = parseFloat(
                    res.data.applications.total
                );
                $scope.tableOptions.pageSize = parseFloat(
                    res.data.applications.total
                );
                $scope.tableOptions.data = res.data.applications.data;

                console.log("totalitems", $scope.tableOptions.totalItems);
            })
            .catch(function() {
                alert("یک مشکل رخ داد. لطفاً دوباره کوشش کنید.");
            });
    };

    $scope.search = function() {
        $scope.getIndividualApplications({
            status: $scope.status,
            limit: 50,
            page: 1,
            q: $scope.searchQuery
        });
    };

    $scope.setRadioValues = function(oldData) {
        $scope.oldData = oldData;

        console.log("SETTING OLD DATA", oldData);
        $scope.military_service = oldData.military_service;
        $scope.is_educated = oldData.is_educated;
        $scope.is_kochi = oldData.is_kochi;
        $scope.disability_type = oldData.disability_type;
        $scope.gender = oldData.gender;
        $scope.has_second_citizenship = oldData.has_second_citizenship;
        // $scope.$apply();
    };

    $scope.cancelApplication = function(reference_no) {
        var con = confirm("آیا شما مطمین هستید که این درخواستی را لغوه کنید؟");

        if (con) {
            $http
                .get(
                    "/moveApplicationToNextStep?type=individual&reference_no=" +
                        reference_no +
                        "&status=13"
                )
                .then(function() {
                    $window.location.reload();
                });
        }
    };

    $scope.tab = 1;
    $scope.rm_application_no_1 = "";
    $scope.rm_application_no_2 = "";
    $scope.rm_application_no_3 = "";
    $scope.isValidIdNumber = function() {
        if ($scope.rm_application_no_1.length != 4) {
            return false;
        }
        if ($scope.rm_application_no_2.length != 4) {
            return false;
        }
        if ($scope.rm_application_no_3.length != 5) {
            return false;
        }

        if (
            isNaN(parseFloat($scope.rm_application_no_1)) == false &&
            isNaN(parseFloat($scope.rm_application_no_2)) == false &&
            isNaN(parseFloat($scope.rm_application_no_3)) == false
        ) {
            return true;
        }

        return false;
    };
    $scope.getRmApplicationId = function() {
        if ($scope.isValidIdNumber()) {
            return (
                $scope.rm_application_no_1 +
                $scope.rm_application_no_2 +
                $scope.rm_application_no_3
            );
        }
        return "";
    };
    $scope.familyFormMappedFields = {
        head_of_family_name: "givNm",
        head_of_family_surname: "surnm",
        fathername: "fthrGivNm",
        father_surname: "fthrNm",
        grand_father_name: "gfthrGivNm",
        grand_father_surname: "gfthrNm",
        current_residence: "",
        original_residence: ""
    };

    $scope.copyToClipboard = function(family, members) {
        $scope.fillFamilyForm(family, members);
    };
    $scope.fillFamilyForm = function(data, members) {
        console.log("data", data);
        var script =
            "function setValue(id,value){var e = document.getElementById(id);e.value = value;}";
        for (f in $scope.familyFormMappedFields) {
            console.log("field", f);
            var rmFieldId = $scope.familyFormMappedFields[f];
            var rmFieldValue = data[f];
            if (f == "original_residence") {
                console.log("RM FIELD VALUE ORIGINAL", rmFieldValue);
                script +=
                    "setValue('pmntAdCdNm','" +
                    rmFieldValue.province +
                    "/" +
                    rmFieldValue.district +
                    "');setValue('pmntAdDtlCt','" +
                    rmFieldValue.village +
                    "');setValue('pmntAdCd','" +
                    rmFieldValue.district_code +
                    "');";
            } else if (f == "current_residence") {
                console.log("RM FIELD VALUE CURRENT", rmFieldValue);
                script +=
                    "setValue('curtAdCdNm','" +
                    rmFieldValue.province +
                    "/" +
                    rmFieldValue.district +
                    "');setValue('curtAdDtlCtD','" +
                    rmFieldValue.village +
                    "');setValue('curtAdCd','" +
                    rmFieldValue.district_code +
                    "');";
            } else {
                script =
                    script +
                    "setValue('" +
                    rmFieldId +
                    "','" +
                    rmFieldValue +
                    "');";
            }
        }
        for (var i = 0; i < members.length; i++) {
            var m = members[i];
            console.log("member", m);
            var member = new RM_MEMBER(m, i);
            script =
                script +
                ";fn_set_iptDat(" +
                JSON.stringify(member.data) +
                ",[])";
        }

        console.log("script", script);
        /*
        $window.navigator.clipboard.writeText(script).then(function() {
            console.log('Async: Copying to clipboard was successful!');
            alert('معلومات کاپی شد. لطفا در سیستم آرم پیست کنید!');
            }, function(err) {
            console.error('Async: Could not copy text: ', err);
            });
        console.log(script);
        */
    };

    $scope.Note = NoteService;
});

app.controller("UsersCtrl", function(
    $scope,
    $http,
    uiGridConstants,
    CentersFactory,
    $window
) {
    $scope.Center = CentersFactory;
    var paginationOptions = {
        pageNumber: 1,
        pageSize: 50,
        sort: null
    };
    $scope.tableOptions = {
        enableSorting: false,
        enableFiltering: false,
        showGridFooter: true,
        showColumnFooter: true,
        paginationPageSizes: [50, 100, 500, 1000, 5000],
        paginationPageSize: 50,
        useExternalPagination: true,
        onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.pagination.on.paginationChanged(null, function(
                newPage,
                pageSize
            ) {
                paginationOptions.pageNumber = newPage;
                paginationOptions.pageSize = pageSize;
                paginationOptions.pageNumber = newPage;
                paginationOptions.pageSize = pageSize;
                $scope.getUsers(pageSize, newPage);
            });

            $scope.gridApi.core.on.filterChanged($scope, function() {
                var grid = this.grid;
                var q = grid.columns[1].filters[0].term;
                $scope.getUsers(
                    paginationOptions.pageSize,
                    paginationOptions.pageNumber,
                    q
                );
            });

            $scope.gridApi.core.on.columnVisibilityChanged($scope, function(
                changedColumn
            ) {
                $scope.columnChanged = {
                    name: changedColumn.colDef.name,
                    visible: changedColumn.colDef.visible
                };
            });
        },
        enableRowSelection: true,
        enableSelectAll: true,
        selectionRowHeaderWidth: 35,
        enableRowHeaderSelection: true,
        multiSelect: true,
        enableCellEditOnFocus: true,
        enableGridMenu: true,
        columnDefs: [
            {
                field: "name",
                displayName: "اسم",
                visible: true
            },
            {
                field: "email",
                displayName: "ایمیل",
                visible: true
            },
            {
                field: "role",
                displayName: "نقش",
                visible: true
            },

            {
                field: "id",
                displayName: "",
                enableFiltering: false,
                cellTemplate:
                    '<div class="btn-group"><a  href="/admin/newUser?id=[[COL_FIELD]]" target="_blank" class="btn btn-outline-primary"> معلومات بیشتر </a></div>'
            }
        ],
        rowHeight: "50px",
        data: []
    };

    $scope.getUsers = function(limit, pageNumber, searchQuery) {
        if (searchQuery == undefined) {
            searchQuery = "";
        }
        $http
            .get("/admin/getUsers", {
                params: { page: pageNumber, limit: limit, q: searchQuery }
            })
            .then(function(res) {
                $scope.tableOptions.data = res.data.data;
                $scope.tableOptions.totalItems = res.data.total;
            })
            .catch(function(e) {
                alert(e.message);
            });
    };

    $scope.search = function() {
        $scope.getUsers(
            $scope.tableOptions.pageSize,
            $scope.pageNumber,
            $scope.searchQuery
        );
    };
    $scope.errors = [];
    $scope.saveUser = function() {
        $scope.errors = [];
        $http
            .post("/admin/saveUser", $scope.User)
            .then(function(res) {
                $window.location.href = "/admin/users";
            })
            .catch(function(res) {
                $scope.errors = res.data.errors;
            });
    };
    $scope.changePassword = function() {
        $scope.errors = [];
        $scope.showMsg = false;
        $http
            .post("/changePassword", $scope.UserCredintial)
            .then(function(res) {
                $scope.resetForm();
                $("#successMsg").removeClass("d-none");
            })
            .catch(function(res) {
                $scope.errors = res.data.errors;
            });
    };
    $scope.resetForm = function() {
        $scope.UserCredintial.old_password = "";
        $scope.UserCredintial.new_password = "";
        $scope.UserCredintial.new_password_confirmation = "";
        $scope.errors = [];
    };
    $scope.getRoles = function() {
        $http
            .get("/admin/getRoles")
            .then(function(res) {
                $scope.roles = res.data;
            })
            .catch(function(res) {
                alert("یک مشکل رخ داد!");
            });
    };
    $scope.setUser = function(data) {
        $scope.User = data;
    };
});

app.factory("CentersFactory", function($http, $window) {
    var c = { model: { country: "1" } };
    c.getCenters = function(limit, pageNumber, query) {
        $http
            .get("/admin/getCenters", {
                params: { page: pageNumber, limit: limit, q: query }
            })
            .then(function(res) {
                if (limit == "all") {
                    c.tableOptions.data = res.data;
                } else {
                    c.tableOptions.data = res.data.data;
                }
            })
            .catch(function(e) {
                alert(e.message);
            });
    };

    var paginationOptions = {
        pageNumber: 1,
        pageSize: 50,
        sort: null
    };
    c.searchQuery = "";
    c.search = function() {
        c.getCenters(
            c.tableOptions.paginationPageSize,
            paginationOptions.pageNumber,
            c.searchQuery
        );
    };
    c.tableOptions = {
        enableSorting: false,
        enableFiltering: false,
        showGridFooter: true,
        showColumnFooter: true,
        paginationPageSizes: [50, 100, 500, 1000, 5000],
        paginationPageSize: 50,
        useExternalPagination: true,
        onRegisterApi: function(gridApi) {
            c.gridApi = gridApi;
            c.gridApi.pagination.on.paginationChanged(null, function(
                newPage,
                pageSize
            ) {
                paginationOptions.pageNumber = newPage;
                paginationOptions.pageSize = pageSize;
                paginationOptions.pageNumber = newPage;
                paginationOptions.pageSize = pageSize;
                c.getCenters(pageSize, newPage);
            });
        },
        enableRowSelection: true,
        enableSelectAll: true,
        selectionRowHeaderWidth: 35,
        enableRowHeaderSelection: true,
        multiSelect: true,
        enableCellEditOnFocus: true,
        enableGridMenu: true,
        columnDefs: [
            {
                field: "name",
                displayName: "نام مرکز",
                visible: true
            },
            {
                field: "village",
                displayName: "قریه/ناحیه",
                visible: true
            },
            {
                field: "town",
                displayName: "ولسوالی",
                visible: true
            },
            {
                field: "province",
                displayName: "ولایت",
                visible: true
            },

            {
                field: "id",
                displayName: "",
                enableFiltering: false,
                cellTemplate:
                    '<div class="btn-group"><a  href="/admin/newCenter?id=[[COL_FIELD]]" target="_blank" class="btn btn-outline-primary"> معلومات بیشتر </a></div>'
            }
        ],
        rowHeight: "50px",
        data: []
    };

    c.save = function(data) {
        c.model["appointments"] = { data: data };

        c.errors = [];
        $http
            .post("/admin/saveCenter", c.model)
            .then(function(res) {
                $window.location.href = "/admin/centers";
            })
            .catch(function(res) {
                c.errors = res.data.errors;
            });
    };
    c.setCenter = function(data) {
        c.model = data;
    };
    return c;
});

app.controller("CentersCtrl", function($scope, CentersFactory) {
    $scope.Center = CentersFactory;
});
app.controller("AppointmentsCtrl", function($scope, $http, $window) {
    $scope.holiday = { day: "", month: "", year: "" };
    $scope.times = [];
    $scope.errors = [];

    $scope.model = {
        id: 0,
        name: "",
        days: [
            { label: "شنبه", value: 6, active: true, slots: [], times: [] },
            { label: "یک شنبه", value: 7, active: true, slots: [], times: [] },
            { label: "دوشنبه", value: 1, active: true, slots: [], times: [] },
            { label: "سه شنبه", value: 2, active: true, slots: [], times: [] },
            {
                label: "چهار شنبه",
                value: 3,
                active: true,
                slots: [],
                times: []
            },
            { label: "پنجشنبه", value: 4, active: true, slots: [], times: [] },
            { label: "جمعه", value: 5, active: false, slots: [], times: [] }
        ],
        slot: {
            start: "",
            end: "",
            number_of_appointments: 50
        },
        public_holidays: []
    };
    $scope.setTimes = function(times) {
        for (var i = 0; i < $scope.model.days.length; i++) {
            $scope.model.days[i].times = angular.copy(times);
        }
        $scope.times = angular.copy(times);
    };
    $scope.removeTimeSlot = function(day, startHour, endHour) {
        var index = $scope.getDayIndex(day);
        var toInclude = [];

        for (var i = 0; i < $scope.model.days[index].times.length; i++) {
            if ($scope.model.days[index].times[i].from_value > endHour) {
                toInclude.push($scope.model.days[index].times[i]);
            }
        }

        $scope.model.days[index].times = toInclude;
    };

    $scope.addPublicHoliday = function() {
        if (
            $scope.holiday.day == "" ||
            $scope.holiday.month == "" ||
            $scope.holiday.year == ""
        ) {
            alert("لطفا تاریخ را انتخاب نمایید");
            return;
        }
        if ($scope.holidayExists($scope.holiday)) {
            alert("این تاریخ قبلا اضافه شده است");
            return;
        }
        $scope.model.public_holidays.push($scope.holiday);
        $scope.holiday = {
            day: "",
            month: "",
            year: ""
        };
    };
    $scope.formatHour = function(hour) {
        var h = hour.substr(0, 2);
        var m = hour.substr(2, 4);
        return h + ":" + m;
    };
    $scope.holidayExists = function(holiday) {
        for (var i = 0; i < $scope.model.public_holidays.length; i++) {
            var savedHoliday = $scope.model.public_holidays[i];
            if (
                savedHoliday.day == holiday.day &&
                savedHoliday.month == holiday.month &&
                savedHoliday.year == holiday.year
            ) {
                return true;
            }
        }
        return false;
    };
    $scope.removePublicHoliday = function(k) {
        this.model.public_holidays.splice(k, 1);
    };
    $scope.isDate = function(date) {
        try {
            date.getDay();
            return true;
        } catch (error) {
            return false;
        }
    };

    $scope.addSlot = function(day) {
        var dayIndex = $scope.getDayIndex(day);

        if (day.slot.start == "" || day.slot.end == "") {
            alert("لطفا فاصله زمانی را دقیقا انتخاب نمایید");
            return;
        }
        if (
            day.slot.number_of_appointments == "" ||
            day.slot.number_of_appointments == undefined ||
            day.slot.number_of_appointments < 0
        ) {
            alert("لطفا تعداد ملاقات ها را وارد سازید");
            return;
        }
        if (dayIndex !== false) {
            $scope.model.days[dayIndex].slots.push(day.slot);
            $scope.removeTimeSlot(day, day.slot.start, day.slot.end);
            day.slot = { start: "", end: "" };
        }
    };
    $scope.getDayIndex = function(day) {
        for (var i = 0; i < $scope.model.days.length; i++) {
            if (day.value == $scope.model.days[i].value) {
                return i;
            }
        }

        return false;
    };
    $scope.getActiveDays = function() {
        var days = [];
        for (var i = 0; i < $scope.model.days.length; i++) {
            if ($scope.model.days[i].active) {
                days.push($scope.model.days[i]);
            }
        }
        return days;
    };
    $scope.resetDayTimes = function(day) {
        var index = $scope.getDayIndex(day);
        $scope.model.days[index].slots = [];
        $scope.model.days[index].times = angular.copy($scope.times);
    };
    $scope.getModelData = function() {
        var data = {
            id: $scope.model.id,
            name: $scope.model.name,
            data: {
                public_holidays: $scope.model.public_holidays,
                days: $scope.model.days
            }
        };

        return data;
    };

    $scope.saveTemplate = function() {
        $scope.errors = [];
        var data = $scope.getModelData();
        $http.post("/admin/saveTemplate", data).then(
            function(res) {
                console.log("response", res.data);
                $window.location.href = "/admin/templates";
            },
            function(res) {
                $scope.errors = res.data.errors;
            }
        );
    };

    $scope.getTemplates = function() {
        $http.get("/admin/getTemplates").then(
            function(res) {
                $scope.templates = res.data;
            },
            function(res) {
                alert("یک مشکل رخ داد لطفا دوباره کوشش نمایید.");
            }
        );
    };
    $scope.deleteTemplate = function(id) {
        var con = confirm("آیا میخواهید این تمپلیت را حذف کنید.");
        if (!con) {
            return false;
        }

        $http.get("/admin/deleteTemplate?id=" + id).then(
            function(res) {
                $window.location.href = "/admin/templates";
            },
            function(res) {
                alert("یک مشکل رخ داد لطفا دوباره کوشش کنید");
            }
        );
    };
    $scope.setTemplate = function(template) {
        console.log("template", template);
        if (template["data"] == undefined) {
            template = JSON.parse(template);
        }
        console.log("template", template);
        $scope.model["id"] = template.id;
        $scope.model.name = template.name;
        $scope.model.public_holidays = template.data.public_holidays;
        $scope.model.days = template.data.days;
    };
    $scope.copyFromPreviousDay = function(index) {
        var activeDays = $scope.getActiveDays();
        var day = activeDays[index];
        var dayIndex = $scope.getDayIndex(day);
        var previousDay = activeDays[index - 1];
        var previousDayIndex = $scope.getDayIndex(previousDay);

        $scope.model.days[dayIndex].slots = angular.copy(
            $scope.model.days[previousDayIndex].slots
        );
    };
});

app.factory('NoteService',function($http){
    var n = {
        reference_no:"",
        notes:[],
        errors:[],
        processing:false,
        type:"",
        model:{note:"",type:""}
    };  

    n.resetModel=function(){
        n.model={note:"",type:""};
    };

    n.save=function(){
        n.processing=true;
        n.errors=[];
        n.model.type = n.type;
        n.model.reference_no = n.reference_no;
        $http.post("/saveNote",n.model).then(function(){
            n.getNotes();
            n.resetModel();
            n.processing=false;
        },function(res){
            console.log('error data',res);
            n.processing=false;
            n.errors = res.data.errors;
        });
    }

    n.getNotes=function(){
        $http.get("/getNotes?reference_no="+n.reference_no+"&type="+n.type).then(function(res){
            n.notes = res.data;
        },function(){
            alert("یک مشکل رخ داد سیستم نمیتواند نوت ها  را دریابد!");
        });
    }
    n.setReferenceNo=function(reference_no,type){
        n.reference_no= reference_no;
        n.type        = type;
        n.getNotes();
    }
    return n;
});

/*
var links=window.document.getElementsByTagName("a");
    for(link of links){
        link.addEventListener("click", function(event){
            event.preventDefault()
        });
    }
  */
