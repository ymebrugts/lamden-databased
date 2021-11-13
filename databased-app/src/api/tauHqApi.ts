import http from "@/api/axios";
class TauHqApi {
  getLostTau() {
    return http.get(`https://www.tauhq.com/api/v0/stats/tau_lost_forever`)
  }

}

export const tauHqApi = new TauHqApi();
