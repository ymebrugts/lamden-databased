<template>
  <div class="wrapper">
    <header class="header">
      <button class="button">CONNECT LAMDEN WALLET</button>
    </header>
    <img alt="Databased logo" src="../assets/logo.png" class="logo" />
    <LogoText />
    <p class="subtitle">
      <span>BASED</span> is a community currency built on Lamden.
    </p>
    <p class="slogan">
      BUY | STAKE | FARM
    </p>
    <h2 class="subheading">
      What will your assets <br class="break"> be worth?<span>*</span>
    </h2>
    <p class="subheading-subtitle"> 
      Calculate The Value And MC Of Your Lamden Assets At Any Price.
    </p>

    <Calculator />
    
    <footer>
      <p class="slogan">
        LOCKED LP | NO TEAM TOKENS
      </p>

      <p class="distribution">
        <span class="underline">DISTRIBUTION:</span><br>
        25% Telegram Airdrop (Complete)<br>
        25% Initial Liquidity (To Be Locked On Nebula)<br>
        25% BASED LP Farm (On Rocketswap)<br>
        25% Yield Vaults (On Nebula)
      </p>

      <p>
        *This Is For Entertainment Purposes Only And Does Not Constitute Financial Advice.
      </p>
    </footer>
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Calculator from "@/components/Calculator.vue";
import LogoText from "@/components/LogoText.vue";

export default defineComponent({
  name: "Home",
  components: {
    Calculator,
    LogoText
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
    background-image: url('../assets/lamden.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
    font-size: 0;
    width: 40px;
    height: 40px;
  }
}
</style>
