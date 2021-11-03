<template>
  <h1 class="logo-text " data-text="DATABASED">DATABASED</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LogoText",
});
</script>

<style lang="scss" scoped>
.logo-text {
  font-family: "liquorstore-3d", sans-serif;
  text-transform: uppercase;
  font-size: 3.3rem;
  line-height: 2.7rem;
  color: #fff;
  margin-bottom: 12px;
}
.glitch {
  position: relative;
  color: white;
  animation: glitch-skew 1s infinite linear alternate-reverse;
}
.glitch::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  left: 2px;
  text-shadow: -2px 0 var(--purple);
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim 5s infinite linear alternate-reverse;
}
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  left: -2px;
  text-shadow: -2px 0 var(--purple), 2px 2px var(--purple);
  animation: glitch-anim2 1s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
  0% {
    clip: rect(2px, 9999px, 18px, 0);
    transform: skew(0.31deg);
  }
  5% {
    clip: rect(37px, 9999px, 89px, 0);
    transform: skew(0.31deg);
  }
  10% {
    clip: rect(22px, 9999px, 22px, 0);
    transform: skew(0.64deg);
  }
  15% {
    clip: rect(19px, 9999px, 6px, 0);
    transform: skew(0.1deg);
  }
  20% {
    clip: rect(38px, 9999px, 11px, 0);
    transform: skew(0.51deg);
  }
  25% {
    clip: rect(67px, 9999px, 89px, 0);
    transform: skew(0.2deg);
  }
  30% {
    clip: rect(36px, 9999px, 95px, 0);
    transform: skew(0.33deg);
  }
  35% {
    clip: rect(20px, 9999px, 33px, 0);
    transform: skew(0.1deg);
  }
  40% {
    clip: rect(94px, 9999px, 60px, 0);
    transform: skew(0.82deg);
  }
  45% {
    clip: rect(49px, 9999px, 12px, 0);
    transform: skew(0.15deg);
  }
  50% {
    clip: rect(23px, 9999px, 97px, 0);
    transform: skew(0.28deg);
  }
  55% {
    clip: rect(49px, 9999px, 77px, 0);
    transform: skew(0.09deg);
  }
  60% {
    clip: rect(10px, 9999px, 52px, 0);
    transform: skew(0.85deg);
  }
  65% {
    clip: rect(97px, 9999px, 71px, 0);
    transform: skew(0.77deg);
  }
  70% {
    clip: rect(62px, 9999px, 74px, 0);
    transform: skew(0.36deg);
  }
  75% {
    clip: rect(2px, 9999px, 7px, 0);
    transform: skew(0.44deg);
  }
  80% {
    clip: rect(16px, 9999px, 87px, 0);
    transform: skew(1deg);
  }
  85% {
    clip: rect(51px, 9999px, 9px, 0);
    transform: skew(0.78deg);
  }
  90% {
    clip: rect(16px, 9999px, 47px, 0);
    transform: skew(0.54deg);
  }
  95% {
    clip: rect(32px, 9999px, 4px, 0);
    transform: skew(0.83deg);
  }
  100% {
    clip: rect(35px, 9999px, 13px, 0);
    transform: skew(0.2deg);
  }
}
@keyframes glitch-anim2 {
  0% {
    clip: rect(30px, 9999px, 75px, 0);
    transform: skew(0.73deg);
  }
  5% {
    clip: rect(51px, 9999px, 25px, 0);
    transform: skew(0.76deg);
  }
  10% {
    clip: rect(41px, 9999px, 51px, 0);
    transform: skew(0.87deg);
  }
  15% {
    clip: rect(73px, 9999px, 88px, 0);
    transform: skew(0.72deg);
  }
  20% {
    clip: rect(48px, 9999px, 47px, 0);
    transform: skew(0.51deg);
  }
  25% {
    clip: rect(65px, 9999px, 8px, 0);
    transform: skew(0.85deg);
  }
  30% {
    clip: rect(84px, 9999px, 2px, 0);
    transform: skew(0.7deg);
  }
  35% {
    clip: rect(66px, 9999px, 85px, 0);
    transform: skew(0.78deg);
  }
  40% {
    clip: rect(69px, 9999px, 40px, 0);
    transform: skew(0.44deg);
  }
  45% {
    clip: rect(77px, 9999px, 28px, 0);
    transform: skew(0.58deg);
  }
  50% {
    clip: rect(39px, 9999px, 80px, 0);
    transform: skew(0.69deg);
  }
  55% {
    clip: rect(77px, 9999px, 68px, 0);
    transform: skew(0.88deg);
  }
  60% {
    clip: rect(62px, 9999px, 73px, 0);
    transform: skew(0.68deg);
  }
  65% {
    clip: rect(36px, 9999px, 73px, 0);
    transform: skew(0.42deg);
  }
  70% {
    clip: rect(19px, 9999px, 54px, 0);
    transform: skew(0.49deg);
  }
  75% {
    clip: rect(14px, 9999px, 2px, 0);
    transform: skew(0.92deg);
  }
  80% {
    clip: rect(60px, 9999px, 8px, 0);
    transform: skew(0.25deg);
  }
  85% {
    clip: rect(71px, 9999px, 32px, 0);
    transform: skew(0.34deg);
  }
  90% {
    clip: rect(4px, 9999px, 89px, 0);
    transform: skew(0.77deg);
  }
  95% {
    clip: rect(19px, 9999px, 28px, 0);
    transform: skew(0.61deg);
  }
  100% {
    clip: rect(73px, 9999px, 28px, 0);
    transform: skew(0.13deg);
  }
}
@keyframes glitch-skew {
  0% {
    transform: skew(4deg);
  }
  10% {
    transform: skew(-4deg);
  }
  20% {
    transform: skew(5deg);
  }
  30% {
    transform: skew(4deg);
  }
  40% {
    transform: skew(-1deg);
  }
  50% {
    transform: skew(1deg);
  }
  60% {
    transform: skew(3deg);
  }
  70% {
    transform: skew(4deg);
  }
  80% {
    transform: skew(-3deg);
  }
  90% {
    transform: skew(4deg);
  }
  100% {
    transform: skew(1deg);
  }
}
</style>
