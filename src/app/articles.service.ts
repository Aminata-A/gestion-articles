// src/app/articles.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Article, Comment } from './models/article.model';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private articles: Article[] = [];

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    if (this.articles.length === 0) {
      return this.http.get<Article[]>(this.apiUrl).pipe(
        tap(articles => this.articles = articles),
        catchError(this.handleError)
      );
    } else {
      return of(this.articles);
    }
  }

  getArticle(id: number): Observable<Article> {
    const article = this.articles.find(a => a.id === id);
    if (article) {
      return of(article);
    } else {
      return this.http.get<Article>(`${this.apiUrl}/${id}`).pipe(
        catchError(this.handleError)
      );
    }
  }

  getComments(articleId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${articleId}/comments`).pipe(
      catchError(this.handleError)
    );
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article).pipe(
      tap(newArticle => this.articles.push(newArticle)),
      catchError(this.handleError)
    );
  }

  updateArticle(id: number, article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/${id}`, article).pipe(
      tap(updatedArticle => {
        const index = this.articles.findIndex(a => a.id === id);
        if (index !== -1) {
          this.articles[index] = updatedArticle;
        }
      }),
      catchError(this.handleError)
    );
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.articles = this.articles.filter(article => article.id !== id);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
