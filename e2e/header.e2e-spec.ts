import { Header } from './pages/components/header.e2e-component';
import { RankingsChart } from './pages/rankings-chart.po';
import { LineChart } from './pages/line-chart.po';
import { MountainChart } from './pages/mountain-chart.po';
import { MapChart } from './pages/map-chart.po';
import { BubbleChart } from './pages/bubble-chart.po';
import { $, $$, browser } from 'protractor';

xdescribe('Header: ', () => {
  const header: Header = new Header();

  it('change language to RTL', async() => {
    await header.changeLanguageToRtl();

    await expect($('.wrapper.page-lang-rtl').isPresent()).toBeTruthy();
    await expect($('.vzb-rtl').isPresent()).toBeTruthy();
  });

  it('change language to English', async() => {
    await header.changeLanguageToEng();

    await expect($('.wrapper.page-lang-rtl').isPresent()).toBeFalsy();
    await expect($('.vzb-rtl').isPresent()).toBeFalsy();
  });

  it('"How to use" popup contains Vimeo player', async() => {
    await header.openHowToUsePopup();

    expect(await header.vimeoIframe.safeGetAttribute('src')).toEqual('https://player.vimeo.com/video/231885967');
  });


  describe('chart switcher', () => {
    const mapChart: MapChart = new MapChart();
    const mountainChart: MountainChart = new MountainChart();
    const lineChart: LineChart = new LineChart();
    const rankingsChart: RankingsChart = new RankingsChart();
    const bubbleChart: BubbleChart = new BubbleChart();

    it(`chart links`, async() => {
      const expectedLinks = [
        `${browser.baseUrl}#_${mapChart.url}`,
        `${browser.baseUrl}#_${mountainChart.url}`,
        `${browser.baseUrl}#_${lineChart.url}`,
        `${browser.baseUrl}#_${rankingsChart.url}`,
        `${browser.baseUrl}#_${bubbleChart.url}`
      ];

      const chartLinks = $$('.chart-switcher-options a');
      const links = await chartLinks.map(el => el.getAttribute('href')).then(res => res.sort());

      await expect(expectedLinks.sort()).toEqual(links as any);
    });
  });
});
