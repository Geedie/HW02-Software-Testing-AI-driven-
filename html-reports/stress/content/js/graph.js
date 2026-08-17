/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 633.0, "series": [{"data": [[0.0, 1.0], [0.1, 1.0], [0.2, 1.0], [0.3, 1.0], [0.4, 1.0], [0.5, 2.0], [0.6, 2.0], [0.7, 2.0], [0.8, 2.0], [0.9, 2.0], [1.0, 2.0], [1.1, 2.0], [1.2, 2.0], [1.3, 2.0], [1.4, 2.0], [1.5, 2.0], [1.6, 2.0], [1.7, 2.0], [1.8, 2.0], [1.9, 2.0], [2.0, 2.0], [2.1, 2.0], [2.2, 2.0], [2.3, 2.0], [2.4, 2.0], [2.5, 2.0], [2.6, 2.0], [2.7, 2.0], [2.8, 2.0], [2.9, 2.0], [3.0, 2.0], [3.1, 2.0], [3.2, 2.0], [3.3, 2.0], [3.4, 2.0], [3.5, 2.0], [3.6, 2.0], [3.7, 2.0], [3.8, 2.0], [3.9, 2.0], [4.0, 2.0], [4.1, 2.0], [4.2, 2.0], [4.3, 2.0], [4.4, 2.0], [4.5, 2.0], [4.6, 2.0], [4.7, 2.0], [4.8, 2.0], [4.9, 2.0], [5.0, 2.0], [5.1, 2.0], [5.2, 2.0], [5.3, 2.0], [5.4, 2.0], [5.5, 2.0], [5.6, 2.0], [5.7, 2.0], [5.8, 2.0], [5.9, 2.0], [6.0, 2.0], [6.1, 2.0], [6.2, 2.0], [6.3, 2.0], [6.4, 2.0], [6.5, 3.0], [6.6, 3.0], [6.7, 3.0], [6.8, 3.0], [6.9, 3.0], [7.0, 3.0], [7.1, 3.0], [7.2, 3.0], [7.3, 3.0], [7.4, 3.0], [7.5, 3.0], [7.6, 3.0], [7.7, 3.0], [7.8, 3.0], [7.9, 3.0], [8.0, 3.0], [8.1, 3.0], [8.2, 3.0], [8.3, 3.0], [8.4, 3.0], [8.5, 3.0], [8.6, 3.0], [8.7, 3.0], [8.8, 3.0], [8.9, 3.0], [9.0, 3.0], [9.1, 3.0], [9.2, 3.0], [9.3, 3.0], [9.4, 3.0], [9.5, 3.0], [9.6, 3.0], [9.7, 3.0], [9.8, 3.0], [9.9, 3.0], [10.0, 3.0], [10.1, 3.0], [10.2, 3.0], [10.3, 3.0], [10.4, 3.0], [10.5, 3.0], [10.6, 3.0], [10.7, 3.0], [10.8, 3.0], [10.9, 3.0], [11.0, 3.0], [11.1, 3.0], [11.2, 3.0], [11.3, 3.0], [11.4, 3.0], [11.5, 3.0], [11.6, 3.0], [11.7, 3.0], [11.8, 3.0], [11.9, 3.0], [12.0, 3.0], [12.1, 3.0], [12.2, 3.0], [12.3, 3.0], [12.4, 3.0], [12.5, 3.0], [12.6, 3.0], [12.7, 3.0], [12.8, 3.0], [12.9, 3.0], [13.0, 3.0], [13.1, 3.0], [13.2, 3.0], [13.3, 3.0], [13.4, 3.0], [13.5, 3.0], [13.6, 3.0], [13.7, 3.0], [13.8, 3.0], [13.9, 4.0], [14.0, 4.0], [14.1, 4.0], [14.2, 4.0], [14.3, 4.0], [14.4, 4.0], [14.5, 4.0], [14.6, 4.0], [14.7, 4.0], [14.8, 4.0], [14.9, 4.0], [15.0, 4.0], [15.1, 4.0], [15.2, 4.0], [15.3, 4.0], [15.4, 4.0], [15.5, 4.0], [15.6, 4.0], [15.7, 4.0], [15.8, 4.0], [15.9, 4.0], [16.0, 4.0], [16.1, 4.0], [16.2, 4.0], [16.3, 4.0], [16.4, 4.0], [16.5, 4.0], [16.6, 4.0], [16.7, 4.0], [16.8, 4.0], [16.9, 4.0], [17.0, 4.0], [17.1, 4.0], [17.2, 4.0], [17.3, 4.0], [17.4, 4.0], [17.5, 4.0], [17.6, 4.0], [17.7, 4.0], [17.8, 4.0], [17.9, 4.0], [18.0, 4.0], [18.1, 4.0], [18.2, 4.0], [18.3, 4.0], [18.4, 4.0], [18.5, 4.0], [18.6, 4.0], [18.7, 4.0], [18.8, 4.0], [18.9, 4.0], [19.0, 4.0], [19.1, 4.0], [19.2, 4.0], [19.3, 4.0], [19.4, 5.0], [19.5, 5.0], [19.6, 5.0], [19.7, 5.0], [19.8, 5.0], [19.9, 5.0], [20.0, 5.0], [20.1, 5.0], [20.2, 5.0], [20.3, 5.0], [20.4, 5.0], [20.5, 5.0], [20.6, 5.0], [20.7, 5.0], [20.8, 5.0], [20.9, 5.0], [21.0, 5.0], [21.1, 5.0], [21.2, 5.0], [21.3, 5.0], [21.4, 5.0], [21.5, 5.0], [21.6, 5.0], [21.7, 5.0], [21.8, 5.0], [21.9, 5.0], [22.0, 5.0], [22.1, 5.0], [22.2, 5.0], [22.3, 5.0], [22.4, 5.0], [22.5, 5.0], [22.6, 5.0], [22.7, 5.0], [22.8, 5.0], [22.9, 5.0], [23.0, 5.0], [23.1, 5.0], [23.2, 5.0], [23.3, 5.0], [23.4, 5.0], [23.5, 5.0], [23.6, 5.0], [23.7, 5.0], [23.8, 5.0], [23.9, 6.0], [24.0, 6.0], [24.1, 6.0], [24.2, 6.0], [24.3, 6.0], [24.4, 6.0], [24.5, 6.0], [24.6, 6.0], [24.7, 6.0], [24.8, 6.0], [24.9, 6.0], [25.0, 6.0], [25.1, 6.0], [25.2, 6.0], [25.3, 6.0], [25.4, 6.0], [25.5, 6.0], [25.6, 6.0], [25.7, 6.0], [25.8, 6.0], [25.9, 6.0], [26.0, 6.0], [26.1, 6.0], [26.2, 6.0], [26.3, 6.0], [26.4, 6.0], [26.5, 6.0], [26.6, 6.0], [26.7, 6.0], [26.8, 6.0], [26.9, 6.0], [27.0, 6.0], [27.1, 6.0], [27.2, 7.0], [27.3, 7.0], [27.4, 7.0], [27.5, 7.0], [27.6, 7.0], [27.7, 7.0], [27.8, 7.0], [27.9, 7.0], [28.0, 7.0], [28.1, 7.0], [28.2, 7.0], [28.3, 7.0], [28.4, 7.0], [28.5, 7.0], [28.6, 7.0], [28.7, 7.0], [28.8, 7.0], [28.9, 7.0], [29.0, 7.0], [29.1, 7.0], [29.2, 7.0], [29.3, 7.0], [29.4, 7.0], [29.5, 7.0], [29.6, 7.0], [29.7, 7.0], [29.8, 8.0], [29.9, 8.0], [30.0, 8.0], [30.1, 8.0], [30.2, 8.0], [30.3, 8.0], [30.4, 8.0], [30.5, 8.0], [30.6, 8.0], [30.7, 8.0], [30.8, 8.0], [30.9, 8.0], [31.0, 8.0], [31.1, 8.0], [31.2, 8.0], [31.3, 8.0], [31.4, 8.0], [31.5, 8.0], [31.6, 9.0], [31.7, 9.0], [31.8, 9.0], [31.9, 9.0], [32.0, 9.0], [32.1, 9.0], [32.2, 9.0], [32.3, 9.0], [32.4, 9.0], [32.5, 9.0], [32.6, 9.0], [32.7, 9.0], [32.8, 9.0], [32.9, 9.0], [33.0, 9.0], [33.1, 9.0], [33.2, 10.0], [33.3, 10.0], [33.4, 10.0], [33.5, 10.0], [33.6, 10.0], [33.7, 10.0], [33.8, 10.0], [33.9, 10.0], [34.0, 10.0], [34.1, 10.0], [34.2, 10.0], [34.3, 10.0], [34.4, 10.0], [34.5, 10.0], [34.6, 11.0], [34.7, 11.0], [34.8, 11.0], [34.9, 11.0], [35.0, 11.0], [35.1, 11.0], [35.2, 11.0], [35.3, 11.0], [35.4, 11.0], [35.5, 11.0], [35.6, 11.0], [35.7, 11.0], [35.8, 12.0], [35.9, 12.0], [36.0, 12.0], [36.1, 12.0], [36.2, 12.0], [36.3, 12.0], [36.4, 12.0], [36.5, 12.0], [36.6, 12.0], [36.7, 12.0], [36.8, 12.0], [36.9, 13.0], [37.0, 13.0], [37.1, 13.0], [37.2, 13.0], [37.3, 13.0], [37.4, 13.0], [37.5, 13.0], [37.6, 13.0], [37.7, 13.0], [37.8, 13.0], [37.9, 14.0], [38.0, 14.0], [38.1, 14.0], [38.2, 14.0], [38.3, 14.0], [38.4, 14.0], [38.5, 14.0], [38.6, 14.0], [38.7, 14.0], [38.8, 15.0], [38.9, 15.0], [39.0, 15.0], [39.1, 15.0], [39.2, 15.0], [39.3, 15.0], [39.4, 15.0], [39.5, 15.0], [39.6, 16.0], [39.7, 16.0], [39.8, 16.0], [39.9, 16.0], [40.0, 16.0], [40.1, 16.0], [40.2, 16.0], [40.3, 16.0], [40.4, 17.0], [40.5, 17.0], [40.6, 17.0], [40.7, 17.0], [40.8, 17.0], [40.9, 17.0], [41.0, 17.0], [41.1, 17.0], [41.2, 17.0], [41.3, 18.0], [41.4, 18.0], [41.5, 18.0], [41.6, 18.0], [41.7, 18.0], [41.8, 18.0], [41.9, 18.0], [42.0, 18.0], [42.1, 19.0], [42.2, 19.0], [42.3, 19.0], [42.4, 19.0], [42.5, 19.0], [42.6, 19.0], [42.7, 19.0], [42.8, 20.0], [42.9, 20.0], [43.0, 20.0], [43.1, 20.0], [43.2, 20.0], [43.3, 20.0], [43.4, 20.0], [43.5, 21.0], [43.6, 21.0], [43.7, 21.0], [43.8, 21.0], [43.9, 21.0], [44.0, 21.0], [44.1, 21.0], [44.2, 22.0], [44.3, 22.0], [44.4, 22.0], [44.5, 22.0], [44.6, 22.0], [44.7, 22.0], [44.8, 23.0], [44.9, 23.0], [45.0, 23.0], [45.1, 23.0], [45.2, 23.0], [45.3, 23.0], [45.4, 24.0], [45.5, 24.0], [45.6, 24.0], [45.7, 24.0], [45.8, 24.0], [45.9, 24.0], [46.0, 24.0], [46.1, 25.0], [46.2, 25.0], [46.3, 25.0], [46.4, 25.0], [46.5, 25.0], [46.6, 26.0], [46.7, 26.0], [46.8, 26.0], [46.9, 26.0], [47.0, 27.0], [47.1, 27.0], [47.2, 27.0], [47.3, 27.0], [47.4, 28.0], [47.5, 28.0], [47.6, 28.0], [47.7, 28.0], [47.8, 28.0], [47.9, 29.0], [48.0, 29.0], [48.1, 29.0], [48.2, 29.0], [48.3, 30.0], [48.4, 30.0], [48.5, 30.0], [48.6, 30.0], [48.7, 31.0], [48.8, 31.0], [48.9, 31.0], [49.0, 31.0], [49.1, 32.0], [49.2, 32.0], [49.3, 32.0], [49.4, 32.0], [49.5, 32.0], [49.6, 33.0], [49.7, 33.0], [49.8, 33.0], [49.9, 33.0], [50.0, 34.0], [50.1, 34.0], [50.2, 34.0], [50.3, 34.0], [50.4, 34.0], [50.5, 35.0], [50.6, 35.0], [50.7, 35.0], [50.8, 35.0], [50.9, 36.0], [51.0, 36.0], [51.1, 36.0], [51.2, 36.0], [51.3, 36.0], [51.4, 37.0], [51.5, 37.0], [51.6, 37.0], [51.7, 37.0], [51.8, 38.0], [51.9, 38.0], [52.0, 39.0], [52.1, 39.0], [52.2, 39.0], [52.3, 39.0], [52.4, 39.0], [52.5, 39.0], [52.6, 40.0], [52.7, 40.0], [52.8, 40.0], [52.9, 40.0], [53.0, 40.0], [53.1, 41.0], [53.2, 41.0], [53.3, 41.0], [53.4, 41.0], [53.5, 42.0], [53.6, 42.0], [53.7, 42.0], [53.8, 42.0], [53.9, 42.0], [54.0, 43.0], [54.1, 43.0], [54.2, 43.0], [54.3, 43.0], [54.4, 44.0], [54.5, 44.0], [54.6, 44.0], [54.7, 44.0], [54.8, 44.0], [54.9, 44.0], [55.0, 44.0], [55.1, 45.0], [55.2, 45.0], [55.3, 45.0], [55.4, 45.0], [55.5, 45.0], [55.6, 45.0], [55.7, 45.0], [55.8, 45.0], [55.9, 46.0], [56.0, 46.0], [56.1, 46.0], [56.2, 46.0], [56.3, 46.0], [56.4, 46.0], [56.5, 46.0], [56.6, 46.0], [56.7, 46.0], [56.8, 46.0], [56.9, 47.0], [57.0, 47.0], [57.1, 47.0], [57.2, 47.0], [57.3, 47.0], [57.4, 47.0], [57.5, 47.0], [57.6, 47.0], [57.7, 48.0], [57.8, 48.0], [57.9, 48.0], [58.0, 48.0], [58.1, 48.0], [58.2, 48.0], [58.3, 48.0], [58.4, 48.0], [58.5, 48.0], [58.6, 48.0], [58.7, 49.0], [58.8, 49.0], [58.9, 49.0], [59.0, 49.0], [59.1, 49.0], [59.2, 49.0], [59.3, 49.0], [59.4, 50.0], [59.5, 50.0], [59.6, 50.0], [59.7, 50.0], [59.8, 50.0], [59.9, 50.0], [60.0, 50.0], [60.1, 51.0], [60.2, 51.0], [60.3, 51.0], [60.4, 51.0], [60.5, 51.0], [60.6, 51.0], [60.7, 51.0], [60.8, 52.0], [60.9, 52.0], [61.0, 52.0], [61.1, 52.0], [61.2, 52.0], [61.3, 52.0], [61.4, 52.0], [61.5, 52.0], [61.6, 53.0], [61.7, 53.0], [61.8, 53.0], [61.9, 53.0], [62.0, 53.0], [62.1, 53.0], [62.2, 53.0], [62.3, 54.0], [62.4, 54.0], [62.5, 54.0], [62.6, 54.0], [62.7, 54.0], [62.8, 54.0], [62.9, 54.0], [63.0, 54.0], [63.1, 55.0], [63.2, 55.0], [63.3, 55.0], [63.4, 55.0], [63.5, 55.0], [63.6, 55.0], [63.7, 55.0], [63.8, 56.0], [63.9, 56.0], [64.0, 56.0], [64.1, 56.0], [64.2, 56.0], [64.3, 56.0], [64.4, 57.0], [64.5, 57.0], [64.6, 57.0], [64.7, 57.0], [64.8, 57.0], [64.9, 57.0], [65.0, 57.0], [65.1, 57.0], [65.2, 58.0], [65.3, 58.0], [65.4, 58.0], [65.5, 58.0], [65.6, 58.0], [65.7, 58.0], [65.8, 59.0], [65.9, 59.0], [66.0, 59.0], [66.1, 59.0], [66.2, 59.0], [66.3, 59.0], [66.4, 59.0], [66.5, 59.0], [66.6, 60.0], [66.7, 60.0], [66.8, 60.0], [66.9, 60.0], [67.0, 60.0], [67.1, 60.0], [67.2, 60.0], [67.3, 61.0], [67.4, 61.0], [67.5, 61.0], [67.6, 61.0], [67.7, 61.0], [67.8, 61.0], [67.9, 61.0], [68.0, 62.0], [68.1, 62.0], [68.2, 62.0], [68.3, 62.0], [68.4, 62.0], [68.5, 62.0], [68.6, 63.0], [68.7, 63.0], [68.8, 63.0], [68.9, 63.0], [69.0, 63.0], [69.1, 63.0], [69.2, 63.0], [69.3, 64.0], [69.4, 64.0], [69.5, 64.0], [69.6, 64.0], [69.7, 64.0], [69.8, 64.0], [69.9, 65.0], [70.0, 65.0], [70.1, 65.0], [70.2, 65.0], [70.3, 65.0], [70.4, 65.0], [70.5, 65.0], [70.6, 66.0], [70.7, 66.0], [70.8, 66.0], [70.9, 66.0], [71.0, 66.0], [71.1, 66.0], [71.2, 67.0], [71.3, 67.0], [71.4, 67.0], [71.5, 67.0], [71.6, 67.0], [71.7, 67.0], [71.8, 68.0], [71.9, 68.0], [72.0, 68.0], [72.1, 68.0], [72.2, 68.0], [72.3, 68.0], [72.4, 68.0], [72.5, 69.0], [72.6, 69.0], [72.7, 69.0], [72.8, 69.0], [72.9, 69.0], [73.0, 69.0], [73.1, 70.0], [73.2, 70.0], [73.3, 70.0], [73.4, 70.0], [73.5, 70.0], [73.6, 70.0], [73.7, 70.0], [73.8, 71.0], [73.9, 71.0], [74.0, 71.0], [74.1, 71.0], [74.2, 71.0], [74.3, 71.0], [74.4, 72.0], [74.5, 72.0], [74.6, 72.0], [74.7, 72.0], [74.8, 72.0], [74.9, 72.0], [75.0, 72.0], [75.1, 72.0], [75.2, 72.0], [75.3, 73.0], [75.4, 73.0], [75.5, 73.0], [75.6, 73.0], [75.7, 73.0], [75.8, 73.0], [75.9, 73.0], [76.0, 73.0], [76.1, 73.0], [76.2, 74.0], [76.3, 74.0], [76.4, 74.0], [76.5, 74.0], [76.6, 74.0], [76.7, 74.0], [76.8, 74.0], [76.9, 74.0], [77.0, 75.0], [77.1, 75.0], [77.2, 75.0], [77.3, 75.0], [77.4, 75.0], [77.5, 75.0], [77.6, 75.0], [77.7, 75.0], [77.8, 75.0], [77.9, 75.0], [78.0, 76.0], [78.1, 76.0], [78.2, 76.0], [78.3, 76.0], [78.4, 76.0], [78.5, 76.0], [78.6, 76.0], [78.7, 76.0], [78.8, 76.0], [78.9, 76.0], [79.0, 77.0], [79.1, 77.0], [79.2, 77.0], [79.3, 77.0], [79.4, 77.0], [79.5, 77.0], [79.6, 77.0], [79.7, 77.0], [79.8, 77.0], [79.9, 77.0], [80.0, 77.0], [80.1, 78.0], [80.2, 78.0], [80.3, 78.0], [80.4, 78.0], [80.5, 78.0], [80.6, 78.0], [80.7, 78.0], [80.8, 78.0], [80.9, 78.0], [81.0, 79.0], [81.1, 79.0], [81.2, 79.0], [81.3, 79.0], [81.4, 79.0], [81.5, 79.0], [81.6, 79.0], [81.7, 79.0], [81.8, 79.0], [81.9, 79.0], [82.0, 80.0], [82.1, 80.0], [82.2, 80.0], [82.3, 80.0], [82.4, 80.0], [82.5, 80.0], [82.6, 80.0], [82.7, 80.0], [82.8, 80.0], [82.9, 80.0], [83.0, 81.0], [83.1, 81.0], [83.2, 81.0], [83.3, 81.0], [83.4, 81.0], [83.5, 81.0], [83.6, 81.0], [83.7, 81.0], [83.8, 81.0], [83.9, 81.0], [84.0, 82.0], [84.1, 82.0], [84.2, 82.0], [84.3, 82.0], [84.4, 82.0], [84.5, 82.0], [84.6, 82.0], [84.7, 82.0], [84.8, 82.0], [84.9, 82.0], [85.0, 83.0], [85.1, 83.0], [85.2, 83.0], [85.3, 83.0], [85.4, 83.0], [85.5, 83.0], [85.6, 83.0], [85.7, 83.0], [85.8, 83.0], [85.9, 83.0], [86.0, 84.0], [86.1, 84.0], [86.2, 84.0], [86.3, 84.0], [86.4, 84.0], [86.5, 84.0], [86.6, 84.0], [86.7, 84.0], [86.8, 85.0], [86.9, 85.0], [87.0, 85.0], [87.1, 85.0], [87.2, 85.0], [87.3, 85.0], [87.4, 85.0], [87.5, 85.0], [87.6, 85.0], [87.7, 86.0], [87.8, 86.0], [87.9, 86.0], [88.0, 86.0], [88.1, 86.0], [88.2, 86.0], [88.3, 86.0], [88.4, 86.0], [88.5, 86.0], [88.6, 87.0], [88.7, 87.0], [88.8, 87.0], [88.9, 87.0], [89.0, 87.0], [89.1, 87.0], [89.2, 87.0], [89.3, 87.0], [89.4, 87.0], [89.5, 88.0], [89.6, 88.0], [89.7, 88.0], [89.8, 88.0], [89.9, 88.0], [90.0, 88.0], [90.1, 88.0], [90.2, 88.0], [90.3, 89.0], [90.4, 89.0], [90.5, 89.0], [90.6, 89.0], [90.7, 89.0], [90.8, 89.0], [90.9, 89.0], [91.0, 89.0], [91.1, 90.0], [91.2, 90.0], [91.3, 90.0], [91.4, 90.0], [91.5, 90.0], [91.6, 90.0], [91.7, 90.0], [91.8, 91.0], [91.9, 91.0], [92.0, 91.0], [92.1, 91.0], [92.2, 91.0], [92.3, 91.0], [92.4, 92.0], [92.5, 92.0], [92.6, 92.0], [92.7, 92.0], [92.8, 92.0], [92.9, 92.0], [93.0, 93.0], [93.1, 93.0], [93.2, 93.0], [93.3, 93.0], [93.4, 93.0], [93.5, 94.0], [93.6, 94.0], [93.7, 94.0], [93.8, 94.0], [93.9, 94.0], [94.0, 95.0], [94.1, 95.0], [94.2, 95.0], [94.3, 95.0], [94.4, 96.0], [94.5, 96.0], [94.6, 96.0], [94.7, 97.0], [94.8, 97.0], [94.9, 97.0], [95.0, 98.0], [95.1, 98.0], [95.2, 98.0], [95.3, 99.0], [95.4, 99.0], [95.5, 99.0], [95.6, 100.0], [95.7, 101.0], [95.8, 102.0], [95.9, 103.0], [96.0, 104.0], [96.1, 106.0], [96.2, 108.0], [96.3, 109.0], [96.4, 111.0], [96.5, 115.0], [96.6, 118.0], [96.7, 123.0], [96.8, 126.0], [96.9, 131.0], [97.0, 133.0], [97.1, 137.0], [97.2, 139.0], [97.3, 141.0], [97.4, 148.0], [97.5, 159.0], [97.6, 165.0], [97.7, 173.0], [97.8, 190.0], [97.9, 197.0], [98.0, 206.0], [98.1, 218.0], [98.2, 225.0], [98.3, 235.0], [98.4, 239.0], [98.5, 244.0], [98.6, 248.0], [98.7, 255.0], [98.8, 259.0], [98.9, 267.0], [99.0, 278.0], [99.1, 286.0], [99.2, 296.0], [99.3, 326.0], [99.4, 340.0], [99.5, 364.0], [99.6, 409.0], [99.7, 432.0], [99.8, 514.0], [99.9, 547.0], [100.0, 633.0]], "isOverall": false, "label": "01 - User Login", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 4.0, "minX": 0.0, "maxY": 39637.0, "series": [{"data": [[0.0, 39637.0], [300.0, 145.0], [600.0, 4.0], [100.0, 1006.0], [200.0, 539.0], [400.0, 82.0], [500.0, 85.0]], "isOverall": false, "label": "01 - User Login", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 600.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 41469.0, "series": [{"data": [[0.0, 28.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 1.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 41469.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 87.5220533834159, "minX": 1.78693698E12, "maxY": 100.0, "series": [{"data": [[1.78693698E12, 87.5220533834159], [1.7869371E12, 99.93907692307693], [1.78693704E12, 100.0]], "isOverall": false, "label": "Auth Stress Users", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7869371E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 3.0, "minX": 1.0, "maxY": 273.7346938775509, "series": [{"data": [[3.0, 66.0], [4.0, 161.16666666666669], [5.0, 7.4], [6.0, 4.800000000000001], [7.0, 4.999999999999999], [8.0, 5.923076923076923], [9.0, 5.363636363636364], [10.0, 5.533333333333333], [11.0, 5.533333333333333], [12.0, 5.333333333333333], [13.0, 6.857142857142858], [14.0, 8.411764705882353], [15.0, 6.391304347826087], [16.0, 3.619047619047619], [17.0, 3.423076923076924], [18.0, 3.333333333333334], [19.0, 3.851851851851852], [20.0, 4.307692307692308], [21.0, 5.484848484848484], [22.0, 4.0], [23.0, 4.852941176470588], [24.0, 4.457142857142856], [25.0, 4.6999999999999975], [26.0, 7.75], [27.0, 5.757575757575759], [28.0, 12.17391304347826], [29.0, 12.027777777777775], [30.0, 39.42857142857143], [31.0, 231.89285714285717], [32.0, 119.03448275862067], [33.0, 35.62222222222223], [34.0, 130.22222222222223], [35.0, 14.711111111111107], [36.0, 6.6000000000000005], [37.0, 7.999999999999997], [38.0, 9.2], [39.0, 6.450980392156865], [40.0, 7.344827586206897], [41.0, 11.21311475409836], [42.0, 9.576271186440676], [43.0, 10.83636363636364], [44.0, 8.227272727272727], [45.0, 65.08], [46.0, 149.50877192982455], [47.0, 9.125], [48.0, 12.69444444444444], [49.0, 7.296875000000002], [50.0, 6.670588235294119], [51.0, 4.31578947368421], [52.0, 5.5301204819277086], [53.0, 5.2638888888888875], [54.0, 4.738095238095239], [55.0, 4.794871794871794], [56.0, 5.246913580246914], [57.0, 7.61904761904762], [58.0, 5.315068493150684], [59.0, 4.191919191919191], [60.0, 5.59154929577465], [61.0, 11.90909090909091], [62.0, 26.485436893203886], [63.0, 10.532467532467528], [64.0, 6.7604166666666625], [65.0, 5.662921348314608], [66.0, 4.108910891089109], [67.0, 7.063157894736844], [68.0, 13.477611940298507], [69.0, 35.38016528925621], [70.0, 30.88235294117646], [71.0, 8.697674418604654], [72.0, 9.653225806451614], [73.0, 6.213483146067414], [74.0, 6.458715596330274], [75.0, 5.707964601769911], [76.0, 8.302325581395353], [77.0, 10.573033707865166], [78.0, 42.4201680672269], [79.0, 39.77551020408161], [80.0, 39.37864077669904], [81.0, 97.4390243902439], [82.0, 109.04597701149427], [83.0, 77.38095238095238], [84.0, 273.7346938775509], [85.0, 69.39669421487605], [86.0, 15.964601769911498], [87.0, 7.716535433070866], [88.0, 8.523809523809518], [89.0, 15.596774193548397], [90.0, 10.310924369747898], [91.0, 87.19047619047618], [92.0, 69.3809523809524], [93.0, 270.4646464646464], [94.0, 44.746987951807235], [95.0, 62.03030303030304], [96.0, 20.942857142857157], [97.0, 6.356060606060609], [98.0, 9.13768115942029], [99.0, 9.870229007633588], [100.0, 47.92597650137964], [1.0, 3.0]], "isOverall": false, "label": "01 - User Login", "isController": false}, {"data": [[94.7142271916718, 44.924357800375596]], "isOverall": false, "label": "01 - User Login-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 0.0, "minX": 1.78693698E12, "maxY": 817439.1, "series": [{"data": [[1.78693698E12, 92084.3], [1.7869371E12, 63022.916666666664], [1.78693704E12, 817439.1]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.78693698E12, 67648.33333333333], [1.7869371E12, 0.0], [1.78693704E12, 5451.7]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7869371E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 30.021911103522815, "minX": 1.78693698E12, "maxY": 56.10644785221041, "series": [{"data": [[1.78693698E12, 30.021911103522815], [1.7869371E12, 52.59692307692309], [1.78693704E12, 56.10644785221041]], "isOverall": false, "label": "01 - User Login", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7869371E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.78693698E12, "maxY": 29.94434010585611, "series": [{"data": [[1.78693698E12, 29.94434010585611], [1.7869371E12, 0.0], [1.78693704E12, 2.234149403640936]], "isOverall": false, "label": "01 - User Login", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7869371E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.8487280177565298, "minX": 1.78693698E12, "maxY": 53.98121244731394, "series": [{"data": [[1.78693698E12, 0.8487280177565298], [1.7869371E12, 52.58338461538456], [1.78693704E12, 53.98121244731394]], "isOverall": false, "label": "01 - User Login", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7869371E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 3.0, "minX": 1.78693698E12, "maxY": 546.0, "series": [{"data": [[1.78693698E12, 546.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.78693698E12, 3.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.78693698E12, 18.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.78693698E12, 546.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.78693698E12, 6.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.78693698E12, 471.5]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78693698E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 3.0, "minX": 19.0, "maxY": 262.0, "series": [{"data": [[35.0, 7.0], [68.0, 5.0], [19.0, 7.0], [54.0, 6.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[19.0, 6.0], [35.0, 5.0], [54.0, 5.0], [68.0, 4.0], [78.0, 129.0], [87.0, 3.0], [99.0, 70.0], [102.0, 4.0], [119.0, 4.0], [124.0, 6.0], [145.0, 17.0], [163.0, 228.0], [169.0, 16.0], [182.0, 7.0], [193.0, 7.0], [222.0, 7.0], [233.0, 262.0], [248.0, 13.5], [254.0, 51.5], [256.0, 4.0], [283.0, 6.0], [276.0, 86.0], [290.0, 18.0], [303.0, 91.0], [306.0, 75.0], [309.0, 18.0], [312.0, 21.0], [316.0, 10.0], [317.0, 82.0], [308.0, 74.0], [304.0, 87.0], [307.0, 77.0], [305.0, 85.0], [332.0, 18.0], [328.0, 51.0], [333.0, 40.0], [337.0, 34.0], [359.0, 5.0], [365.0, 9.0], [397.0, 30.0], [392.0, 11.0], [412.0, 41.0], [410.0, 13.0], [411.0, 18.0], [413.0, 46.0], [403.0, 67.0], [402.0, 77.0], [401.0, 93.0], [409.0, 44.0], [407.0, 47.0], [406.0, 49.0], [404.0, 49.0], [405.0, 70.0], [424.0, 42.0], [427.0, 35.0], [421.0, 50.0], [416.0, 35.5], [430.0, 35.0], [436.0, 18.0], [441.0, 27.0], [452.0, 16.0], [467.0, 8.0], [472.0, 4.0], [474.0, 12.0], [466.0, 4.0], [479.0, 4.0], [476.0, 3.0], [477.0, 5.0], [489.0, 4.0], [491.0, 3.0], [485.0, 3.0], [493.0, 4.0], [488.0, 6.0], [480.0, 3.0], [492.0, 4.0], [494.0, 9.5], [498.0, 4.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 498.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 19.0, "maxY": 262.0, "series": [{"data": [[35.0, 6.0], [68.0, 5.0], [19.0, 7.0], [54.0, 5.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[19.0, 5.0], [35.0, 5.0], [54.0, 5.0], [68.0, 4.0], [78.0, 128.5], [87.0, 3.0], [99.0, 0.0], [102.0, 4.0], [119.0, 4.0], [124.0, 6.0], [145.0, 17.0], [163.0, 228.0], [169.0, 15.0], [182.0, 7.0], [193.0, 7.0], [222.0, 7.0], [233.0, 262.0], [248.0, 13.5], [254.0, 51.5], [256.0, 4.0], [283.0, 6.0], [276.0, 86.0], [290.0, 18.0], [303.0, 0.0], [306.0, 0.0], [309.0, 1.0], [312.0, 0.5], [316.0, 10.0], [317.0, 82.0], [308.0, 0.0], [304.0, 0.0], [307.0, 0.0], [305.0, 0.0], [332.0, 18.0], [328.0, 51.0], [333.0, 0.0], [337.0, 0.0], [359.0, 5.0], [365.0, 9.0], [397.0, 30.0], [392.0, 11.0], [412.0, 0.0], [410.0, 4.0], [411.0, 0.0], [413.0, 0.0], [403.0, 0.0], [402.0, 0.0], [401.0, 0.0], [409.0, 0.0], [407.0, 0.0], [406.0, 0.0], [404.0, 0.0], [405.0, 0.0], [424.0, 0.0], [427.0, 0.0], [421.0, 0.0], [416.0, 0.0], [430.0, 0.0], [436.0, 18.0], [441.0, 0.0], [452.0, 16.0], [467.0, 8.0], [472.0, 4.0], [474.0, 12.0], [466.0, 4.0], [479.0, 4.0], [476.0, 3.0], [477.0, 2.0], [489.0, 4.0], [491.0, 3.0], [485.0, 3.0], [493.0, 4.0], [488.0, 6.0], [480.0, 3.0], [492.0, 4.0], [494.0, 9.0], [498.0, 3.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 498.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 25.516666666666666, "minX": 1.78693698E12, "maxY": 373.2, "series": [{"data": [[1.78693698E12, 292.9166666666667], [1.7869371E12, 25.516666666666666], [1.78693704E12, 373.2]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7869371E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.48333333333333334, "minX": 1.78693698E12, "maxY": 348.1, "series": [{"data": [[1.78693698E12, 0.48333333333333334]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.78693698E12, 0.5166666666666667]], "isOverall": false, "label": "401", "isController": false}, {"data": [[1.78693698E12, 291.85], [1.78693704E12, 23.6]], "isOverall": false, "label": "403", "isController": false}, {"data": [[1.7869371E12, 27.083333333333332], [1.78693704E12, 348.1]], "isOverall": false, "label": "Non HTTP response code: java.net.BindException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7869371E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.48333333333333334, "minX": 1.78693698E12, "maxY": 371.7, "series": [{"data": [[1.78693698E12, 0.48333333333333334]], "isOverall": false, "label": "01 - User Login-success", "isController": false}, {"data": [[1.78693698E12, 292.3666666666667], [1.7869371E12, 27.083333333333332], [1.78693704E12, 371.7]], "isOverall": false, "label": "01 - User Login-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7869371E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.48333333333333334, "minX": 1.78693698E12, "maxY": 371.7, "series": [{"data": [[1.78693698E12, 0.48333333333333334]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.78693698E12, 292.3666666666667], [1.7869371E12, 27.083333333333332], [1.78693704E12, 371.7]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7869371E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

