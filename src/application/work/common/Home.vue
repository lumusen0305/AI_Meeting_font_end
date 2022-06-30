<template>
<div class="wrapper">
<v-head></v-head>

<div class="content-box" :class="{'content-collapse':collapse}">
  <div class="content">
    <transition name="move" mode="out-in">
      <keep-alive >
        <router-view>
          
        </router-view>
      </keep-alive>
    </transition>
  </div>
</div>
</div>
</template>

<script>
  import vHead from './Header.vue';
export default {
  components: {
    vHead
  },
};
</script>

<style scoped>
</style>