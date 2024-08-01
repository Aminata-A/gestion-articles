// src/app/article-form/article-form.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticlesService } from '../articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../models/article.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
  @Output() articleSubmitted = new EventEmitter<void>();
  articleForm: FormGroup;
  isEditMode = false;
  articleId?: number;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.articleId = +id;
        this.articlesService.getArticle(this.articleId).subscribe(
          article => {
            this.articleForm.patchValue(article);
          },
          error => {
            this.errorMessage = 'Error loading article: ' + error;
          }
        );
      }
    });
  }

  onSubmit(): void {
    if (this.articleForm.invalid) {
      return;
    }

    const article: Article = this.articleForm.value;

    if (this.isEditMode) {
      this.articlesService.updateArticle(this.articleId!, article).subscribe(
        () => {
          this.articleSubmitted.emit();
          this.router.navigate(['/articles']);
        },
        error => {
          this.errorMessage = 'Error updating article: ' + error;
        }
      );
    } else {
      this.articlesService.createArticle(article).subscribe(
        () => {
          this.articleSubmitted.emit();
          this.router.navigate(['/articles']);
        },
        error => {
          this.errorMessage = 'Error creating article: ' + error;
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/articles']);
  }
}
