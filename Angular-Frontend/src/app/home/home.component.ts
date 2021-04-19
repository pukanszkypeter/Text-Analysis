import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
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

  constructor(private pythonPodcastService: PythonPodcastService, private router: Router) { }

  ngOnInit(): void {
    const site = document.getElementById(this.router.url.substring(1));
    site.classList.add('active');
  }

  categoryPredict(): void {
    this.categoryLoading = true;
    this.pythonPodcastService.fullCategoryPredict(`{ "input": "${this.categoryInput}" }`).subscribe(res => {
      this.joker = res;
      this.category = this.joker.output;
      this.categoryLoading = false;
    }, err => {
      this.category = 'Error';
    });
  }

  positivePredict(): void {
    this.positiveLoading = true;
    this.pythonPodcastService.sentimentAnalysis(`{ "input": "${this.positiveInput}" }`).subscribe(res => {
      this.joker = res;
      this.positive = this.joker.output;
      this.positiveLoading = false;
    }, err => {
      this.positive = 'Error';
    });
  }

  negativePredict(): void {
    this.negativeLoading = true;
    this.pythonPodcastService.sentimentAnalysis(`{ "input": "${this.negativeInput}" }`).subscribe(res => {
      this.joker = res;
      this.negative = this.joker.output;
      this.negativeLoading = false;
    }, err => {
      this.negative = 'Error';
    });
  }

}
