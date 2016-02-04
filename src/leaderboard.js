import "bootstrap/css/bootstrap.css!";
import {inject} from "aurelia-framework";

import {HttpClient} from 'aurelia-fetch-client';
import {GlobalState} from './global-state';
import {Highcharts} from 'highcharts';
//import {GraphData} from "./graphData";

@inject(HttpClient)
export class Leaderboard {

	isDisplayed = false;

	leaderboard = null;

	constructor(http) {
		this.http = http;

		this.chartData = {
				title: {
						text: 'Monthly Average Temperature',
						x: -20 //center
				},
				subtitle: {
						text: 'Source: WorldClimate.com',
						x: -20
				},
				xAxis: {
						categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
								'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
				},
				yAxis: {
						title: {
								text: 'Temperature (°C)'
						},
						plotLines: [{
								value: 0,
								width: 1,
								color: '#808080'
						}]
				},
				tooltip: {
						valueSuffix: '°C'
				},
				legend: {
						layout: 'vertical',
						align: 'right',
						verticalAlign: 'middle',
						borderWidth: 0
				},
				series: [{
						name: 'Tokyo',
						data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
				}, {
						name: 'New York',
						data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
				}, {
						name: 'Berlin',
						data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
				}, {
						name: 'London',
						data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
				}]
		};
	}

  activate() {
  	//this.changeGraph(this.graphData.lineGraph);

		return this.http.fetch('leaderboard/team')
      .then(response => response.json())
      .then(container => {
        console.log("Fetched leaderboard", container);
        this.leaderboard = container.leaderboard;
				return this.leaderboard;
      }).then(leaderboard => {


				let teamNames = [];
				let teamPoints = [];
				let teamDistance = [];

				for (let t of leaderboard) {
						teamNames.push(t.team_name);
						teamPoints.push(Math.trunc(t.total_score));teamPoints
						teamDistance.push(Math.trunc(t.total_distance));
				}

				// let athletePoints = [];
				//
				// // Create a 0-filled array that we'll use as a template.
				// let pointsTpl = Array.apply(null, Array(leaderboard.length)).map(Number.prototype.valueOf, 0);
				//
				// for (let i=0; i < leaderboard.length; i++) {
				// 	let t = leaderboard[i];
				// 	for (let a of t.team_members) {
				// 		let pointsByTeam = pointsTpl.slice(0);
				// 		pointsByTeam[i] = Math.trunc(a.total_score);
				// 		athletePoints.push({'name': a.athlete_name, 'data': pointsByTeam});
				// 	}
				// }

				this.chartData = {
		        chart: {
		            type: 'bar',
								height: 600
		        },
		        title: {
		            text: 'Team Leaderboard'
		        },
		        subtitle: {
		            text: 'Points'
		        },
		        xAxis: {
		            categories: teamNames,
		            title: {
		                text: null
		            }
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: 'Points',
		                align: 'high'
		            },
		            labels: {
		                overflow: 'justify'
		            }
		        },
		        tooltip: {
					      formatter: function() {
										if (this.series.name == 'Distance') {
											return this.y + ' miles';
										} else{
											return this.y + ' points';
										}
					      }
		        },
		        plotOptions: {
		            bar: {
		                dataLabels: {
		                    enabled: true
		                }
								}
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'top',
		            x: -30,
		            y: 5,
		            floating: true,
		            borderWidth: 1,
		            backgroundColor: '#FFFFFF',
		            shadow: true
		        },

		        credits: {
		            enabled: false
		        },
		        series: [
							{
			            name: 'Points',
			            data: teamPoints
			        },
							{
			            name: 'Distance',
			            data: teamDistance
			        }
						]
		    };

				this.changeGraph(this.chartData);
			});
  }

  changeGraph(chartOptions) {
  	this.chartOptions = chartOptions;
  }

  showChart(chartOptions) {
  	this.hiddenChartOptions = chartOptions;
  	this.isDisplayed = true;
  }

}
