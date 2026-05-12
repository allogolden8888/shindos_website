import { promises as fs } from "fs";
import path from "path";

const rootDir = process.cwd();
const dataDir = path.join(rootDir, "data");

function getDataPath(fileName) {
  return path.join(dataDir, fileName);
}

export async function readJson(fileName) {
  const fullPath = getDataPath(fileName);
  const raw = await fs.readFile(fullPath, "utf-8");
  return JSON.parse(raw);
}

export async function writeJson(fileName, data) {
  const fullPath = getDataPath(fileName);
  await fs.writeFile(fullPath, JSON.stringify(data, null, 2), "utf-8");
}
