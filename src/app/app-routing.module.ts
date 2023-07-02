import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostsComponent } from './post/all-posts/all-posts.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './services/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SubscribersComponent } from './subscribers/subscribers.component';

const routes: Routes = [
  {path: '',component:DashboardComponent,canActivate: [authGuard]},
  {path: 'login',component:LoginComponent},
  {path: 'categories',component:CategoriesComponent,canActivate: [authGuard]},
  {path: 'posts',component:AllPostsComponent,canActivate: [authGuard]},
  {path: 'posts/new',component:NewPostComponent,canActivate: [authGuard]},
  {path: 'subs',component:SubscribersComponent,canActivate: [authGuard]},
  {path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
