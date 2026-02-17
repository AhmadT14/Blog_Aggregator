import {setUser, readConfig} from './config';

function main() {
  setUser();
  console.log(readConfig());
}

main();