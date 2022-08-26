import {fontSizeMap} from "../static";

/**
 * @description 自适应，在没有scale缩放页面屏幕的情况下使用
 * @param px：当前像素尺寸值或者尺寸数组
 * @param defaultPx：默认设备的分辨率尺寸宽度（以宽度为基准）
 */
export const fit = <P extends unknown>(px: P, defaultPx: number = 1920): P => {
  if (!fit.autoFit) return px;
  // 默认UI设备宽度分辨率按照1920处理（真正开发时按需求设备尺寸更改）
  const clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (!clientWidth) return px;
  if (typeof px === "number") return ((clientWidth * px) / defaultPx) as P;
  return (px as P as number[]).map(item => (clientWidth * item) / defaultPx) as P;
}

/**
 * autoFit：是否禁用autoFit的适配尺寸计算
 */
fit.autoFit = false;

/**
 * @description 精确计算字符串以设置字体大小的个数
 */
export const exactCalcStrFontCount = (s: string | number): number => {
  let count = 0;
  for (const i of `${s}`) {
    const curFontSizeRate = fontSizeMap.get(i);
    if (curFontSizeRate) {
      count += curFontSizeRate;
    } else {
      count++;
    }
  }
  return count;
}

/**
 * 千分位逗号分割(不用Number.toLocaleString("zh", { minimumFractionDigits: n }))或者
 * Number.toLocaleString("zh", { maximumFractionDigits: n })是因为小数点的后续位数保留考量
 **/
export const convertNumToThousand = (num: number | string | undefined | null) => {
  if (num === null || num === undefined || num === "") return "";
  const numStr = `${num}`;
  if (numStr.indexOf(".") === -1) {
    // 不带小数点的情况
    // 将数字转化的字符串反转
    const str = numStr.split("").reverse().join("");
    const len = numStr.split("").length;
    // 每3位加一个千分位逗号
    const convertStr = str.replace(/(\d{3})/g, "$1,");
    // 将加了千分位的字符转再反转回来
    const result = convertStr.split("").reverse().join("");
    // 如果数字的位数是3的整数倍，则去掉开头的逗号
    return len % 3 === 0 ? result.slice(1) : result;
  }
  // 带小数点的情况
  return numStr.replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}
