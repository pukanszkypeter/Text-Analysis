import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sap',
  templateUrl: './sap.component.html',
  styleUrls: ['./sap.component.css']
})
export class SapComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

    const site = document.getElementById(this.router.url.substring(1));
    site.classList.add('active');

  }

}
