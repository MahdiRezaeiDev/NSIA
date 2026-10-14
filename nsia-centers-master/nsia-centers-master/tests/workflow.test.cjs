// Run with Node from this project: node tests/workflow.test.cjs
// Exercises the real TypeScript classes with in-memory HTTP and event transports.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');
const ts = require('typescript');
const {Subject, BehaviorSubject} = require('rxjs');
const operators = require('rxjs/operators');
const session = new Map();
const sessionStorage = {getItem: key => session.get(key) || null, setItem: (key, value) => session.set(key, value), removeItem: key => session.delete(key)};
const localStorage = {getItem: () => null, removeItem() {}};
const angular = {Component: () => target => target, Injectable: () => target => target,
  Input: () => () => {}, Output: () => () => {}, EventEmitter: class extends Subject {emit(value) {this.next(value);}}};
function load(file, name) {
  const source = fs.readFileSync(path.join(__dirname, '../src/app', file), 'utf8');
  const output = ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2018, experimentalDecorators: true}}).outputText;
  const exports = {};
  vm.runInNewContext(output, {exports, console, localStorage, sessionStorage, Blob: class {}, alert() {},
    require(id) {
      if (id === '@angular/core') {return angular;}
      if (id === 'rxjs') {return {Subject, BehaviorSubject};}
      if (id === 'rxjs/operators') {return operators;}
      if (id === 'file-saver') {return {saveAs() {}};}
      return {environment: {url: 'http://test.invalid'}};
    }}, {filename: file});
  return exports[name];
}
const Api = load('Api.ts', 'Api');
const Dashboard = load('dashboard/dashboard.component.ts', 'DashboardComponent');
const Applicant = load('applicantinfo/applicantinfo.component.ts', 'ApplicantinfoComponent');
const Calendar = load('appointment-calender/appointment-calender.component.ts', 'AppointmentCalenderComponent');
const requests = [];
const http = {get(url, options) {
  const response = new Subject();
  requests.push({url, params: Object.assign({}, options.params), response});
  return response;
}};
const callbacks = {};
let left = '', zoneRuns = 0;
const channel = {listen(name, fn) {callbacks[name] = fn; return channel;}};
const echo = {channel: () => channel, leave(name) {left = name;}};
const api = new Api(http, {}, {echo}, {});
const last = () => requests[requests.length - 1];
const respond = (data, total, page, lastPage) => {const request = last(); request.response.next({applications: {data, total, current_page: page, last_page: lastPage}}); request.response.complete();};
api.userDetails = {id: 22, role: 'admin'};
api.center_id = 18;
api.status = 0;
api.getApplications({year: 1405, month: 7, day: 1}, {year: 1405, month: 7, day: 22}, 'individual-report');
assert.deepStrictEqual(last().params, {appointment_start_date: '1405-7-1', appointment_end_date: '1405-7-22', center_id: 18, status: 0, view: 'individual', page: 1, limit: 200});
respond([{reference_no: 'FIRST'}], 205, 1, 2);
api.center_id = 19;
api.loadApplicationsPage(2);
assert.equal(last().params.page, 2);
assert.equal(last().params.center_id, 18, 'Pagination must use submitted filters');
respond([{reference_no: 'LAST'}], 205, 2, 2);
api.process('/appointmentDates', {center_id: 20}, 'GET');
api.exportToXls('/downloadCurrentReport');
assert.equal(last().params.center_id, 18, 'Unrelated lookups must not overwrite export filters');
assert.equal(last().params.view, 'individual');
assert.equal(last().params.status, 0);
assert.equal(last().params.page, undefined);
assert.equal(last().params.limit, undefined);
last().response.next('download'); last().response.complete();
api.loadApplicationsPage(2);
last().response.error(new Error('offline'));
assert.ok(api.loadError);
assert.equal(api.processing, false);
api.loadApplicationsPage();
assert.equal(last().params.page, 2, 'Retry must retain the failed page');
respond([], 200, 2, 1);
assert.equal(last().params.page, 1, 'An empty removed last page must fall back to the current last page');
respond([{reference_no: 'FIRST'}], 200, 1, 1);
api.getApplications();
assert.equal(last().params.page, 1);
assert.equal(last().params.center_id, 19);
assert.equal(last().params.view, undefined, 'Family lists must keep their default grouping');
respond([], 0, 1, 1);

const route = new Subject();
const dashboard = new Dashboard(api, {}, {queryParams: route}, {}, {run(fn) {zoneRuns++; fn();}});
const row = {family_form_reference_no: 'QA-FAMILY', opened: 0};
api.applications = [row];
const card = new Applicant(api); card.applicant = row;
callbacks['.opened']({application: {family_form_reference_no: 'OTHER', username: 'Other', user_id: 99}});
assert.equal(row.opened, 0);
callbacks['.opened']({application: {family_form_reference_no: 'QA-FAMILY', username: 'Employee', user_id: 99}});
assert.equal(row.opened, true);
assert.equal(row.opened_by_user_id, 99);
assert.equal(card.canOpen(), false);
callbacks['.closed']({application: {family_form_reference_no: 'QA-FAMILY', user_id: 22}});
assert.equal(row.opened, true, 'An old owner closing must not unlock a different owner');
callbacks['.closed']({application: {family_form_reference_no: 'QA-FAMILY', user_id: 99}});
assert.equal(row.opened, false);
assert.equal(card.canOpen(), true);
callbacks['.opened']({application: {family_form_reference_no: 'QA-FAMILY', username: 'Current employee', user_id: 22}});
assert.equal(card.canOpen(), true, 'The owning employee can reopen their application');
assert.equal(zoneRuns, 5);
dashboard.ngOnDestroy();
assert.equal(left, 'nsia_database_private-applications');
assert.equal(route.observers.length, 0);

const date = {y: 1405, m: 7, d: 22};
const calendar = new Calendar(api, {});
const selected = [];
calendar.dateSelected.subscribe(day => selected.push(day));
calendar.selectedDate = {y: 1405, m: 7, d: 1};
sessionStorage.setItem('selectedDate', JSON.stringify(calendar.selectedDate));
calendar.center_id = 19;
assert.equal(last().params.center_id, 19);
last().response.next({today: {year: 1405, month: 7, day: 23}, list: [{year: 1405, months: [{value: 7, days: [date]}]}]});
last().response.complete();
assert.equal(calendar.selectedDate, false);
assert.equal(selected[0], false, 'Changing center must clear a date absent from the new calendar');
assert.equal(sessionStorage.getItem('selectedDate'), null);
calendar.selectedDate = date;
calendar.getDates();
last().response.next({today: {year: 1405, month: 7, day: 23}, list: [{year: 1405, months: [{value: 7, days: [date]}]}]});
last().response.complete();
assert.equal(calendar.selectedDate, date);
assert.equal(selected[1], date);
calendar.ngOnDestroy();
api.resetApplicationResults();
console.log('Centers workflow regression checks passed: pagination, filters, exports, live ownership, calendar selection.');
