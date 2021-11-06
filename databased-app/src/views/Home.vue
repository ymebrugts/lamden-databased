<template>
  <div class="wrapper">
    <header class="header">
      <button class="button" v-if="walletIsInstalled === true && walletController.locked === false && walletController?.approvals?.testnet?.contractName !== 'con_nebula'" @click="connectToWallet">
        CONNECT LAMDEN WALLET
      </button>
      <a href="https://chrome.google.com/webstore/detail/lamden-wallet-browser-ext/fhfffofbcgbjjojdnpcfompojdjjhdim" target="_blank" class="button" v-if="walletIsInstalled === false"
        >WALLET NOT INSTALLED</a
      >
      <button class="button" v-if="walletController.locked === true">WALLET IS LOCKED</button>
      <button class="button" v-if="walletIsInstalled === true && walletController.locked === false && walletController?.approvals?.testnet?.contractName === 'con_nebula'">CONNECTED</button>
    </header>
    <img alt="Databased logo" src="../assets/logo.png" class="logo" />
    <LogoText />
    <p class="subtitle"><span>BASED</span> is a community currency built on Lamden.</p>
    <p class="slogan">BUY | STAKE | FARM</p>
    <h2 class="subheading">
      What will your assets <br class="break" />
      be worth?<span>*</span>
    </h2>
    <p class="subheading-subtitle">Calculate The Value And MC Of Your Lamden Assets At Any Price.</p>

    <Calculator :assets-prop="currenciesToShow" :market-tokens="marketTokens" :supported-currencies="supportedCurrencies" :tau-price="tauPrice" :circulating-supplies="circulatingSupplies" />

    <footer>
      <p class="slogan">LOCKED LP | NO TEAM TOKENS</p>

      <p class="distribution">
        <span class="underline">DISTRIBUTION:</span><br />
        25% Telegram Airdrop (Complete)<br />
        25% Initial Liquidity (To Be Locked On Nebula)<br />
        25% BASED LP Farm (On Rocketswap)<br />
        25% Yield Vaults (On Nebula)
      </p>

      <p>*This Is For Entertainment Purposes Only And Does Not Constitute Financial Advice.</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref, watch } from "vue";
import Calculator from "@/components/Calculator.vue";
import LogoText from "@/components/LogoText.vue";
import WalletController from "lamden_wallet_controller";
import { rocketSwapApi } from "@/api/rocketswapApi";
import { masternodeApi } from "@/api/masternodeApi";

const connectionRequest = {
  appName: "Databased", // Your DAPPS's name
  version: "1.0.0", // any version to start, increment later versions to update connection info
  logo: "/src/assets/databased.png", // or whatever the location of your logo
  contractName: "con_nebula", // Will never change
  networkType: "testnet", // other option is 'mainnet'
};

const supportedCurrencies: any = {
  currency: "TAU",
  con_rswp_lst001: "RSWP",
  con_uwarriors_lst001: "WP",
  con_nebula: "NEB",
  con_collider_contract: "SCD",
  con_proton_contract: "GVRN",
  con_lambdoge: "LDOGE",
  con_databased: "BASED",
  con_luck_lst001: "LUCK",
};

const circulatingSupplies: any = {
  TAU: 0,
  RSWP: 0,
  WP: 0,
  NEB: 0,
  SCD: 0,
  GVRN: 0,
  LDOGE: 0,
  BASED: 0,
  LUCK: 0,
};

const listOfContracts: string[] = [
  "currency",
  "con_uwarriors_lst001",
  "con_nebula",
  "con_collider_contract",
  "con_proton_contract",
  "con_databased",
  "con_luck_lst001",
  "con_lambdoge",
  "con_rswp_lst001",
];

