import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private storage: AngularFireStorage,
     private afs:AngularFirestore,
      private toastr: ToastrService,
      private router:Router) { }
  uploadImage(selectedImg,postData, formStatus,id){
    const filePath = `postIMG/${Date.now()}`;

    this.storage.upload(filePath,selectedImg).then(()=>{
      console.log('Image uploaded Successfully..!!');
      this.storage.ref(filePath).getDownloadURL().subscribe(URL=>{
        postData.postImgPath = URL;
        if(formStatus=='Edit'){
          this.updateData(id,postData);
        }else{
          this.saveData(postData);
        }

      })
    })
  }
  saveData(postData){
    this.afs.collection('posts').add(postData).then(docRef => {
      this.toastr.success('Data insert Successfully ..!');
      this.router.navigate(['/posts']);
    });
  }
  loadData(){
    return this.afs.collection('posts').snapshotChanges().pipe(
     map(actions =>{
       return actions.map(a =>{
         const data= a.payload.doc.data();
         const id = a.payload.doc.id;
         return {id , data};
       })
     })
   )
 }
 loadSingleData(id){
  return this.afs.collection('posts').doc(id).valueChanges();
 }
 updateData(id,EditData){
  this.afs.collection('posts').doc(id).update(EditData).then(docRef =>{
    this.toastr.success('Data Updated Successfully ..!');
    this.router.navigate(['/posts']);
  })
}
deleteImage(postImgPath,id){
  this.storage.storage.refFromURL(postImgPath).delete().then(()=>{
    this.deleteData(id);
  })
}
deleteData(id){
  this.afs.collection('posts').doc(id).delete().then(docRef =>{
    this.toastr.warning('Data Deleted ..!');
  })
}
markFeatured(id,featuredData){
  this.afs.collection('posts').doc(id).update(featuredData).then(()=>{
    this.toastr.info('Featured Status Updated');
  })

}

}
