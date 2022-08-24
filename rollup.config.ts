import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import pkg from "./package.json";
import resolvePlugin from "@rollup/plugin-node-resolve";
// @ts-ignore
import babelPlugin from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser"; // 压缩打包文件

const input = "src/index.tsx";
const deps = Object.keys({ ...pkg.dependencies });
const external = (id: string) => deps.some((dep) => id.startsWith(dep));
const plugins = [
  resolvePlugin(),
  babelPlugin({ exclude: 'node_modules/**' }),
  typescript(),
  terser(),
];

// 打包文件的头部声明
const banner =
  "/**\n" +
  ` * ${pkg.name} v${pkg.version}\n` +
  ` * 封装echarts的自动化布局处理的灵活图表\n` +
  ` * created by ${pkg.author}\n` +
  ` * (c) 2020-${new Date().getFullYear()} ${pkg.author}\n` +
  ` * Released under the ${pkg.license} License.\n` +
  " */";

const cjsOutput = { file: pkg.main, format: "cjs", exports: "auto" };
const esmOutput = { file: pkg.module, format: "es" };
const dtsOutput = { file: pkg.types, format: "es", banner };

export default [
  { input, output: cjsOutput, external, plugins },
  { input, output: esmOutput, external, plugins },
  { input, output: dtsOutput, plugins: [dts()] },
];
