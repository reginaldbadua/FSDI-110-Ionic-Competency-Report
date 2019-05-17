import { Post } from './post';
import { Injectable } from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

import {firestore} from 'firebase';

//import for realtime DB readings

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private posts: Observable<Post[]>;

  // collection of objects -> DB
  postCollection: AngularFirestoreCollection<Post>;

  constructor(private db : AngularFirestore) {

    this.postCollection = db.collection<Post>('posts');

    this.retrievePostFromDB();
  
  }
  private retrievePostFromDB(){
    //read the data and create the subscription
    this.posts = this.postCollection.snapshotChanges().pipe(
      map(actions => {
         return actions.map( a => {
            let  data = a.payload.doc.data();
            const  id = a.payload.doc.id;
            const d: any = data.date;
            data.date = new firestore.Timestamp(
              d.seconds,
              d.nanoseconds
            ).toDate();

            return { id, ... data};
         });
      })
  );
  }
  // saves the post
  public savePost(post: Post) {
    //this.posts.push(post);
    console.log('save');
    var item = Object.assign({}, post); //convert
    this.postCollection.add(item); //store
  }

  // returns all the posts
  public getPosts() {
    this.retrievePostFromDB();
    return this.posts;
  }
}
