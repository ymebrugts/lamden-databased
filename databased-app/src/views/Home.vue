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

    <Calculator :walletBalances="walletBalances" />

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

const connectionRequest = {
  appName: "Databased", // Your DAPPS's name
  version: "1.0.0", // any version to start, increment later versions to update connection info
  logo: "/src/assets/databased.png", // or whatever the location of your logo
  contractName: "con_nebula", // Will never change
  networkType: "testnet", // other option is 'mainnet'
};

// const connectionRequest = {
//   appName: "Nebula", // Your DAPPS's name
//   version: "1.0.0", // any version to start, increment later versions to update connection info
//   logo: "/src/assets/Nebula_White_Text_Icon.png", // or whatever the location of your logo
//   contractName: "con_nebula", // Will never change
//   networkType: "testnet" // other option is 'mainnet'
// };

const currencies = {
  TAU: "currency",
  RSWP: "con_rswp_lst001",
  WP: "con_uwarriors_lst001",
  NEB: "con_nebula",
  SCD: "con_collider_contract",
  GVRN: "con_proton_contract",
  LDOGE: "con_lambdoge",
  BASED: "con_databased",
  LUCK: "con_luck_lst001",
};

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
    const currenciesToShow = ref<any>([]);

    function getKeyByValue(object: any, value: any): any {
      return Object.keys(object).find((key) => object[key] === value);
    }

    async function updateWalletBalances(walletInfo: any) {
      if (walletInfo.wallets !== null && walletInfo.wallets !== undefined && walletInfo.wallets[0] !== undefined && walletInfo.wallets[0] !== null && walletInfo.wallets[0] !== "") {
        const { data: balances }: any = await rocketSwapApi.getBalances(walletInfo.wallets[0]);
        walletBalances.value = balances.balances;
        console.log(walletBalances.value);
        currenciesToShow.value = [];
        for (const item in walletBalances.value) {
          if (Object.values(currencies).includes(item)) {
            console.log(item);
            currenciesToShow.value.push(getKeyByValue(currencies, item));
          }
        }
        console.log(currenciesToShow.value);
      }
    }

    function handleTxResultsDatabased(txInfo: any) {}

    return { walletConnected, walletIsInstalled, connectToWallet, walletController, walletBalances };
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
