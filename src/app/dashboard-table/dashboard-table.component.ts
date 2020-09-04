import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Data} from '@angular/router';
import {UsermanagementService} from '../_services/usermanagement.service';
import {User} from '../models/user';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.css']
})
export class DashboardTableComponent implements OnChanges {

  // Variables
  checked = false;
  loadingState = false;
  searchNameVisible = false;
  searchNameValue = '';
  deleteConfirmation = false;

  @Input() listOfUsers: Data[] = [];
  @Output() onDrawerOpen: EventEmitter<any> = new EventEmitter();

  indeterminate = false;
  listOfCurrentData: Data[] = [];
  listOfCurrentPageData: Data[] = [];
  setOfCheckedIds = new Set<number>();


  // Constructor
  constructor(private usermanager: UsermanagementService) {}



  /*---------------------------*/
  /*        METHODS            */
  /*---------------------------*/

  // When USER presses ONE item
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  // When USER presses the 'all' buttons which selects all of the current page
  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData.filter(({ disabled }) => !disabled).forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  // When the USER changes the page
  onCurrentPageDataChange(listOfCurrentPageData: Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }


  /*-----------------------------------------------*/

  // LOGIC method where the List gets edited.
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedIds.add(id);
    } else {
      this.setOfCheckedIds.delete(id);
    }
  }

  // LOGIC method to refresh the data
  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedIds.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedIds.has(id)) && !this.checked;
  }

  // LOGIC to send request
  deleteUsersRequest(): void {
    this.loadingState = true;
    const requestData = this.listOfUsers.filter(data => this.setOfCheckedIds.has(data.id));
    for (const user of requestData) {
      this.usermanager.removeUserHttpDelete(user.id).subscribe(
        received => {
          console.log('[DeleteUser] Received: ' + received);
        },
        error => {
          console.log('[DeleteUser] Error! ' + error);
        },
        () => {
          console.log('[DeleteUser] Completed!');
        }
      );
    }
    // this.usermanager.removeUserHttpDelete()

    setTimeout(() => {
      this.setOfCheckedIds.clear();
      this.refreshCheckedStatus();
      this.loadingState = false;
    }, 1000);
  }

  search(): void {
    console.log('Searching!');
    console.log('[Search] The size was: ' + this.listOfCurrentData.length);
    this.listOfCurrentData = this.listOfUsers.filter((item: User) => {
      return item.firstName.toLowerCase().includes(this.searchNameValue.toLowerCase())
    });
    console.log('[Search] Size is now: ' + this.listOfCurrentData.length);
  }

  // On Initialize
  ngOnChanges(): void {
    // await this.listOfUsers.length > 0;
    this.listOfCurrentData = this.listOfUsers;
  }

}
