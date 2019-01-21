import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { AppConfig } from '../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ChartService } from './components/tabs/chart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public electronService: ElectronService, public translate: TranslateService, public chartService: ChartService) {
    if (!electronService.isElectron()) {
      console.log('AppConfig', AppConfig);
      console.log('Mode web');
    }

    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang(chartService.currentLanguage);
  }
}
