import http from "@/api/axios";
const baseUrl = "https://masternode-01.lamden.io"
class MasternodeApi {
  getBalanceFromContract(contract: string, address: string) {
    return http.get(`${baseUrl}/contracts/${contract}/balances?key=${address}`)
  }
  callMethodContract(contract: string, method: string) {
    return http.get(`${baseUrl}/contracts/${contract}/${method}`)
  }

}

export const masternodeApi = new MasternodeApi();
