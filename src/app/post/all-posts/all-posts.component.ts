import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  constructor(private postService: PostService){}
  postArray :Array<any>;
  ngOnInit(): void {
    this.postService.loadData().subscribe(val=>{
      this.postArray = val;
    })
  }
  onDeleteConfirmation(postImgPath,id){
    if (window.confirm('Are you sure you want to delete this post?')) {
      this.onDelete(postImgPath,id);
    }
  }
  onFeatured(id,bool){
    const featuredData = {
      isFeatured: bool
    }
    this.postService.markFeatured(id,featuredData);
  }
  onDelete(postImgPath,id){
    this.postService.deleteImage(postImgPath,id);
  }
}
