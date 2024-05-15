import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubApiService } from './github-api.service';

describe('GithubApiService', () => {
  let service: GithubApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubApiService]
    });
    service = TestBed.inject(GithubApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve repos from API', () => {
    const dummyRepos = [
      { name: 'Repo1', description: 'Desc1', topics: ['angular', 'typescript'] },
      { name: 'Repo2', description: 'Desc2', topics: ['angular'] }
    ];

    service.getRepos('testuser', 1, 10).subscribe((repos: any) => {
      expect(repos.items.length).toBe(2);
      expect(repos.items).toEqual(dummyRepos);
    });

    const req = httpMock.expectOne('https://api.github.com/users/testuser/repos?page=1&per_page=10');
    expect(req.request.method).toBe('GET');
    req.flush(dummyRepos);
  });

  afterEach(() => {
    httpMock.verify();
  });
});

