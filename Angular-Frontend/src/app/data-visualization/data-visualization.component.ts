import {Component, OnInit, ViewChild} from '@angular/core';
import {PythonPodcastService} from '../services/python-podcast.service';
// Data
import {Category} from '../data/Category';
import {Podcast} from '../data/Podcast';
import {Review} from '../data/Review';
import {Run} from '../data/Run';
// Mat Modules
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.css']
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

  @ViewChild('categoriesPaginator') categoriesPaginator: MatPaginator;
  @ViewChild('podcastsPaginator') podcastsPaginator: MatPaginator;

  constructor(private pythonPodcastService: PythonPodcastService) { }

  ngOnInit(): void {

    this.tablesLoading = true;

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

  }

}
