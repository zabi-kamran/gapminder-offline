import { MapChart } from "./pages/map-chart.po";
import { Sidebar } from "./pages/components/sidebar.e2e-component";
import { Slider } from "./pages/components/slider.e2e-component";
import { CommonChartPage } from './pages/common-chart.po';

const mapChart: MapChart = new MapChart();
const sidebar: Sidebar = new Sidebar(mapChart);
const slider: Slider = new Slider();
const commonChartPage: CommonChartPage = new CommonChartPage();

describe('Maps chart: Sidebar', () => {
  beforeEach(async() => {
    await mapChart.openChart();
  });
  afterEach(async()=>{
    await commonChartPage.closeTab();
  });

  it('Countries could be selected/deselected using the search in sidebar', async() => {
    await sidebar.searchAndSelectCountry('China');
    expect(await mapChart.selectedCountries.count()).toEqual(1);

    await sidebar.searchAndSelectCountry('India');
    expect(await mapChart.selectedCountries.count()).toEqual(2);

    expect(await mapChart.selectedCountriesLabels.getText()).toMatch('China');
    expect(await mapChart.selectedCountriesLabels.getText()).toMatch('India');

    await sidebar.deselectCountryInSearch('India');
    expect(await mapChart.selectedCountries.count()).toEqual(1);

    await sidebar.deselectCountryInSearch('China');
    expect(await mapChart.selectedCountries.count()).toEqual(0);
  });

  it('Click on minimap region - "Remove everything else"', async () => {
    await sidebar.removeEverythingElseInMinimap('Asia');

    await expect(mapChart.allBubbles.count()).toEqual(mapChart.countBubblesByColor('red'));
  });

  it('Click on minimap region - "Select all in this group"', async () => {
    await sidebar.selectAllInThisGroup('Asia');
    const selectedBubbles = await mapChart.countBubblesByColor('red');
    const selectedLabels = await mapChart.allLabels.count();

    expect(selectedLabels).toEqual(selectedBubbles);
  });
});
