import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private afs:AngularFirestore, private toastr: ToastrService) { }
  loadData(){
    return this.afs.collection('subscribers').snapshotChanges().pipe(
     map(actions =>{
       return actions.map(a =>{
         const data= a.payload.doc.data();
         const id = a.payload.doc.id;
         return {id , data};
       })
     })
   )
 }
 markAdded(id,subA){
  this.afs.collection('subscribers').doc(id).update(subA).then(()=>{
    this.toastr.info('Added to marked list');
    })
  }
  deleteData(id){
    this.afs.collection('subscribers').doc(id).delete().then(docRef =>{
      this.toastr.warning('subscriber Deleted ..!');
    })
  }
}
