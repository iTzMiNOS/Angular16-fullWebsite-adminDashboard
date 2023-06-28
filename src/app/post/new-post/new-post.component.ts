import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  permalink:string = '';
  imgSrc: any = './assets/placeholder.png';
  selectedImg:any;
  categories: Array<any>;
  postForm: FormGroup;
  post:any;
  formStatus: string = 'Add New';
  docId: string;

  constructor(
    private route: ActivatedRoute ,private categoryService: CategoriesService, private fb: FormBuilder, private postService: PostService){
    this.route.queryParams.subscribe(val=>{
      this.docId = val.id;
      if(this.docId){
        this.postService.loadSingleData(val.id).subscribe(post=>{
          this.post = post;
          this.postForm = this.fb.group({
            title: [this.post.title,[
              Validators.required,
              Validators.minLength(8)
            ]],
            permalink: [this.post.permalink, [
              Validators.required,
              Validators.minLength(8),
              Validators.pattern(/^(?!.*(-[_-])+)(?!.*(_[_-])+)[a-zA-Z0-9_-]+$/)
            ]],
            excerpt: [this.post.excerpt,[
              Validators.required,
              Validators.minLength(50)
            ]],
            category: [`${this.post.category.categoryId}-${this.post.category.category}`,Validators.required],
            postImg: ['',Validators.required],
            content: [this.post.content,Validators.required]
          })
          this.imgSrc = this.post.postImgPath;
          this.formStatus = 'Edit';
        })
      }else{
        this.postForm = this.fb.group({
          title: ['',[
            Validators.required,
            Validators.minLength(8)
          ]],
          permalink: ['', [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?!.*(-[_-])+)(?!.*(_[_-])+)[a-zA-Z0-9_-]+$/)
          ]],
          excerpt: ['',[
            Validators.required,
            Validators.minLength(50)
          ]],
          category: ['',Validators.required],
          postImg: ['',Validators.required],
          content: ['',Validators.required]
        })
      }

    })


  }
  ngOnInit():void{
    this.categoryService.loadData().subscribe(val=>{
      this.categories = val.reverse();
    })
  }
  get fc(){
    return this.postForm.controls;
  }

  onTitleChanged($event){
    const title = $event.target.value;
    let remSpace = title.replace(/\s/g,'-');
    let remSpecial = remSpace.replace(/[^\w\s]/gi,'-');
    this.permalink = remSpecial.replace(/-+/g, '-');
  }
  showPreview($event){
    const reader = new FileReader();
    reader.onload = (e) =>{
      this.imgSrc = e.target.result
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }
  onSubmit(){
    let splitted = this.postForm.value.category.split('-');
    const postData : Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1]
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }
    this.postService.uploadImage(this.selectedImg,postData,this.formStatus,this.docId);
    setInterval(() => {
      this.postForm.reset();
      this.imgSrc = './assets/placeholder.png';
    }, 3000);
  }
}
