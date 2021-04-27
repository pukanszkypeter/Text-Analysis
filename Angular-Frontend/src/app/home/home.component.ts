import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PythonPodcastService} from '../services/python-podcast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Data
  joker: any; // -> DTO
  category: string;
  categoryInput = 'Very useful podcast, I can only recommend. I learned a lot about cryptocurrencies and bitcoin mining.';
  categoryLoading = false;
  positive: string;
  positiveInput = 'Very useful podcast, I can only recommend. I learned a lot about cryptocurrencies and bitcoin mining.';
  positiveLoading = false;
  negative: string;
  negativeInput = 'Terrible podcast, don\'t listen to this. Lots of politics, annoying guests and false information.';
  negativeLoading = false;
  // Articles
  showArticle01 = false;
  showArticle02 = false;
  showArticle03 = false;
  showArticle04 = false;
  showArticle05 = false;
  showArticle06 = false;
  showAll = true;
  showFeb = true;
  showMar = true;
  showApr = true;
  showMay = true;
  // Snack Bar
  serverRT: number;

  // tslint:disable-next-line:variable-name
  constructor(private pythonPodcastService: PythonPodcastService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    const link = document.getElementById('home');
    link.classList.add('active');

  }

  activeLink(event): void {
    const current = document.getElementsByClassName('active');
    current.item(0).classList.remove('active');
    if (event.target.tagName === 'IMG') {
      document.querySelectorAll('a').item(1).classList.add('active');
    } else {
      event.target.classList.add('active');
    }
  }

  openSnackBar(): void {
    this._snackBar.open('Server Respone Time: ' + this.serverRT.toFixed(2).toString() + ' sec', 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }

  categoryPredict(): void {
    const startTime = new Date().getTime() / 1000;
    this.category = null;
    this.categoryLoading = true;
    this.pythonPodcastService.fullCategoryPredict(`{ "input": "${this.categoryInput}" }`).subscribe(res => {
      this.joker = res;
      const endTime = new Date().getTime() / 1000;
      this.serverRT = (endTime - startTime);
      this.openSnackBar();
      this.category = this.joker.output;
      this.categoryLoading = false;
    }, err => {
      this.category = 'Error';
    });
  }

  positivePredict(): void {
    const startTime = new Date().getTime() / 1000;
    this.positive = null;
    this.positiveLoading = true;
    this.pythonPodcastService.sentimentAnalysis(`{ "input": "${this.positiveInput}" }`).subscribe(res => {
      this.joker = res;
      const endTime = new Date().getTime() / 1000;
      this.serverRT = (endTime - startTime);
      this.openSnackBar();
      this.positive = this.joker.output;
      this.positiveLoading = false;
    }, err => {
      this.positive = 'Error';
    });
  }

  negativePredict(): void {
    const startTime = new Date().getTime() / 1000;
    this.negative = null;
    this.negativeLoading = true;
    this.pythonPodcastService.sentimentAnalysis(`{ "input": "${this.negativeInput}" }`).subscribe(res => {
      this.joker = res;
      const endTime = new Date().getTime() / 1000;
      this.serverRT = (endTime - startTime);
      this.openSnackBar();
      this.negative = this.joker.output;
      this.negativeLoading = false;
    }, err => {
      this.negative = 'Error';
    });
  }

  sort(event): void {
    if (event === 'All') {
      this.showAll = true; this.showFeb = true; this.showMar = true; this.showApr = true; this.showMay = true;
    }
    else if (event === 'Feb') {
      this.showAll = false; this.showFeb = true; this.showMar = false; this.showApr = false; this.showMay = false;
    }
    else if (event === 'Mar') {
      this.showAll = false; this.showFeb = false; this.showMar = true; this.showApr = false; this.showMay = false;
    }
    else if (event === 'Apr') {
      this.showAll = false; this.showFeb = false; this.showMar = false; this.showApr = true; this.showMay = false;
    }
    else if (event === 'May') {
      this.showAll = false; this.showFeb = false; this.showMar = false; this.showApr = false; this.showMay = true;
    }
  }

  searchGoogle(): void {
    const input = (document.getElementById('google') as HTMLInputElement).value;
    const google = 'https://www.google.com/search?q=' + input;
    window.open(google, '_blank');
    (document.getElementById('google') as HTMLInputElement).value = '';
  }

  searchFacebook(): void {
    const input = (document.getElementById('facebook') as HTMLInputElement).value;
    const google = 'https://www.facebook.com/search/top?q=' + input;
    window.open(google, '_blank');
    (document.getElementById('facebook') as HTMLInputElement).value = '';
  }

  searchTwitter(): void {
    const input = (document.getElementById('twitter') as HTMLInputElement).value;
    const google = 'https://www.twitter.com/search?q=' + input;
    window.open(google, '_blank');
    (document.getElementById('twitter') as HTMLInputElement).value = '';
  }

  searchGitHub(): void {
    const input = (document.getElementById('github') as HTMLInputElement).value;
    const google = 'https://www.github.com/search?q=' + input;
    window.open(google, '_blank');
    (document.getElementById('github') as HTMLInputElement).value = '';
  }

}