export default defineComponent({
  name: "Home",
  components: {
    Calculator,
    LogoText,
  },
  setup() {
    // Wallet

    const walletController = new WalletController();
    // Create event handlers
    const handleWalletInfo = (walletInfo: any) => handleWalletInfoDatabased(walletInfo);
    const handleTxResults = (txInfo: any) => handleTxResultsDatabased(txInfo);
    //Connect to event emitters
    walletController.events.on("newInfo", handleWalletInfo); // Wallet Info Events, including errors
    walletController.events.on("txStatus", handleTxResults); // Transaction Results
    const walletIsInstalled = ref<boolean>();

    const walletConnected = computed(() => {
      const connectionStatus = walletIsInstalled.value;
      return connectionStatus ? "Wallet connected" : "Connect Lamden Wallet";
    });

    async function connectToWallet() {
      walletIsInstalled.value = await walletController.walletIsInstalled();
      if (!walletIsInstalled.value) {
        //TODO: global snackbar error

        return;
      }

      walletController.sendConnection(connectionRequest);
    }

    onMounted(async () => {
      setTimeout(() => {
        walletController.walletIsInstalled().then((installed: boolean) => {
          if (installed) walletIsInstalled.value = true;
          else walletIsInstalled.value = false;
        });
      }, 1000);
    });

    async function handleWalletInfoDatabased(walletInfo: any) {
      updateWalletBalances(walletInfo);
    }

    const walletBalances = ref<any>();
    const currenciesToShow = ref<any>({});
    async function updateWalletBalances(walletInfo: any) {
      // if wallet has current connected wallet
      if (walletInfo.wallets !== null && walletInfo.wallets !== undefined && walletInfo.wallets[0] !== undefined && walletInfo.wallets[0] !== null && walletInfo.wallets[0] !== "") {
        // get data from rocketswap
        const { data: balances }: any = await rocketSwapApi.getBalances(walletInfo.wallets[0]);
        walletBalances.value = balances.balances;

        currenciesToShow.value = {};
        for (const tokenContractInWallet in walletBalances.value) {
          if (Object.keys(supportedCurrencies).includes(tokenContractInWallet)) {
            if (parseFloat(walletBalances.value[tokenContractInWallet]).toFixed(5) !== "0.00000") {
              currenciesToShow.value[supportedCurrencies[tokenContractInWallet]] = walletBalances.value[tokenContractInWallet];
            }
          }
        }
      }
    }

    const marketTokens = ref([]);
    async function getMarketInfo() {
      marketTokens.value = await (await rocketSwapApi.getMarketSummaries()).data;
    }
    getMarketInfo();

    const tauPrice = ref<number>(0);
    async function getTauPrice() {
      const tokenPrice: number = await (await rocketSwapApi.getTauLastPrice()).data.value;
      tauPrice.value = Number(tokenPrice);
    }
    getTauPrice();

    async function calculateCirculatingSupply(contractName: string, listOfAdddresses: any, totalSupply: number) {
      const listOfBalancesToSubstract: any = [];

      await Promise.all(
        listOfAdddresses.map(async (address: string) => {
          const balance = await masternodeApi.getBalanceFromContract(contractName, address);
          // API response different for only TAU
          if (contractName === "currency") {
            listOfBalancesToSubstract.push(balance.data.value);
          } else {
            listOfBalancesToSubstract.push(balance.data.value.__fixed__);
          }
        })
      );

      const circulatingSupply = substractSupplies(totalSupply, listOfBalancesToSubstract);
      return circulatingSupply;
    }

    function substractSupplies(totalSupply: number, listOfBalancesToSubstract: any) {
      let circulatingSupplyLocal = totalSupply;
      listOfBalancesToSubstract.forEach((balance: number) => {
        circulatingSupplyLocal = circulatingSupplyLocal - balance;
      });
      return circulatingSupplyLocal;
    }

    async function GetCirculatingSupplies() {
      const nebtotalsupply = await masternodeApi.callMethodContract("con_nebula", "total_supply");

      const tokenInformationForCalculatingSupply: any = {
        currency: {
          totalSupply: 288000000,
          addresses: ["con_burn"],
        },
        con_uwarriors_lst001: {
          totalSupply: 40000000,
          addresses: [
            "con_liq_mining_wp_wp",
            "con_liq_mining_weth_wp_1",
            "689e90c9a6d1df8ed873a0b5af48734ce93af131881c885c8c81a15aecaeef22",
            "554bdec75c364c067e03f9d4113a2dab177f424d45122902a128d9590fba7880",
          ],
        },
        con_nebula: { totalSupply: nebtotalsupply.data.value.__fixed__, addresses: ["con_liq_mining_neb"] },
        con_collider_contract: { totalSupply: 16000000, addresses: ["con_staking_pro_lhc"] },
        con_proton_contract: {
          totalSupply: 16000000,
          addresses: ["con_liq_mining_lhc_pro", "con_liq_mining_pro_pro", "con_staking_pro_lhc", "2b077f6d0aa7931fba3b8e41f59638f6009c71c7d2cb473340c4868ebbcccda6"],
        },
        con_databased: { totalSupply: 100000000, addresses: ["4cebe6abeabf4d7990dafacf15d54d965f8e88809ca6431bb61eb6b4c6e41be6", "2b077f6d0aa7931fba3b8e41f59638f6009c71c7d2cb473340c4868ebbcccda6"] },
        con_luck_lst001: { totalSupply: 1000000, addresses: ["0f81f29cb79f25cd55b49ad4a339b8b78c7b4f04e390fc0c13307351d9419e3f"] },
        con_lambdoge: {
          totalSupply: 1000000000000,
          addresses: [
            "con_liq_mining_ldoge",
            "con_staking_rswp_ldoge",
            "d4ff4ee8975345a0fc27da6ffb89e3b704f21dbf9ab63b12a1ae34cfd3459d31",
            "49102548a9682243737b61ad8984533efdcdebaba34c53193589531547573e62",
          ],
        },
        con_rswp_lst001: {
          totalSupply: 1200000000,
          addresses: ["con_liq_mining_rswp_rswp", "con_staking_rswp_rswp_interop_v2", "con_simple_staking_tau_rswp_001", "burn", "fcefe7743fa70c97ae2d5290fd673070da4b0293da095f0ae8aceccf5e62b6a1"],
        },
      };

      await Promise.all(
        listOfContracts.map(async (contract: string) => {
          const calculatedSupply = await calculateCirculatingSupply(contract, tokenInformationForCalculatingSupply[contract].addresses, tokenInformationForCalculatingSupply[contract].totalSupply);
          circulatingSupplies[supportedCurrencies[contract]] = calculatedSupply;
        })
      );
      console.log(circulatingSupplies);
    }
    GetCirculatingSupplies();

    function handleTxResultsDatabased(txInfo: any) {}

    return { walletConnected, walletIsInstalled, connectToWallet, walletController, currenciesToShow, marketTokens, supportedCurrencies, tauPrice, circulatingSupplies };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  max-width: 625px;
  margin: 0 auto;
  text-align: center;
  font-family: sans-serif;
  padding: 10px;
  font-size: 0.98rem;
}

p {
  margin: 10px 0;
}

.header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  height: 39px;
}

.button {
  background-color: var(--purple);
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 12px;
  border-radius: 3px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-decoration: none;
  line-height: 100%;
}

.logo {
  width: 100%;
  height: 100%;
  max-width: 120px;
  display: block;
  margin: 0 auto;
}

.subtitle {
  font-size: 0.9rem;
  letter-spacing: 0.8px;

  span {
    text-transform: uppercase;
    color: var(--purple);
  }
}

.slogan {
  text-transform: uppercase;
  color: var(--purple);
  font-size: 1.2rem;
  margin: 30px 0;
}

.subheading {
  color: #fff;
  line-height: 0.95rem;
  margin-bottom: 10px;

  span {
    font-size: 0.8rem;
    display: inline-block;
    margin-left: 2px;
  }
}

.subheading-subtitle {
  text-transform: capitalize;
}

footer {
  margin-top: 100px;

  .distribution {
    font-size: 0.95rem;
    line-height: 1.3rem;
    .underline {
      text-transform: uppercase;
      text-decoration: underline;
    }
  }
}

.break {
  display: none;
}
@media (max-width: 800px) {
  .subheading {
    line-height: unset;
  }

  .break {
    display: block;
  }

  .button {
    background-image: url("../assets/lamden.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
    font-size: 0;
    width: 40px;
    height: 40px;
  }
}
</style>
