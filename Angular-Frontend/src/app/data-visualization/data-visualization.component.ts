import {Component, OnInit, ViewChild} from '@angular/core';
import {PythonPodcastService} from '../services/python-podcast.service';
import {SapPodcastService} from '../services/sap-podcast.service';

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
import {MatSnackBar} from '@angular/material/snack-bar';


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
  // Snack Bar
  serverRT: number;

  // Tables Data
  categories: Category[] = [];
  categoriesLength: number;
  categoriesColumns: string[] = ['podcastId', 'category'];
  categoriesSource: MatTableDataSource<Category>;
  categoriesTableActive = true;

  podcasts: Podcast[] = [];
  podcastsLength: number;
  podcastsColumns: string[] = ['title', 'slug', 'itunesUrl', 'itunesId', 'podcastId'];
  podcastsSource: MatTableDataSource<Podcast>;
  podcastsTableActive = false;

  reviews: Review[] = [];
  reviewsLength: number;
  reviewsColumns: string[] = ['podcastId', 'title', 'rating', 'createdAt'];
  reviewsSource: MatTableDataSource<Review>;
  expandedElement: Review | null;
  reviewsTableActive = false;

  runs: Run[] = [];
  runsLength: number;
  runsColumns: string[] = ['runAt', 'maxRowid', 'reviewsAdded'];
  runsSource: MatTableDataSource<Run>;
  runsTableActive = false;

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

  // Statistics
  statisticsLoading = false;
  sumCategories = [];
  showSumCategories = false;
  sumRatings = [];
  showSumRatings = false;
  avgRatingsPerYear = [];
  showAvgRatingsPerYear = false;
  bestCategories = [];
  showBestCategories = false;

  // Word Clouds
  positiveCloud = false;
  negativeCloud = false;
  commonCloud = false;
  rarestCloud = false;

  // Articles
  showArticle01 = false;
  showArticle02 = false;
  showArticle03 = false;
  showArticle04 = false;

  // tslint:disable-next-line:variable-name max-line-length
  constructor(private pythonPodcastService: PythonPodcastService, private sapPodcastService: SapPodcastService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    const link = document.getElementById('data-visualization');
    link.classList.add('active');

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

  }

  openSnackBar(): void {
    this._snackBar.open('Server Respone Time: ' + this.serverRT.toFixed(2).toString() + ' sec', 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }

  loadTables(): void {

    const startTime = new Date().getTime() / 1000;
    this.showArticle01 = !this.showArticle01;

    this.tablesLoading = true;

    // Runs
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

    // Reviews
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

    // Podcasts
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

    // Categories
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
      const endTime = new Date().getTime() / 1000;
      this.serverRT = (endTime - startTime);
      this.openSnackBar();
    }, 1000);

  }

  activeLink(): void {
    const current = document.getElementsByClassName('active');
    current.item(0).classList.remove('active');
    document.getElementById('home').classList.add('active');
  }

  getActiveMatTab(): void {
    const activeTab = document.getElementsByClassName('mat-tab-label-active').
    item(0).getElementsByClassName('mat-tab-label-content').item(0).textContent;
    if (activeTab === 'Categories') {
      this.categoriesTableActive = true; this.podcastsTableActive = false; this.reviewsTableActive = false; this.runsTableActive = false;
    } else if (activeTab === 'Podcasts') {
      this.categoriesTableActive = false; this.podcastsTableActive = true; this.reviewsTableActive = false; this.runsTableActive = false;
    } else if (activeTab === 'Reviews') {
      this.categoriesTableActive = false; this.podcastsTableActive = false; this.reviewsTableActive = true; this.runsTableActive = false;
    } else if (activeTab === 'Runs') {
      this.categoriesTableActive = false; this.podcastsTableActive = false; this.reviewsTableActive = false; this.runsTableActive = true;
    }
  }

  filter(input: HTMLInputElement): void {
    this.filterResult = [];
    this.searchResult = new Podcast();
    this.searchCategories = [];
    this.searchReviews = [];
    if (input.value !== '') {
      this.pythonPodcastService.filter(`{ "input": "${input.value}" }`).subscribe(res => {
        this.joker = res;
        this.filterResultLength = this.joker.output.length;
        for (let i = 0; i < this.filterResultLength; i++) {
          this.filterResult.push(this.joker.output[i]);
        }
      });
    }
  }

  search(): void {
    this.searchResult = new Podcast();
    this.searchCategories = [];
    this.searchReviews = [];
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

  loadSumCategories(): void {
    const startTime = new Date().getTime() / 1000;
    this.statisticsLoading = true;
    this.showSumCategories = true; this.showSumRatings = false; this.showAvgRatingsPerYear = false; this.showBestCategories = false;
    this.sumCategories = [];
    this.pythonPodcastService.getSumCategories().subscribe(res => {
      // tslint:disable-next-line:prefer-for-of
      for ( let i = 0; i < res.statistics.length; i++ ) {
        this.sumCategories.push(res.statistics[i]);
      }
      this.statisticsLoading = false;
      const endTime = new Date().getTime() / 1000;
      this.serverRT = (endTime - startTime);
      this.openSnackBar();
    });
  }

  loadSumRatings(): void {
    const startTime = new Date().getTime() / 1000;
    this.statisticsLoading = true;
    this.showSumCategories = false; this.showSumRatings = true; this.showAvgRatingsPerYear = false; this.showBestCategories = false;
    this.sumRatings = [];
    this.pythonPodcastService.getSumRatings().subscribe(res => {
      // tslint:disable-next-line:prefer-for-of
      for ( let i = 0; i < res.statistics.length; i++ ) {
        this.sumRatings.push(res.statistics[i]);
      }
      this.statisticsLoading = false;
      const endTime = new Date().getTime() / 1000;
      this.serverRT = (endTime - startTime);
      this.openSnackBar();
    });
  }

  loadAvgRatingsPerYear(): void {
    const startTime = new Date().getTime() / 1000;
    this.statisticsLoading = true;
    this.showSumCategories = false; this.showSumRatings = false; this.showAvgRatingsPerYear = true; this.showBestCategories = false;
    this.avgRatingsPerYear = [];
    this.pythonPodcastService.getRatingsPerYear().subscribe(res => {
      // tslint:disable-next-line:prefer-for-of
      for ( let i = 0; i < res.statistics.length; i++ ) {
        this.avgRatingsPerYear.push(res.statistics[i]);
      }
      this.statisticsLoading = false;
      const endTime = new Date().getTime() / 1000;
      this.serverRT = (endTime - startTime);
      this.openSnackBar();
    });
  }

  loadBestCategories(): void {
    const startTime = new Date().getTime() / 1000;
    this.statisticsLoading = true;
    this.showSumCategories = false; this.showSumRatings = false; this.showAvgRatingsPerYear = false; this.showBestCategories = true;
    this.bestCategories = [];
    this.pythonPodcastService.getBestCategories().subscribe(res => {
      // tslint:disable-next-line:prefer-for-of
      for ( let i = 0; i < res.statistics.length; i++ ) {
        this.bestCategories.push(res.statistics[i]);
      }
      this.statisticsLoading = false;
      const endTime = new Date().getTime() / 1000;
      this.serverRT = (endTime - startTime);
      this.openSnackBar();
    });
  }

  showCloud(x: number): void {
    if ( x === 0 ) {
      if ( this.positiveCloud ) {
        this.positiveCloud = false;
      } else {
        this.positiveCloud = true; this.negativeCloud = false; this.commonCloud = false; this.rarestCloud = false;
      }
    } else if ( x === 1 ) {
      if ( this.negativeCloud ) {
        this.negativeCloud = false;
      } else {
        this.positiveCloud = false; this.negativeCloud = true; this.commonCloud = false; this.rarestCloud = false;
      }
    } else if ( x === 2 ) {
      if ( this.commonCloud ) {
        this.commonCloud = false;
      } else {
        this.positiveCloud = false; this.negativeCloud = false; this.commonCloud = true; this.rarestCloud = false;
      }
    } else if ( x === 3 ) {
      if ( this.rarestCloud ) {
        this.rarestCloud = false;
      } else {
        this.positiveCloud = false; this.negativeCloud = false; this.commonCloud = false; this.rarestCloud = true;
      }
    }
  }

}
