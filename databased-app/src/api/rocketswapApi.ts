import http from "@/api/axios";
class RocketSwapApi {
  getBalances(address: string) {
    return http.get(`https://rocketswap.exchange:2053/api/balances/${address}`)
  }
  getMarketSummaries() {
    return http.get(`https://rocketswap.exchange:2053/api/get_market_summaries`)
  }
  getTauLastPrice() {
    return http.get(`https://rocketswap.exchange:2053/api/tau_last_price`)
  }
}

export const rocketSwapApi = new RocketSwapApi();
