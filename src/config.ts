import fs from "fs";
import os from "os";
import path from "path";

type Config = { dbUrl: string; currentUserName: string };

export function setUser(user_name: string): void {
  let currentConfig: Config;
  try {
    currentConfig = readConfig();
  } catch (error) {
    currentConfig = {
      dbUrl: "postgres://postgres:1412@localhost:5432/blog_aggregator?sslmode=disable",
      currentUserName: user_name
    };
  }
  writeConfig({ ...currentConfig, currentUserName: user_name });
}
export function readConfig(): Config {
  try {
    const configPath = getConfigFilePath();
    const fileContent = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    return validateConfig(fileContent);
  } catch (error) {
    throw new Error("Failed to read config file: " + error);
  }
}

function getConfigFilePath(): string {
  return path.join(os.homedir(), "/.gatorconfig.json");
}
function writeConfig(cfg: Config): void {
  fs.writeFileSync(getConfigFilePath(), JSON.stringify(cfg, null, 2));
}
function validateConfig(rawConfig: any): Config {
  if (typeof rawConfig !== "object" || rawConfig === null) {
    throw new Error("Invalid config format: expected an object.");
  } else if (typeof rawConfig.currentUserName !== "string") {
    throw new Error(
      "Invalid config format: expected a string value for currentUserName.",
    );
  } else if (typeof rawConfig.dbUrl !== "string") {
    throw new Error(
      "Invalid config format: expected a string value for dbUrl.",
    );
  } else {
    return rawConfig as Config;
  }
}
