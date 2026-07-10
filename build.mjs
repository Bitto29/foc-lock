import { mkdir, rm, readFile, writeFile, readdir, cp } from "node:fs/promises";
import path from "node:path";
import { minify as minifyHtml } from "html-minifier-terser";
import JavaScriptObfuscator from "javascript-obfuscator";
import CleanCSS from "clean-css";

const SRC = "src";
const DIST = "dist";

const HTML_OPTS = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true
};

const JS_OPTS = {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.35,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.08,
  stringArray: true,
  stringArrayEncoding: ["base64"],
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayThreshold: 0.75,
  splitStrings: true,
  splitStringsChunkLength: 8,
  simplify: true,
  selfDefending: true,
  transformObjectKeys: true,
  renameGlobals: false
};

const CSS_OPTS = { level: 2 };

async function processDir(srcDir, distDir) {
  await mkdir(distDir, { recursive: true });
  const entries = await readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const distPath = path.join(distDir, entry.name);

    if (entry.isDirectory()) {
      await processDir(srcPath, distPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();

    if (ext === ".html") {
      const html = await readFile(srcPath, "utf8");
      const out = await minifyHtml(html, HTML_OPTS);
      await mkdir(path.dirname(distPath), { recursive: true });
      await writeFile(distPath, out, "utf8");
      continue;
    }

    if (ext === ".js") {
      const js = await readFile(srcPath, "utf8");
      const out = JavaScriptObfuscator.obfuscate(js, JS_OPTS).getObfuscatedCode();
      await mkdir(path.dirname(distPath), { recursive: true });
      await writeFile(distPath, out, "utf8");
      continue;
    }

    if (ext === ".css") {
      const css = await readFile(srcPath, "utf8");
      const out = new CleanCSS(CSS_OPTS).minify(css).styles;
      await mkdir(path.dirname(distPath), { recursive: true });
      await writeFile(distPath, out, "utf8");
      continue;
    }

    await mkdir(path.dirname(distPath), { recursive: true });
    await cp(srcPath, distPath);
  }
}

await rm(DIST, { recursive: true, force: true });
await processDir(SRC, DIST);
