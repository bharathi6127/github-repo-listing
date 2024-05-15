import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GithubApiService } from '../github-api.service';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css']
})
export class RepoListComponent implements OnChanges {
  @Input() username: string;
  repos: any[] = [];
  loading: boolean = false;
  page: number = 1;
  perPage: number = 10;

  constructor(private githubApiService: GithubApiService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.username) {
      this.fetchRepos();
    }
  }

  fetchRepos() {
    this.loading = true;
    this.githubApiService.getRepos(this.username, this.page, this.perPage).subscribe(
      (data: any) => {
        this.repos = data.items;
        this.loading = false;
      },
      (error) => {
        this.repos = [];
        this.loading = false;
      }
    );
  }

  changePageSize(event: Event) {
    this.page = 1;
    this.fetchRepos();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchRepos();
    }
  }

  nextPage() {
    this.page++;
    this.fetchRepos();
  }
}
