<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { ref, computed } from "vue"
import { useMouseInElement } from "@vueuse/core";

const target = ref(null);
// isOutside是否进入指定区域 进入为false 否则为true
// elementX 鼠标X位置
// elementY 鼠标Y位置
const {isOutside,elementX,elementY} = useMouseInElement(target); // useMouseInElement(指定的区域)鼠标进入的位置

const active = ref(0);
const images = ref('https://images.mepai.me/app/works/178221/2022-07-14/w_62d01aa163e45/062d01aa163f41.jpg!1200w.jpg');
const position = computed(()=>{
  let x = elementX.value - 50;
  let y = elementY.value - 50; // 获取遮罩阴性的顶点位置 x y
  x = x < 0 ? 0 : x;
  y = y < 0 ? 0 : y;
  x = x > 100 ? 100 : x;
  y = y > 100 ? 100 : y; // 顶点位置 最大为原图的1/2位置
  return {
    x,
    y 
  }
});

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="后台管理界面" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <a href="index.html">首页</a>
      </nav>

    </div>
  </header>

  <div class="goods-image">
    <!-- 显示在右侧的放大之后的区域 -->
    <div class="large"
      v-show="!isOutside"
      :style="[{backgroundImage:'url('+images+')', backgroundPosition: `-${position.x*2}px -${position.y*2}px`}]"></div>

    <div class="middle" ref="target">
      <img :src="images" alt="" />
      <!-- 移动遮罩 -->
      <div class="layer" ref="target" v-show="!isOutside " :style="{ left:position.x+'px', top: position.y+'px' }"></div>
    </div>
  </div>

  <RouterView />
</template>

<style scoped lang="scss">
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.goods-image {
  width: 200px;
  height: 200px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 200px;
    width: 200px;
    height: 200px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    background-repeat: no-repeat;
    // 放大一倍
    background-size: 400px 400px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 200px;
    height: 200px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    img{
      width: 200px;
      height: 200px;
    }
    .layer {
      width: 100px;
      height: 100px;
      background: rgba(0,0,0,.2);
      left: 0;
      top: 0;
      // 可以移动
      position: absolute;
    }
  }

  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid red;
      }
    }
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
