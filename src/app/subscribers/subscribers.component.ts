import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  subArray:Array<any>;
  constructor(private subService: SubscribersService){}
  ngOnInit(): void {
    this.subService.loadData().subscribe(val=>{
      this.subArray = val;
    })
  }
  onAdded(id,bool){
    const addedData = {
      isAdded: bool
    }
    this.subService.markAdded(id,addedData);
  }
  onDeleteConfirmation(id){
    if (window.confirm('Are you sure you want to delete this subscriber?')) {
      this.subService.deleteData(id);
    }
  }
}
