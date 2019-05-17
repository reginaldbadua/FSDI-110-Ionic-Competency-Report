import { Post } from './../post';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  postToDisplay: Post[] = [];

  constructor(private dataSrv: DataService) {
    this.dataSrv.getPosts().subscribe(data => {

      //filter what messages should be shown
      for(var i = 0; i <data.length; i++){
        var thePost = data[i];
        // if the post is to everyone OR to me, add it to the array
        if(thePost.to == "Everyone" || thePost.to == "Reggie"){
          this.postToDisplay.push(thePost);
        }
      }
      //this.postToDisplay = data; //get the new data 
      //console.log(data);
    });
  }

  ngOnInit() {}
}

/**
 * Inyect the service
 *
 * create a local array
 * the the Post from the service to the local array
 *
 * html
 *   - create an *ngFor to travel the local array
 *   -  crate a card for each post
 *
 */
