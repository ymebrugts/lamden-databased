<template>
  <div class="calculator">
    <label for="select-asset">Select Asset</label>
    <select name="select-asset" id="select-asset" v-model="selectedToken">
      <option disabled value="" class="default">Select an asset</option>
      <option v-for="(amount, token) in assets" :key="token" :value="token">
        {{ formatNumber(amount) }} <span class="token-name">{{ token.toUpperCase() }}</span>
      </option>
    </select>

    <label for="price">Select Price</label>
    <div class="number-input price">
      <input type="number" step="any" id="select-price" v-model="selectedUnitPrice" @blur="inputUnitPriceActive = false" @focus="inputUnitPriceActive = true" />
      <div class="number-formatted" v-if="!inputUnitPriceActive">
        {{ formattedUnitPrice }}
      </div>
      <button title="Randomize" v-on:click="fillRandomUnitPrice()"></button>
    </div>

    <label for="market-cap">Market Cap</label>
    <div class="number-input price">
      <input type="number" step="any" id="market-cap" v-model="selectedMarketCap" @blur="inputMarketCapActive = false" @focus="inputMarketCapActive = true" />
      <div class="number-formatted" v-if="!inputMarketCapActive">
        {{ formattedMarketCap }}
      </div>
      <button title="Randomize" v-on:click="fillRandomMarketCap()"></button>
    </div>

    <label for="circulating-supply">Circulating Supply</label>
    <div class="number-input">
      <input type="text" id="circulating-supply" v-model="selectedCirculatingSupply" @blur="inputCirculatingSupplyActive = false" @focus="inputCirculatingSupplyActive = true" />
      <div class="number-formatted" v-if="!inputCirculatingSupplyActive">
        {{ formattedCirculatingSupply }}
      </div>
    </div>

    <span class="equals">=</span>

    <p class="result">{{ formattedResult }}</p>

    <div class="error" v-if="error">
      <div class="error-text">Connect a wallet with at least 25,000 BASED.</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from "vue";

export default defineComponent({
  name: "Calculator",
  setup() {
    let error = false;
    const bounds = {
      unitprice: {
        lower: 0.01,
        upper: 5,
      },
      marketcap: {
        lower: 100000,
        upper: 50000000,
      },
    };
    const assets: { [key: string]: number } = {
      tau: 5161123,
      rswp: 512361,
      wp: 845638,
      neb: 53885,
      scd: 234552,
      gvrn: 2572,
      ldoge: 23450,
      based: 1783590,
      luck: 43563,
    };

    let inputUnitPriceActive = ref(false);
    let inputMarketCapActive = ref(false);
    let inputCirculatingSupplyActive = ref(false);
    let selectedToken = ref("");
    let selectedUnitPrice = ref(0);
    let selectedMarketCap = ref(0);
    let selectedCirculatingSupply = ref(0);
    let result = ref(0);

    function formatNumber(number: number, decimals = 20): string {
      let options;
      if (number % 1 === 0) {
        options = {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        };
      } else {
        options = {
          minimumFractionDigits: 2,
          maximumFractionDigits: decimals,
        };
      }
      return new Intl.NumberFormat("en-US", options).format(number);
    }

    function fillRandomUnitPrice(): void {
      let random: number = randomNumber(bounds.unitprice.lower, bounds.unitprice.upper);
      selectedUnitPrice.value = random;
    }

    function fillRandomMarketCap(): void {
      let random: number = randomNumber(bounds.marketcap.lower, bounds.marketcap.upper);
      selectedMarketCap.value = Math.round(random);
    }

    function randomNumber(lower: number, upper: number): number {
      return Math.random() * (upper - lower) + lower;
    }

    function updateUnitPrice(): void {
      if (selectedCirculatingSupply.value > 0 && selectedMarketCap.value > 0) {
        let unitPrice = selectedMarketCap.value / selectedCirculatingSupply.value;
        selectedUnitPrice.value = unitPrice;
      }
    }

    watch(selectedMarketCap, (marketCap: number, prevMarketCap: number) => {
      updateUnitPrice();
    });

    watch(selectedCirculatingSupply, (circulatingSupply: number, prevCirculatingSupply: number) => {
      updateUnitPrice();
    });

    const formattedUnitPrice = computed(() => {
      return formatNumber(selectedUnitPrice.value);
    });

    const formattedMarketCap = computed(() => {
      return formatNumber(selectedMarketCap.value);
    });

    const formattedCirculatingSupply = computed(() => {
      return formatNumber(selectedCirculatingSupply.value);
    });

    const formattedResult = computed(() => {
      let result = selectedUnitPrice.value * assets[selectedToken.value];
      return "$" + (isNaN(result) ? 0 : formatNumber(result, 2));
    });


    return {
      error,
      bounds,
      inputUnitPriceActive,
      inputMarketCapActive,
      inputCirculatingSupplyActive,
      assets,
      formatNumber,
      selectedToken,
      selectedUnitPrice,
      selectedMarketCap,
      selectedCirculatingSupply,
      fillRandomUnitPrice,
      fillRandomMarketCap,
      formattedUnitPrice,
      formattedMarketCap,
      formattedCirculatingSupply,
      formattedResult,
      result,

    };
  },
});
</script>

<style lang="scss" scoped>
.calculator {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: center;
  width: 100%;
  max-width: 270px;
  position: relative;
}

input,
select {
  padding: 10px;
  background: #e0e0e0;
  border: 1px solid #aeafad;
  border-radius: 6px;
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
  position: relative;
  appearance: none;
  font-family: sans-serif;
}

#select-asset {
  appearance: none;
  background-image: url("../assets/accordion.svg");
  background-repeat: no-repeat;
  background-position: 97%;
  cursor: pointer;

  option {
    text-transform: uppercase;
  }

  .default {
    text-transform: none;
  }
}

.number-input {
  width: 100%;
  position: relative;
  font-weight: bold;

  &.price {
    &::before {
      content: "$";
      display: block;
      position: absolute;
      color: #000;
      z-index: 1;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
    }

    input {
      padding-left: 22px;
    }

    .number-formatted {
      left: 23px;
    }
  }

  .number-formatted {
    pointer-events: none;
    position: absolute;
    width: 80%;
    top: 50%;
    left: 11px;
    transform: translateY(-50%);
    color: black;
    background-color: #e0e0e0;
    overflow: hidden;
    font-size: 1rem;
    font-weight: bold;
  }

  button {
    position: absolute;
    background-image: url("../assets/shuffle.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 60%;
    width: 35px;
    height: 93%;
    border: none;
    background-color: #e0e0e0;
    right: 2px;
    top: 50%;
    border-radius: 0 5px 5px 0;
    transform: translateY(-50%);
    padding: 10px;
    cursor: pointer;
  }
}

label {
  text-align: left;
  display: block;
  width: 100%;
  color: #fff;
  font-size: 0.9rem;
  margin: 15px 0 10px 0;
}

.equals {
  text-align: center;
  color: #fff;
  font-size: 2.5rem;
}

.result {
  color: white;
  font-size: 2.5rem;
}

.error {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .error-text {
    font-weight: bold;
    color: #fff;
    text-align: center;
  }
}
</style>
