import { scrapeFeeds } from "../scrapeFeeds";

function parseDuration(durationStr: string): number{
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationStr.match(regex);
    if (!match) {
        throw new Error(`Invalid duration string: ${durationStr}`);
    }
    const value = parseInt(match[1]);
    const unit = match[2];
    switch (unit) {
        case 'ms':
            return value;
        case 's':
            return value * 1000;
        case 'm':
            return value * 60 * 1000;
        case 'h':
            return value * 60 * 60 * 1000;
        default:
            throw new Error(`Unknown time unit: ${unit}`);
    }
}

export async function handleragg(cmdName: string, time_between_reqs: string) {
console.log(`Collecting feeds every ${time_between_reqs}`)
 await scrapeFeeds()
 const interval=setInterval(()=>{scrapeFeeds()}, parseDuration(time_between_reqs))
 await new Promise<void>((resolve) => {
  process.on("SIGINT", () => {
    console.log("Shutting down feed aggregator...");
    clearInterval(interval);
    resolve();
  });
})
};