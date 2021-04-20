import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {icons} from './Icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  implements OnInit {

  bgColorShade = 5;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    // Loading Icons
    for (const icon of icons) {
      iconRegistry.addSvgIcon(icon.selector,
        sanitizer.bypassSecurityTrustResourceUrl(icon.path));
    }
  }

  ngOnInit(): void {

    const num = (this.bgColorShade === 0) ? 0 : this.bgColorShade / 100;
    const body = document.getElementsByTagName('body');
    body.item(0).style.backgroundColor = `rgb(255, 219, 77,${num})`;

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

  changeColor(event): void {

    this.bgColorShade = event.value;
    const num = (this.bgColorShade === 0) ? 0 : this.bgColorShade / 100;
    const body = document.getElementsByTagName('body');
    body.item(0).style.backgroundColor = `rgb(255, 219, 77,${num})`;

  }

}
