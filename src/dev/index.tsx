import React, {useState} from "react";
import "./index.css";
import { FlexChart } from "../flex-chart";
import { round } from "lodash";
import { testCategoryData, testData1, testData2 } from "./testData";

/**
 * Dev
 */
const Dev = () => {
  const [autoFit, setAutoFit] = useState(false);
  
  return (
    <div className="wrap">
      {/*<div>*/}
      {/*  <button onClick={() => setAutoFit(!autoFit)}>测试按钮</button>*/}
      {/*</div>*/}
      <div className="testFlexChart">
        <FlexChart
          // vertical/horizontal/verticalInverse/horizontalInverse
          // theme="horizontalInverse"
          resizeObserver
          data={testData1}
          seriesTypes="line"
          // seriesTypes={["bar", "line", "line"]}
          // categoryData={testCategoryData}
          autoFit={autoFit}
          // legendPlacement="left"
          options={{
            // grid: {
            //   top: 50,
            // },
            // series: [{symbol: "emptyCircle"}, {symbol: "triangle"}, {symbol: "rect"}, {symbol: "circle"}, {symbol: "diamond"}, {symbol: "arrow"}, {symbol: "roundRect"}, {symbol: "pin"}],
            // series: [{}, {}, {}, {}, {data: [],symbol: "arrow"}, {symbol: "diamond"}, {symbol: "roundRect"}, {symbol: "pin"}],
            xAxis: {
              axisLabel: {
                // color: "red",
                // formatter: (value: number) => {
                //   let valueTemp = `${value}`;
                //   if (value >= 10000 && value < 10000000) {
                //     valueTemp = `${round(value / 10000, 2)}W`;
                //   } else if (value >= 10000000) {
                //     valueTemp = `${round(value / 10000000, 2)}KW`;
                //   }
                //   return valueTemp;
                // },
              },
              // name: "单位：件数",
              // position: "top",
              // inverse: true,
            },
            yAxis: {
              name: "单位：件数",
              axisLabel: {
                // margin: 18,
                formatter: (value: number) => {
                  let valueTemp = `${value}`;
                  if (value >= 10000 && value < 10000000) {
                    valueTemp = `${round(value / 10000, 2)}W`;
                  } else if (value >= 10000000) {
                    valueTemp = `${round(value / 10000000, 2)}KW`;
                  }
                  return valueTemp;
                },
              },
              // position: "right",
              // inverse: true,
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "line",
              },
            },
            // grid: {
            //   bottom: 20,
            // },
            legend: {
              // itemWidth: 0,
              // itemGap: 0,
              // top: 0,
              // bottom: 0,
              // left: 0,
              // right: 0,
              // width: 190,
              // padding: 8,
              // type: "scroll",
              // orient: "vertical",
              // show: false,
            },
          }}
        />
      </div>
    </div>
  );
}

export default Dev;
