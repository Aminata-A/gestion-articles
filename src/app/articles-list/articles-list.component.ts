// src/app/article-list/article-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ArticlesService } from '../articles.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
  articles: any[] = [];

  constructor(
    private articlesService: ArticlesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articlesService.getArticles().subscribe(articles => {
      this.articles = articles;
    });
  }

  viewArticle(id: number): void {
    this.router.navigate(['/article', id]);
  }

  editArticle(id: number): void {
    this.router.navigate(['/article/edit', id]);
  }

  deleteArticle(id: number): void {
    this.articlesService.deleteArticle(id).subscribe(() => {
      this.articles = this.articles.filter(article => article.id !== id);
    });
  }

  refreshArticles(): void {
    this.loadArticles();
  }
  
  goBack(): void {
    this.router.navigate(['/']);
  }
}
