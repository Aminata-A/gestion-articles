import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ArticleFormComponent } from "./article-form/article-form.component";
import { ArticlesListComponent } from "./articles-list/articles-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ArticleFormComponent,RouterLink, ArticlesListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'My Angular App';
}
