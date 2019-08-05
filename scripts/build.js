const spawn = require("cross-spawn");
const path = require("path");
const fs = require("fs");
const util = require("util");

const copyFile = util.promisify(fs.copyFile);
const mkdir = util.promisify(fs.mkdir);
const readdir = util.promisify(fs.readdir);

function buildScripts() {
  return new Promise((res, rej) => {
    const building = spawn("yarn", ["build-scripts"], { stdio: "inherit" });

    building.on("close", code => {
      if (code !== 0) {
        return rej(code);
      }

      res();
    });
  });
}

async function build() {
  const root = process.cwd();

  await buildScripts();
  await copyFile(
    path.join(root, "src/manifest.json"),
    path.join(root, "dist/manifest.json")
  );

  const targetImagesDir = path.join(root, "dist/images");
  const srcImagesDir = path.join(root, "src/images");

  try {
    await mkdir(targetImagesDir);
  } catch (e) {}

  const files = await readdir(srcImagesDir);

  for (const file of files) {
    await copyFile(
      path.join(srcImagesDir, file),
      path.join(targetImagesDir, file)
    );
  }
}

build();
