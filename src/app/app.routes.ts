import { Routes } from '@angular/router';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'articles', component: ArticlesListComponent },
  { path: 'article/create', component: ArticleFormComponent },
  { path: 'article/edit/:id', component: ArticleFormComponent },
  { path: 'article/:id', component: ArticleDetailComponent }
];
