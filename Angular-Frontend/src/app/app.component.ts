import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {icons} from './Icons';
import {PythonPodcastService} from './services/python-podcast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  implements OnInit {

  bgColorShade: number;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private pythonPodcastService: PythonPodcastService) {
    // Loading Icons
    for (const icon of icons) {
      iconRegistry.addSvgIcon(icon.selector,
        sanitizer.bypassSecurityTrustResourceUrl(icon.path));
    }
  }

  ngOnInit(): void {

    this.pythonPodcastService.getBGColorShade().subscribe(res => {
      this.bgColorShade = res.shade;
      const num = (this.bgColorShade === 0) ? 0 : this.bgColorShade / 100;
      const body = document.getElementsByTagName('body');
      body.item(0).style.backgroundColor = `rgb(255, 219, 77,${num})`;
    });

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

  dropdownLink(): void {
    const current = document.getElementsByClassName('active');
    current.item(0).classList.remove('active');
    const environment = document.getElementById('environments');
    environment.classList.add('active');
  }

  changeColor(event): void {

    this.pythonPodcastService.setBGColorShade(`{ "shade": ${event.value} }`).subscribe(res => {
      this.bgColorShade = res.shade;
      const num = (this.bgColorShade === 0) ? 0 : this.bgColorShade / 100;
      const body = document.getElementsByTagName('body');
      body.item(0).style.backgroundColor = `rgb(255, 219, 77,${num})`;
    });

  }

}
