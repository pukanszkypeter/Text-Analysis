import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DataVisualizationComponent} from './data-visualization/data-visualization.component';
import {SapComponent} from './sap/sap.component';
import {PythonComponent} from './python/python.component';
import {TextAnalysisComponent} from './text-analysis/text-analysis.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'data-visualization', component: DataVisualizationComponent },
  { path: 'sap', component: SapComponent },
  { path: 'python', component: PythonComponent },
  { path: 'text-analysis', component: TextAnalysisComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
