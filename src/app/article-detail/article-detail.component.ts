import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../articles.service';
import { CommonModule, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [SlicePipe, CommonModule],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article: any;

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id'); // Peut être null
    const id = idParam ? +idParam : NaN; // Convertir en nombre ou assigner NaN si null

    if (!isNaN(id)) { // Vérifiez si l'ID est un nombre valide
      this.articlesService.getArticle(id).subscribe(article => {
        this.article = article;
      });
    } else {
      // Gérer le cas où l'ID est invalide
      console.error('ID invalide :', idParam);
      // Vous pouvez rediriger l'utilisateur ou afficher un message d'erreur ici
    }
  }
  
}
