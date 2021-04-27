import {Component, OnInit} from '@angular/core';
import {SapPodcastService} from '../services/sap-podcast.service';
import {SAPTextItem} from '../data/SAPTextItem';
import {Event} from '@angular/router';

@Component({
  selector: 'app-sap',
  templateUrl: './sap.component.html',
  styleUrls: ['./sap.component.css']
})
export class SapComponent implements OnInit {

  joker: any; // -> DTO

  // Tables on Init
  linguistic: SAPTextItem[] = [];
  showLinguistic = false;
  linguisticTypes: SAPTextItem[] = [];
  showLinguisticTypes = false;
  linguisticData: SAPTextItem[] = [];
  showLinguisticData = false;

  extraction: SAPTextItem[] = [];
  showExtraction = false;
  extractionTypes: SAPTextItem[] = [];
  showExtractionTypes = false;
  extractionData: SAPTextItem[] = [];
  showExtractionData = false;

  positiveWords: string[] = [];
  showPositiveWords = false;
  negativeWords: string[] = [];
  showNegativeWords = false;

  commonWords: string[] = [];
  showCommonWords = false;
  rarestWords: string[] = [];
  showRarestWords = false;

  // Articles
  articleIntroduction = false;
  articleAnalysis = false;
  articleLinguistic = false;
  articleExtraction = false;
  articleSentiment = false;
  articleMining = false;
  articleWords = false;

  constructor(private sapPodcastService: SapPodcastService) {
  }

  ngOnInit(): void {

    const link = document.getElementById('environments');
    link.classList.add('active');
    // Linguistic Table
    this.sapPodcastService.getLinguisticTable().subscribe(res => {
      this.joker = res.value;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.joker.length; i++) {
        const sapTextItem = new SAPTextItem().initialize(this.joker[i]);
        this.linguistic.push(sapTextItem);
      }
    });
    // Linguistic Types
    this.sapPodcastService.getLinguisticTypes().subscribe(res => {
      this.joker = res.value;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.joker.length; i++) {
        const sapTextItem = new SAPTextItem().initialize(this.joker[i]);
        this.linguisticTypes.push(sapTextItem);
      }
    });
    // Linguistic Data
    this.sapPodcastService.getLinguisticData().subscribe(res => {
      this.joker = res.value;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.joker.length; i++) {
        const sapTextItem = new SAPTextItem().initialize(this.joker[i]);
        this.linguisticData.push(sapTextItem);
      }
    });
    // Extraction Table
    this.sapPodcastService.getExtractionTable().subscribe(res => {
      this.joker = res.value;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.joker.length; i++) {
        const sapTextItem = new SAPTextItem().initialize(this.joker[i]);
        this.extraction.push(sapTextItem);
      }
    });
    // Extraction Types
    this.sapPodcastService.getExtractionTypes().subscribe(res => {
      this.joker = res.value;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.joker.length; i++) {
        const sapTextItem = new SAPTextItem().initialize(this.joker[i]);
        this.extractionTypes.push(sapTextItem);
      }
    });
    // Extraction Data
    this.sapPodcastService.getExtractionData().subscribe(res => {
      this.joker = res.value;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.joker.length; i++) {
        const sapTextItem = new SAPTextItem().initialize(this.joker[i]);
        this.extractionData.push(sapTextItem);
      }
    });
    // Positive Words
    this.sapPodcastService.getPositiveWords().subscribe(res => {
      this.joker = res.value;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.joker.length; i++) {
        this.positiveWords.push(this.joker[i].word);
      }
    });
    // Negtive Words
    this.sapPodcastService.getNegativeWords().subscribe(res => {
      this.joker = res.value;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.joker.length; i++) {
        this.negativeWords.push(this.joker[i].word);
      }
    });
    // Common Words
    this.sapPodcastService.getCommonWords().subscribe(res => {
      this.joker = res.value;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.joker.length; i++) {
        this.commonWords.push(this.joker[i].word);
      }
    });
    // Rarest Words
    this.sapPodcastService.getRarestWords().subscribe(res => {
      this.joker = res.value;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.joker.length; i++) {
        this.rarestWords.push(this.joker[i].word);
      }
    });

  }

  activeLink(): void {
    const current = document.getElementsByClassName('active');
    current.item(0).classList.remove('active');
    document.getElementById('home').classList.add('active');
  }

  showLinguisticTables(x: number): void {
    if (x === 0) {
      if (this.showLinguistic) {
        this.showLinguistic = false;
      } else {
        this.showLinguistic = true;
        this.showLinguisticTypes = false;
        this.showLinguisticData = false;
      }
    } else if (x === 1) {
      if (this.showLinguisticTypes) {
        this.showLinguisticTypes = false;
      } else {
        this.showLinguistic = false;
        this.showLinguisticTypes = true;
        this.showLinguisticData = false;
      }
    } else if (x === 2) {
      if (this.showLinguisticData) {
        this.showLinguisticData = false;
      } else {
        this.showLinguistic = false;
        this.showLinguisticTypes = false;
        this.showLinguisticData = true;
      }
    }
  }

  showExtractionTables(x: number): void {
    if (x === 0) {
      if (this.showExtraction) {
        this.showExtraction = false;
      } else {
        this.showExtraction = true;
        this.showExtractionTypes = false;
        this.showExtractionData = false;
      }
    } else if (x === 1) {
      if (this.showExtractionTypes) {
        this.showExtractionTypes = false;
      } else {
        this.showExtraction = false;
        this.showExtractionTypes = true;
        this.showExtractionData = false;
      }
    } else if (x === 2) {
      if (this.showExtractionData) {
        this.showExtractionData = false;
      } else {
        this.showExtraction = false;
        this.showExtractionTypes = false;
        this.showExtractionData = true;
      }
    }
  }

  showSentimentTables(x: number): void {
    if (x === 0) {
      if (this.showPositiveWords) {
        this.showPositiveWords = false;
      } else {
        this.showPositiveWords = true;
        this.showNegativeWords = false;
      }
    } else if (x === 1) {
      if (this.showNegativeWords) {
        this.showNegativeWords = false;
      } else {
        this.showPositiveWords = false;
        this.showNegativeWords = true;
      }
    }
  }

  showTextMiningTables(x: number): void {
    if (x === 0) {
      if (this.showCommonWords) {
        this.showCommonWords = false;
      } else {
        this.showCommonWords = true;
        this.showRarestWords = false;
      }
    } else if (x === 1) {
      if (this.showRarestWords) {
        this.showRarestWords = false;
      } else {
        this.showCommonWords = false;
        this.showRarestWords = true;
      }
    }
  }

}
