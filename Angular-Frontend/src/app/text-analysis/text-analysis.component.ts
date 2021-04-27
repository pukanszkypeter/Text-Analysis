import {Component, OnInit} from '@angular/core';
import {PythonPodcastService} from '../services/python-podcast.service';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSelectionList} from '@angular/material/list';


@Component({
  selector: 'app-text-analysis',
  templateUrl: './text-analysis.component.html',
  styleUrls: ['./text-analysis.component.css']
})

export class TextAnalysisComponent implements OnInit {

  joker: any; // -> DTO
  serverRT: number;
  categories: string[] = [];

  // FULL CATEGORY PREDICTION - DATA
  fullOutput: string;
  fullSpinner: boolean;
  fullSuccess = false;
  fullError = false;
  fullFormControl = new FormControl('', [
    Validators.required
  ]);

  // PARTIAL CATEGORY PREDICTION - DATA
  partialA = false;
  partialB = false;
  partialC = false;
  partialD = false;
  partialE = false;
  trainOutput: string;
  modelTrained = false;
  partialOutput: string;
  partialSpinner: boolean;
  partialSuccess = false;
  partialError = false;
  partialFormControl = new FormControl('', [
    Validators.required
  ]);

  // SENTIMENT ANALYSIS - DATA
  sentimentOutput: string;
  sentimentSpinner: boolean;
  sentimentSuccess = false;
  sentimentError = false;
  sentimentFormControl = new FormControl('', [
    Validators.required
  ]);

  // Aritcles
  showArticle01 = false;
  showArticle02 = false;
  showArticle03 = false;


  // tslint:disable-next-line:variable-name
  constructor(private pythonPodcastService: PythonPodcastService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    const link = document.getElementById('text-analysis');
    link.classList.add('active');

    // Get Podcast Categories
    this.pythonPodcastService.getCategories().subscribe(res => {
      this.joker = res.categories;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.joker.length; i++) {
        this.categories.push(this.joker[i][1]);
      }
    });

  }

  // Active Link
  activeLink(): void {
    const current = document.getElementsByClassName('active');
    current.item(0).classList.remove('active');
    document.getElementById('home').classList.add('active');
  }

  // Snack Bar for Server Response Time
  openSnackBar(): void {
    this._snackBar.open('Server Respone Time: ' + this.serverRT.toFixed(2).toString() + ' sec', 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }

  // FULL CATEGORY PREDICTION - LOGIC
  fullCategoryPredict(input: HTMLInputElement): void {
    const startTime = new Date().getTime() / 1000;
    this.fullSuccess = false;
    this.fullError = false;
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
        this.fullSuccess = true;
        this.fullSpinner = false;
        const endTime = new Date().getTime() / 1000;
        this.serverRT = (endTime - startTime);
        this.openSnackBar();
      }, err => {
        this.fullError = true;
        this.fullSpinner = false;
      });
    }
  }

  // PARTIAL CATEGORY PREDICTION - TRAIN
  trainModel(genres: MatSelectionList): void {
    this.modelTrained = false;
    this.partialE = false;
    if (this.partialA) { this.partialA = false; }
    const length = genres.selectedOptions.selected.length;
    if (length < 2 ) {
      if (this.partialB) { this.partialB = false; }
      this.partialA = true;
    } else if (2 <= length  && length <= 5) {
      const startTime = new Date().getTime() / 1000;
      this.partialD = true;
      this.partialA = false;
      this.partialB = false;
      const elems = genres.selectedOptions.selected;
      let input = '{ "categories": "';
      for (let i = 0; i < length; i++) {
        input += `${elems[i]._text.nativeElement.innerText} `;
      }
      input += '" }';
      this.pythonPodcastService.trainModel(input).subscribe( res => {
        this.partialD = false;
        this.joker = res;
        this.trainOutput = this.joker.output;
        this.partialC = true;
        this.modelTrained = true;
        const endTime = new Date().getTime() / 1000;
        this.serverRT = (endTime - startTime);
        this.openSnackBar();
        genres.deselectAll();
      }, err => {
        this.partialD = false;
        this.partialE = true;
        const endTime = new Date().getTime() / 1000;
        this.serverRT = (endTime - startTime);
        this.openSnackBar();
        genres.deselectAll();
      });
    } else {
      if (this.partialA) { this.partialA = false; }
      this.partialB = true;
    }
  }

  // PARTIAL CATEGORY PREDICTION - PREDICT
  partialCategoryPredict(input: HTMLInputElement): void {
    const startTime = new Date().getTime() / 1000;
    this.partialSuccess = false;
    this.partialError = false;
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
        this.partialSuccess = true;
        this.partialSpinner = false;
        const endTime = new Date().getTime() / 1000;
        this.serverRT = (endTime - startTime);
        this.openSnackBar();
      }, err => {
        this.partialSpinner = false;
        this.partialError = true;
      });
    }
  }

  // SENTIMENT ANALYSIS
  sentimentAnalysis(input: HTMLInputElement): void {
    const startTime = new Date().getTime() / 1000;
    this.sentimentSuccess = false;
    this.sentimentError = false;
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
        this.sentimentSuccess = true;
        const endTime = new Date().getTime() / 1000;
        this.serverRT = (endTime - startTime);
        this.openSnackBar();
      }, err => {
        this.sentimentSpinner = false;
        this.sentimentError = true;
      });
    }
  }

}
