import { Component, OnInit } from '@angular/core';
import {Data} from '@angular/router';
import {UsermanagementService} from '../_services/usermanagement.service';
import {User} from '../models/user';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.css']
})
export class DashboardTableComponent implements OnInit {

  // Variables
  checked = false;
  loadingState = false;
  searchNameVisible = false;
  searchNameValue = '';

  indeterminate = false;
  listOfUsers: Data[] = [];
  listOfCurrentPageData: Data[] = [];
  setOfCheckedIds = new Set<number>();

  // Constructor
  constructor(private usermanager: UsermanagementService) { }



  /*---------------------------*/
  /*        METHODS            */
  /*---------------------------*/

  // When someone selects a user
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedIds.add(id);
    } else {
      this.setOfCheckedIds.delete(id);
    }
  }

  // When page changes
  onCurrentPageDataChange(listOfCurrentPageData: Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedIds.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedIds.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData.filter(({ disabled }) => !disabled).forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    this.loadingState = true;
    const requestData = this.listOfUsers.filter(data => this.setOfCheckedIds.has(data.id));
    console.log(requestData);
    setTimeout(() => {
      this.setOfCheckedIds.clear();
      this.refreshCheckedStatus();
      this.loadingState = false;
    }, 1000);
  }

  search(): void {
    console.log('Searching!');
  }

  // On Initialize
  ngOnInit(): void {
    // this.listOfUsers = null;
    this.usermanager.getUserHttpGet(0, 200).subscribe(
      returned => {
        console.log('[UserTable] Returned an Object:');
        console.log(returned);
        this.listOfUsers = returned.data;
      },
      error => {
        console.log('[UserTable] There is an error: ' + error);
      },
      () => {
        console.log('[UserTable] Completed everything!');
      }
    );
    this.listOfUsers = new Array(100).fill(0).map((_, index) => {
      return {
        id: index,
        name: `Edward King ${index}`,
        age: 32,
        address: `London, Park Lane no. ${index}`,
        disabled: index % 2 === 0
      };
    });
  }

}
