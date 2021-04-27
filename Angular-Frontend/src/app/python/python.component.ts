import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-python',
  templateUrl: './python.component.html',
  styleUrls: ['./python.component.css']
})
export class PythonComponent implements OnInit {

  // Articles
  showArticle01 = false;
  showArticle02 = false;
  showArticle03 = false;
  showArticle04 = false;
  showArticle05 = false;

  constructor() { }

  ngOnInit(): void {

    const link = document.getElementById('environments');
    link.classList.add('active');

  }

  activeLink(x: number): void {
    const current = document.getElementsByClassName('active');
    current.item(0).classList.remove('active');
    if ( x === 0 ) {
      document.getElementById('home').classList.add('active');
    } else if ( x === 1 ) {
      document.getElementById('data-visualization').classList.add('active');
    } else if ( x === 2 ) {
      document.getElementById('text-analysis').classList.add('active');
    }
  }

}
