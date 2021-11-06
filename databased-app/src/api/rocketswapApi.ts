import http from "@/api/axios";
class RocketSwapApi {
  getBalances(address: string) {
    return http.get(`/api/balances/${address}`)
  }
  
  // getLastText() {
  //   return http.get("/client/self/text/last");
  // }

  // saveNewText(text: string) {
  //   return http.post("/client/self/text", {
  //     text: text
  //   });
  // }

  // getLastSketch() {
  //   return http.get("/client/self/sketch/last");
  // }

  // saveNewSketch(sketchData: string) {
  //   return http.post("/client/self/sketch", {
  //     sketch: sketchData
  //   });
  // }  
}

export const rocketSwapApi = new RocketSwapApi();
