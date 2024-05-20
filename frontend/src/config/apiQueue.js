// import "server-only";
import PQueue from "p-queue";
const jikanQueue = new PQueue({
  concurrency: 1,
  intervalCap: 1,
  interval: 500,
});

// function getCurrentTime() {
//   const now = new Date();
//   const hours = String(now.getHours()).padStart(2, "0");
//   const minutes = String(now.getMinutes()).padStart(2, "0");
//   const seconds = String(now.getSeconds()).padStart(2, "0");

//   return `${hours}:${minutes}:${seconds}`;
// }

export async function queueRequest(endpoint, options) {
  // console.log("queueRequest", endpoint, options);
  return jikanQueue.add(async () => {
    // console.log(endpoint);
    return await fetch(endpoint, options).catch((error) => {});
  });
}
