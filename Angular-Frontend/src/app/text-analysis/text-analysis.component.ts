import {Component, OnInit} from '@angular/core';
import {PythonPodcastService} from '../services/python-podcast.service';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-text-analysis',
  templateUrl: './text-analysis.component.html',
  styleUrls: ['./text-analysis.component.css']
})

export class TextAnalysisComponent implements OnInit {

  joker: any; // -> DTO
  categories: string[];

  // FULL CATEGORY PREDICTION - DATA
  fullOutput: string;
  fullSpinner: boolean;
  fullFormControl = new FormControl('', [
    Validators.required
  ]);

  // PARTIAL CATEGORY PREDICTION - DATA
  partialA = false;
  partialB = false;
  partialC = false;
  partialD = false;
  trainOutput: string;
  modelTrained = true;
  partialOutput: string;
  partialSpinner: boolean;
  partialFormControl = new FormControl('', [
    Validators.required
  ]);

  // SENTIMENT ANALYSIS - DATA
  sentimentOutput: string;
  sentimentSpinner: boolean;
  sentimentFormControl = new FormControl('', [
    Validators.required
  ]);


  constructor(private pythonPodcastService: PythonPodcastService, private router: Router) {
  }

  ngOnInit(): void {

    const site = document.getElementById(this.router.url.substring(1));
    site.classList.add('active');

    // Get podcast categories
    this.pythonPodcastService.getCategoriesDistinct().subscribe(res => {
      this.joker = res;
      this.categories = this.joker.categories;
    }, err => {
      this.categories = ['Could not reach the API and load categories.'];
    });

  }

  // FULL CATEGORY PREDICTION - LOGIC
  fullCategoryPredict(input: HTMLInputElement): void {
    if (!this.fullFormControl.touched) {
      this.fullFormControl.markAllAsTouched();
    }
    if (this.fullOutput !== '' && this.fullFormControl.valid) {
      this.fullOutput = '';
    }
    else if (this.fullOutput !== '' && !this.fullFormControl.valid) {
      return;
    }
    if (input.value !== '') {
      this.fullSpinner = true;
      this.pythonPodcastService.fullCategoryPredict(`{ "input": "${input.value}" }`).subscribe(res => {
        this.joker = res;
        this.fullOutput = this.joker.output;
        this.fullSpinner = false;
      }, err => {
        this.fullSpinner = false;
        this.fullOutput = 'error';
      });
    }
  }

  // FULL CATEGORY PREDICTION - INFO
  fullInfoPanel(): void {
    // TODO
    console.log('Coming soon...');
  }

  // PARTIAL CATEGORY PREDICTION - TRAIN
  trainModel(): void {
    this.modelTrained = true;
    if (this.partialA) { this.partialA = false; }
    const length = document.getElementsByClassName('mat-checkbox-checked').length;
    if (length < 2 ) {
      if (this.partialB) { this.partialB = false; }
      this.partialA = true;
    } else if (2 <= length  && length <= 5) {
      this.partialD = true;
      this.partialA = false;
      this.partialB = false;
      const elems = document.getElementsByClassName('mat-checkbox-checked');
      let input = '{ "categories": [';
      for (let i = 0; i < length; i++) {
        const categoryId = elems.item(i).id.slice(13);
        const id = Number(categoryId) - 1;
        if (i === length - 1) {
          input += `"${this.categories[id]}"`;
        } else {
          input += `"${this.categories[id]}", `;
        }
      }
      input += '] }';
      this.pythonPodcastService.trainModel(input).subscribe( res => {
        this.partialD = false;
        this.joker = res;
        this.trainOutput = this.joker.output;
        this.partialC = true;
        this.modelTrained = false;
      }, err => {
        console.log(err);
      });
    } else {
      if (this.partialA) { this.partialA = false; }
      this.partialB = true;
    }
  }

  // PARTIAL CATEGORY PREDICTION - PREDICT
  partialCategoryPredict(input: HTMLInputElement): void {
    if (!this.partialFormControl.touched) {
      this.partialFormControl.markAllAsTouched();
    }
    if (this.partialOutput !== '' && this.partialFormControl.valid) {
      this.partialOutput = '';
    }
    else if (this.partialOutput !== '' && !this.partialFormControl.valid) {
      return;
    }
    if (input.value !== '') {
      this.partialSpinner = true;
      this.pythonPodcastService.partialCategoryPredict(`{ "input": "${input.value}" }`).subscribe(res => {
        this.joker = res;
        this.partialOutput = this.joker.output;
        this.partialSpinner = false;
      }, err => {
        this.partialSpinner = false;
        this.partialOutput = 'error';
      });
    }
  }

  // PARTIAL CATEGORY PREDICTION - INFO
  partialInfoPanel(): void {
    // TODO
    console.log('Coming soon...');
  }

  // SENTIMENT ANALYSIS
  sentimentAnalysis(input: HTMLInputElement): void {
    if (!this.sentimentFormControl.touched) {
      this.sentimentFormControl.markAllAsTouched();
    }
    if (this.sentimentOutput !== '' && this.sentimentFormControl.valid) {
      this.sentimentOutput = '';
    }
    else if (this.sentimentOutput !== '' && !this.sentimentFormControl.valid) {
      return;
    }
    if (input.value !== '') {
      this.sentimentSpinner = true;
      this.pythonPodcastService.sentimentAnalysis(`{ "input": "${input.value}" }`).subscribe(res => {
        this.joker = res;
        this.sentimentOutput = this.joker.output;
        this.sentimentSpinner = false;
      }, err => {
        this.sentimentSpinner = false;
        this.sentimentOutput = 'error';
      });
    }
  }

  // SENTIMENT ANALYSIS - INFO
  sentimentInfoPanel(): void {
    // TODO
    console.log('Coming soon...');
  }

}
