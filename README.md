<div align="center">
<h1>FlexChart</h1>

**re**act **s**tate eas**y**

<h3>封装echarts的自动化布局处理的灵活图表</h3>

[![GitHub license](https://img.shields.io/github/license/lsbFlying/flex-chart?style=flat-square)](https://github.com/lsbFlying/flex-chart/blob/master/LICENSE)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/lsbFlying/flex-chart/CI?color=blue&style=flat-square)](https://github.com/lsbFlying/flex-chart/actions/workflows/test.yml)
[![npm type definitions](https://img.shields.io/npm/types/typescript?color=orange&style=flat-square)](https://github.com/lsbFlying/flex-chart/blob/master/src/flex-chart/index.tsx)
[![npm](https://img.shields.io/npm/v/flex-chart?color=blue&style=flat-square)](https://www.npmjs.com/package/flex-chart)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/flex-chart?color=brightgreen&style=flat-square)](https://bundlephobia.com/package/flex-chart)

</div>

---

### Install
```sh
npm i flex-chart

# yarn add flex-chart

# `echarts` is the peerDependence of `flex-chart`, you can install echarts with your own version.
npm install --save echarts
```

### features
- 自动化布局处理边界尺寸问题
- 页面布局尺寸变化自动化调整

### Usage
```tsx
import { FlexChart } from "flex-chart";

const testData = [
  {
    name: "衣物销量",
    data: [
      { name: "衬衫", value: 5 },
      { name: "羊毛衫", value: 20 },
      { name: "雪纺衫", value: 36 },
      { name: "裤子", value: 10 },
      { name: "高跟鞋", value: 10 },
      { name: "袜子", value: 56 },
    ],
    // todo data can be directly the value of a single dimension
    // data: [5, 20, 36, 10, 10, 56].
  },
  {
    name: "衣物库存",
    data: [
      { name: "衬衫", value: 2 },
      { name: "羊毛衫", value: 9 },
      { name: "雪纺衫", value: 17 },
      { name: "裤子", value: 3 },
      { name: "高跟鞋", value: 28 },
      { name: "袜子", value: 12 },
    ],
  },
  {
    name: "衣物破损",
    data: [
      { name: "衬衫", value: 5 },
      { name: "羊毛衫", value: 23 },
      { name: "雪纺衫", value: 8 },
      { name: "裤子", value: 11 },
      { name: "高跟鞋", value: 7 },
      { name: "袜子", value: 32 },
    ],
  },
];

function App() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <FlexChart data={testData}/>
    </div>
  );
}
```

### License
[MIT License](https://github.com/lsbFlying/flex-chart/blob/master/LICENSE) (c) [刘善保](https://github.com/lsbFlying)

