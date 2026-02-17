import fs from "fs";
import os from "os";
import path from "path";

type Config = { dbUrl: string, currentUserName: string }

export function setUser(): void {
   const current_user_name = os.userInfo().username;
   writeConfig({dbUrl:"postgres://example",currentUserName: current_user_name});
}
export function readConfig(): Config {
    const configPath = getConfigFilePath();
    const fileContent = JSON.parse(fs.readFileSync(configPath, "utf-8")); 
    return validateConfig(fileContent);
}

function getConfigFilePath(): string
{
    return path.join(os.homedir(), "/.gatorconfig.json");
}
function writeConfig(cfg: Config): void{
    fs.writeFileSync(getConfigFilePath(), JSON.stringify(cfg));
}
function validateConfig(rawConfig: any): Config{
    if (typeof rawConfig !== "object" || rawConfig === null) {
        throw new Error("Invalid config format: expected an object.");
    }   
    else if (typeof rawConfig.currentUserName !== "string") {
        throw new Error("Invalid config format: expected a string value for currentUserName.");
    } 
    else if (typeof rawConfig.dbUrl !== "string") {
        throw new Error("Invalid config format: expected a string value for dbUrl.");
    } 
    else{
        return rawConfig as Config;
    }
}
