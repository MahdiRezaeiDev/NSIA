import { Component } from '@angular/core';
import { Api } from '../Api';

@Component({
  selector: 'app-applications-pagination',
  templateUrl: './applications-pagination.component.html',
  styleUrls: ['./applications-pagination.component.css']
})
export class ApplicationsPaginationComponent {
  constructor(public api: Api) {}

  get firstRecord(): number { return (this.api.currentPage - 1) * this.api.pageSize + 1; }
  get lastRecord(): number { return Math.min(this.api.currentPage * this.api.pageSize, this.api.totalApplicationsCount); }

  changePage(page: number) {
    if (this.api.processing || page < 1 || page > this.api.lastPage) { return; }
    this.api.loadApplicationsPage(page);
  }
}
