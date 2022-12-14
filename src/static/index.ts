import { LoadingOption } from "../model";

/**
 * 特殊字符的尺寸比例（占常规字体设置大小的比例）
 * 整个键盘上能看到的常规字符都有
 * 没有的则是宽度与常规中文字体占据的尺寸是一样的，都按1计算
 */
export const fontSizeMap = new Map();
fontSizeMap.set("|", 0.1962);
fontSizeMap.set("/", 0.5025);
fontSizeMap.set("-", 0.6062);
fontSizeMap.set("_", 0.5016);
fontSizeMap.set("—", 0.5);
fontSizeMap.set("+", 0.6062);
fontSizeMap.set("=", 0.6062);
fontSizeMap.set("{", 0.3333);
fontSizeMap.set("}", 0.3333);
fontSizeMap.set("[", 0.3333);
fontSizeMap.set("]", 0.3333);
fontSizeMap.set("·", 0.5);
fontSizeMap.set("`", 0.3333);
fontSizeMap.set("~", 0.5);
fontSizeMap.set("!", 0.3333);
fontSizeMap.set("@", 0.8583);
fontSizeMap.set("#", 0.6);
fontSizeMap.set("¥", 0.6);
fontSizeMap.set("$", 0.6);
fontSizeMap.set("%", 0.97);
fontSizeMap.set("…", 0.5);
fontSizeMap.set("^", 0.5183);
fontSizeMap.set("&", 0.7266);
fontSizeMap.set("*", 0.5066);
fontSizeMap.set("(", 0.3333);
fontSizeMap.set(")", 0.3333);
fontSizeMap.set("?", 0.5375);
fontSizeMap.set(">", 0.6066);
fontSizeMap.set("<", 0.6066);
fontSizeMap.set(",", 0.265);
fontSizeMap.set(".", 0.2647);
fontSizeMap.set(":", 0.2647);
fontSizeMap.set("'", 0.245);
fontSizeMap.set("\"", 0.4281);
fontSizeMap.set("1", 0.4025);
fontSizeMap.set("0", 0.6);
fontSizeMap.set("2", 0.6);
fontSizeMap.set("3", 0.6);
fontSizeMap.set("4", 0.6);
fontSizeMap.set("5", 0.6);
fontSizeMap.set("6", 0.6);
fontSizeMap.set("7", 0.6);
fontSizeMap.set("8", 0.6);
fontSizeMap.set("9", 0.6);
fontSizeMap.set(" ", 0.3343); // 空格
fontSizeMap.set("a", 0.5602);
fontSizeMap.set("b", 0.587);
fontSizeMap.set("c", 0.548);
fontSizeMap.set("d", 0.5872);
fontSizeMap.set("e", 0.5559);
fontSizeMap.set("f", 0.3437);
fontSizeMap.set("g", 0.592);
fontSizeMap.set("h", 0.5572);
fontSizeMap.set("i", 0.2565);
fontSizeMap.set("j", 0.2682);
fontSizeMap.set("k", 0.5299);
fontSizeMap.set("l", 0.2356);
fontSizeMap.set("m", 0.8554);
fontSizeMap.set("n", 0.5598);
fontSizeMap.set("o", 0.5872);
fontSizeMap.set("p", 0.5872);
fontSizeMap.set("q", 0.5872);
fontSizeMap.set("r", 0.366);
fontSizeMap.set("s", 0.5065);
fontSizeMap.set("t", 0.3554);
fontSizeMap.set("u", 0.5611);
fontSizeMap.set("v", 0.483);
fontSizeMap.set("w", 0.7565);
fontSizeMap.set("x", 0.5104);
fontSizeMap.set("y", 0.4973);
fontSizeMap.set("z", 0.4882);
fontSizeMap.set("A", 0.6575);
fontSizeMap.set("B", 0.6783);
fontSizeMap.set("C", 0.7291);
fontSizeMap.set("D", 0.707);
fontSizeMap.set("E", 0.638);
fontSizeMap.set("F", 0.5781);
fontSizeMap.set("G", 0.7486);
fontSizeMap.set("H", 0.7213);
fontSizeMap.set("I", 0.238);
fontSizeMap.set("J", 0.5182);
fontSizeMap.set("K", 0.6901);
fontSizeMap.set("L", 0.5885);
fontSizeMap.set("M", 0.8828);
fontSizeMap.set("N", 0.72);
fontSizeMap.set("O", 0.7682);
fontSizeMap.set("P", 0.6432);
fontSizeMap.set("Q", 0.7682);
fontSizeMap.set("R", 0.677);
fontSizeMap.set("S", 0.6328);
fontSizeMap.set("T", 0.6197);
fontSizeMap.set("U", 0.7148);
fontSizeMap.set("V", 0.6406);
fontSizeMap.set("W", 0.9313);
fontSizeMap.set("X", 0.6372);
fontSizeMap.set("Y", 0.6633);
fontSizeMap.set("Z", 0.6258);

export const defaultLoadingOption: LoadingOption = {
  text: "loading",
  textColor: "#5398f2",
  color: "#5398f2",
  maskColor: "rgba(0, 0, 0, 0.1)",
  zlevel: 0,
  // 字体大小。从 `v4.8.0` 开始支持。
  fontSize: 12,
  // 是否显示旋转动画（spinner）。从 `v4.8.0` 开始支持。
  showSpinner: true,
  // 旋转动画（spinner）的半径。从 `v4.8.0` 开始支持。
  spinnerRadius: 12,
  // 旋转动画（spinner）的线宽。从 `v4.8.0` 开始支持。
  lineWidth: 2,
  // 字体粗细。从 `v5.0.1` 开始支持。
  fontWeight: "normal",
  // 字体风格。从 `v5.0.1` 开始支持。
  fontStyle: "normal",
  // 字体系列。从 `v5.0.1` 开始支持。
  fontFamily: "sans-serif"
};
