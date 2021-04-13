import {Component, OnInit, ViewChild} from '@angular/core';
import {PythonPodcastService} from '../services/python-podcast.service';
import {Router} from '@angular/router';
// Data
import {Category} from '../data/Category';
import {Podcast} from '../data/Podcast';
import {Review} from '../data/Review';
import {Run} from '../data/Run';
// Mat Modules
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DataVisualizationComponent implements OnInit {

  joker: any; // -> DTO
  tablesLoading: boolean;

  // Tables Data
  categories: Category[] = [];
  categoriesLength: number;
  categoriesColumns: string[] = ['podcastId', 'category'];
  categoriesSource: MatTableDataSource<Category>;

  podcasts: Podcast[] = [];
  podcastsLength: number;
  podcastsColumns: string[] = ['title', 'slug', 'itunesUrl', 'itunesId', 'podcastId'];
  podcastsSource: MatTableDataSource<Podcast>;

  reviews: Review[] = [];
  reviewsLength: number;
  reviewsColumns: string[] = ['podcastId', 'title', 'rating', 'createdAt'];
  reviewsSource: MatTableDataSource<Review>;
  expandedElement: Review | null;

  runs: Run[] = [];
  runsLength: number;
  runsColumns: string[] = ['runAt', 'maxRowid', 'reviewsAdded'];
  runsSource: MatTableDataSource<Run>;

  @ViewChild('categoriesPaginator') categoriesPaginator: MatPaginator;
  @ViewChild('podcastsPaginator') podcastsPaginator: MatPaginator;
  @ViewChild('reviewsPaginator') reviewsPaginator: MatPaginator;
  @ViewChild('runsPaginator') runsPaginator: MatPaginator;

  // Podcasts Data
  firstFormGroup: FormGroup;
  filterResultLength: number;
  filterResult: string[] = [];
  searchResult: Podcast = new Podcast();
  searchCategoriesLength: number;
  searchCategories: string[] = [];
  searchReviewsLength: number;
  searchReviews: Review[] = [];

  // tslint:disable-next-line:variable-name
  constructor(private pythonPodcastService: PythonPodcastService, private router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    const site = document.getElementById(this.router.url.substring(1));
    site.classList.add('active');

    this.tablesLoading = true;

    // Runs on Init
    this.pythonPodcastService.getRuns().subscribe(res => {
      this.joker = res;
      this.runsLength = 0;
      this.runsLength = this.joker.runs.length;
      this.runs = [];
      for (let i = 0; i < this.runsLength; i++) {
        const run = new Run();
        run.runAt = this.joker.runs[i][0];
        run.maxRowid = this.joker.runs[i][1];
        run.reviewsAdded = this.joker.runs[i][2];
        this.runs.push(run);
      }
      this.runsSource = new MatTableDataSource<Run>(this.runs);
      setTimeout(() => {
        this.runsSource.paginator = this.runsPaginator;
      });
    }, error => {
      console.log('Coming soon...');
    });

    // Reviews on Init
    this.pythonPodcastService.getReviews().subscribe(res => {
      this.joker = res;
      this.reviewsLength = 0;
      this.reviewsLength = this.joker.reviews.length;
      this.reviews = [];
      for (let i = 0; i < this.reviewsLength; i++) {
        const review = new Review();
        review.podcastId = this.joker.reviews[i][0];
        review.title = this.joker.reviews[i][1];
        review.content = this.joker.reviews[i][2];
        review.rating = this.joker.reviews[i][3];
        review.createdAt = this.joker.reviews[i][4];
        this.reviews.push(review);
      }
      this.reviewsSource = new MatTableDataSource<Review>(this.reviews);
      setTimeout(() => {
        this.reviewsSource.paginator = this.reviewsPaginator;
      });
    }, error => {
      console.log('Coming soon...');
    });

    // Podcasts on Init
    this.pythonPodcastService.getPodcasts().subscribe(res => {
      this.joker = res;
      this.podcastsLength = 0;
      this.podcastsLength = this.joker.podcasts.length;
      this.podcasts = [];
      for (let i = 0; i < this.podcastsLength; i++) {
        const podcast = new Podcast();
        podcast.podcastId = this.joker.podcasts[i][0];
        podcast.itunsId = this.joker.podcasts[i][1];
        podcast.slug = this.joker.podcasts[i][2];
        podcast.itunesUrl = this.joker.podcasts[i][3];
        podcast.title = this.joker.podcasts[i][4];
        this.podcasts.push(podcast);
      }
      this.podcastsSource = new MatTableDataSource<Podcast>(this.podcasts);
      setTimeout(() => {
        this.podcastsSource.paginator = this.podcastsPaginator;
      });
    }, error => {
      console.log('Coming soon...');
    });

    // Categories on Init
    this.pythonPodcastService.getCategories().subscribe(res => {
      this.joker = res;
      this.categoriesLength = 0;
      this.categoriesLength = this.joker.categories.length;
      this.categories = [];
      for (let i = 0; i < this.categoriesLength; i++) {
        const category = new Category();
        category.podcastId = this.joker.categories[i][0];
        category.category = this.joker.categories[i][1];
        this.categories.push(category);
      }
      this.categoriesSource = new MatTableDataSource<Category>(this.categories);
      setTimeout(() => {
        this.categoriesSource.paginator = this.categoriesPaginator;
      });
    }, error => {
      console.log('Coming soon...');
    });

    setTimeout(() => {
    this.tablesLoading = false;
    }, 2000);

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

  }

  filter(input: HTMLInputElement): void {
    this.pythonPodcastService.filter( `{ "input": "${input.value}" }` ).subscribe(res => {
      this.joker = res;
      this.filterResultLength = this.joker.output.length;
      for (let i = 0; i < this.filterResultLength; i++) {
        this.filterResult.push(this.joker.output[i]);
      }
    });
  }

  search(): void {
    const input = document.getElementById('title').innerHTML;
    this.pythonPodcastService.search( `{ "input": "${input}" }` ).subscribe(res => {
      this.joker = res;
      this.searchResult.podcastId = this.joker.output[0][0];
      this.searchResult.itunsId = this.joker.output[0][1];
      this.searchResult.slug = this.joker.output[0][2];
      this.searchResult.itunesUrl = this.joker.output[0][3];
      this.searchResult.title = this.joker.output[0][4];
      this.pythonPodcastService.searchCategories(`{ "input": "${this.searchResult.podcastId}" }`).subscribe(tes => {
        this.joker = tes;
        this.searchCategoriesLength = this.joker.output.length;
        for (let i = 0; i < this.searchCategoriesLength; i++) {
          this.searchCategories.push(this.joker.output[i]);
        }
      });
      this.pythonPodcastService.searchReviews(`{ "input": "${this.searchResult.podcastId}" }`).subscribe(zes => {
        this.joker = zes;
        this.searchReviewsLength = this.joker.output.length;
        for (let i = 0; i < this.searchReviewsLength; i++) {
          const review = new Review();
          review.podcastId = this.joker.output[i][0];
          review.title = this.joker.output[i][1];
          review.content = this.joker.output[i][2];
          review.rating = this.joker.output[i][3];
          review.createdAt = this.joker.output[i][4];
          this.searchReviews.push(review);
        }
      });
    });
  }

}
