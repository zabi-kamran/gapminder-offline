import { _$, _$$, ExtendedElementFinder } from '../../helpers/ExtendedElementFinder';
import { $$, By, element, ElementFinder } from 'protractor';
import { waitForSpinner } from '../../helpers/helper';

export class Header {
  public mainMenuBtn: ExtendedElementFinder = _$$('.main-menu-btn').first();
  public mainMenu: ElementFinder = $$('.menu.show-menu').first();
  public mainMenuItem: ElementFinder = this.mainMenu.$$('.menu-item.submenu').first();
  public newChart: ExtendedElementFinder = new ExtendedElementFinder(element.all(By.cssContainingText('.menu-btn', 'New chart')).first());
  public chartFromYourData: ExtendedElementFinder = new ExtendedElementFinder(element.all(By.cssContainingText('.menu-btn', 'Your data')).first());
  public csvFile: ExtendedElementFinder = new ExtendedElementFinder(element.all(By.cssContainingText('.menu-btn', 'CSV file...')).first());
  public timeGoesDown: ExtendedElementFinder = new ExtendedElementFinder(element.all(By.cssContainingText('label', 'Time goes down')).first());
  public timeGoesRight: ExtendedElementFinder = new ExtendedElementFinder(element.all(By.cssContainingText('label', 'Time goes right')).first());
  public upload: ElementFinder = _$$('.upload').get(1);
  public timeValueSelect: ExtendedElementFinder = _$('select:not(:disabled)');

  public async uploadCsv(absolutePath: string, importFileName: string): Promise<void> {
    const timeOptions = ['day', 'month', 'year', 'week', 'quarter'];
    let timeValue;

    if (importFileName.match('timeformat')) {
      timeValue = importFileName.replace('.csv', '').split('-')
        .filter(el => timeOptions.indexOf(el) > -1)[0];
    }

    await this.mainMenuBtn.safeClick();
    await this.newChart.safeClick();
    await this.chartFromYourData.safeClick();
    await this.csvFile.safeClick();

    importFileName.match(/^timeright/) ? await this.timeGoesRight.safeClick() : await this.timeGoesDown.safeClick();

    await this.timeValueSelect.safeClick();

    if (timeValue) {
      await _$$(`option[value*="${timeValue}"]`).first().safeClick();
    } else {
      await _$$(`option[value*="year"]`).first().click();
      await _$$(`option[value*="year"]`).first().click();
    }

    await this.upload.sendKeys(absolutePath);
    await _$$('.ok-btn').first().safeClick();
    await waitForSpinner();
  }
}
