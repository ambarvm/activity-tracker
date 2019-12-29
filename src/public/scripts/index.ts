import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_dark from '@amcharts/amcharts4/themes/amchartsdark';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ChartData } from '../../interfaces';
import '../styles/common.css';

declare function getUsage(date: string): ChartData[];

const darkMode = window.matchMedia('(prefers-color-scheme:dark)').matches;

am4core.ready(async () => {
	// Themes begin
	if (darkMode) {
		am4core.useTheme(am4themes_dark);
	}
	am4core.useTheme(am4themes_animated);
	// Themes end

	// Create chart instance
	const chart = am4core.create('chartdiv', am4charts.PieChart);

	// Add and configure Series
	const pieSeries = chart.series.push(new am4charts.PieSeries());
	pieSeries.dataFields.value = 'seconds';
	pieSeries.dataFields.category = 'name';

	// Let's cut a hole in our Pie chart the size of 30% the radius
	chart.radius = am4core.percent(60);
	chart.innerRadius = am4core.percent(40);

	// change the cursor on hover to make it apparent the object can be interacted with
	pieSeries.slices.template.cursorOverStyle = [
		{
			property: 'cursor',
			value: 'pointer',
		},
	];

	pieSeries.alignLabels = true;
	// pieSeries.labels.template.bent = true;
	// pieSeries.labels.template.content
	pieSeries.labels.template.radius = 3;
	pieSeries.slices.template.cornerRadius = 8;
	pieSeries.labels.template.padding(0, 0, 0, 0);

	// pieSeries.ticks.template.disabled = false;

	// Create a base filter effect (as if it's not there) for the hover to return to
	const shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter());
	shadow.opacity = 0;

	// Create hover state
	const hoverState = pieSeries.slices.template.states.getKey('hover');
	// normally we have to create the hover state, in this case it already exists

	// Slightly shift the shadow and make it more prominent on hover
	const hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
	hoverShadow.opacity = 0.7;
	hoverShadow.blur = 5;

	// Add a legend
	chart.legend = new am4charts.Legend();
	// chart.legend.

	const date = new Date().toDateString();

	chart.data = await getUsage(date);

	console.log(chart.data);
}); // end am4core.ready()
