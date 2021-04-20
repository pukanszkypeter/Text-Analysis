import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-python',
  templateUrl: './python.component.html',
  styleUrls: ['./python.component.css']
})
export class PythonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const link = document.getElementById('environments');
    link.classList.add('active');

  }

}
