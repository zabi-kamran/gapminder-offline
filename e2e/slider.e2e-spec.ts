import { Slider } from './pages/components/slider.e2e-component';
import { browser } from 'protractor';
import { BubbleChart } from './pages/bubble-chart.po';
import { CommonChartPage } from './pages/common-chart.po';

describe('Slider', () => {
  const slider: Slider = new Slider();
  const bubbleChart: BubbleChart = new BubbleChart();
  const commonChartPage: CommonChartPage = new CommonChartPage();

  beforeEach(async() => {
    await bubbleChart.openChart();
  });
  afterEach(async()=>{
    await commonChartPage.closeTab();
  });

  it('Change speed during playing not reset slider', async() => {
    await slider.dragToStart();
    await slider.playSlider();

    await slider.speedStepper.safeClick();

    const timeStamp = Number(await slider.getPosition());
    await browser.wait(() => slider.getPosition().then(res => Number(res) > timeStamp), 5000);

    expect(Number(await slider.getPosition())).toBeLessThan(2015);
  });
});
