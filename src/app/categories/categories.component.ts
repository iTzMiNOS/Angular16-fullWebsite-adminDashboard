import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  categoryArray:Array<any>;
  formCategory:string;
  formStatus:string ='Add';
  categoryId:string;
  constructor(private categoryService: CategoriesService) {}



  ngOnInit(): void {
      this.categoryService.loadData().subscribe(val => {
        console.log(val);
        this.categoryArray = val;
      })
  }

  onClick(formData){
    let categoryData: Category = {
      category: formData.value.category
    }
    if(this.formStatus == 'Add'){
      this.categoryService.saveData(categoryData);
    }else if(this.formStatus == 'Edit'){
      this.categoryService.updateData(this.categoryId,categoryData);
      this.formStatus = 'Add';
    }

    formData.reset();

  }
  onEdit(category,id){
    this.formCategory=category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }
  onDelete(id){
    this.categoryService.deleteData(id);
  }
}
