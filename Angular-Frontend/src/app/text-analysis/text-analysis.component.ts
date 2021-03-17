import {Component, OnInit} from '@angular/core';
import {PythonPodcastService} from '../services/python-podcast.service';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-text-analysis',
  templateUrl: './text-analysis.component.html',
  styleUrls: ['./text-analysis.component.css']
})
export class TextAnalysisComponent implements OnInit {

  joker: any;
  categories: string[];
  fullOutput: string;
  spinning: boolean;
  fullFormControl = new FormControl('', [
    Validators.required
  ]);
  training = false;
  errorA = false;
  errorB = false;
  successA = false;
  trainOutput: string;
  partialFormControl = new FormControl('', [
    Validators.required
  ]);
  partialOutput: string;
  partialspinning: boolean;
  modelTrained = true;
  constructor(private pythonPodcastService: PythonPodcastService) {
  }

  ngOnInit(): void {
    this.pythonPodcastService.getCategories().subscribe(res => {
      this.joker = res;
      this.categories = this.joker.categories;
    }, err => {
      this.categories = ['Could not reach the API and load categories.'];
    });
  }

  fullCatPred(input: HTMLInputElement): void {
    if (!this.partialFormControl.touched) {
      this.partialFormControl.markAllAsTouched();
    }
    if (this.fullOutput !== '' && this.fullFormControl.valid) {
      this.fullOutput = '';
    }
    else if (this.fullOutput !== '' && !this.fullFormControl.valid) {
      return;
    }
    if (input.value !== '') {
      this.spinning = true;
      this.pythonPodcastService.fullCategoryPredict(`{ "input": "${input.value}" }`).subscribe(res => {
        this.joker = res;
        this.fullOutput = this.joker.output;
        this.spinning = false;
      }, err => {
        this.spinning = false;
        this.fullOutput = 'error';
      });
    }
  }
  fullInfoPanel(): void {
    // TODO
    console.log('asd');
  }
  trainModel(): void {
    this.modelTrained = true;
    if (this.successA) { this.successA = false; }
    const length = document.getElementsByClassName('mat-checkbox-checked').length;
    if (length < 2 ) {
      if (this.errorB) { this.errorB = false; }
      this.errorA = true;
    } else if (2 <= length  && length <= 5) {
      this.training = true;
      this.errorA = false;
      this.errorB = false;
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
      this.pythonPodcastService.partialTrain(input).subscribe( res => {
        this.training = false;
        this.joker = res;
        this.trainOutput = this.joker.output;
        this.successA = true;
        this.modelTrained = false;
      }, err => {
        console.log(err);
      });
    } else {
      if (this.errorA) { this.errorA = false; }
      this.errorB = true;
    }
  }
  partialCatPred(input: HTMLInputElement): void {
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
      this.partialspinning = true;
      this.pythonPodcastService.partialCategoryPredict(`{ "input": "${input.value}" }`).subscribe(res => {
        this.joker = res;
        this.partialOutput = this.joker.output;
        this.partialspinning = false;
      }, err => {
        this.partialspinning = false;
        this.partialOutput = 'error';
      });
    }
  }
  partialInfoPanel(): void {
    console.log('asd');
  }

}
