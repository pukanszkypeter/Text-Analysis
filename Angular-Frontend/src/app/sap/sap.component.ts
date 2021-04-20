import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sap',
  templateUrl: './sap.component.html',
  styleUrls: ['./sap.component.css']
})
export class SapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const link = document.getElementById('environments');
    link.classList.add('active');

  }

}
