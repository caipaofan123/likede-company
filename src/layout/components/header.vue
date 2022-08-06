<template>
  <el-header>
    <img src="../../assets/images/logo.3673fab5.png" alt="" class="logo" />
    <div class="info">
      <img :src="$store.state.user.userInfo.image+'1'" v-imgError="defaultImg" />
      <span>欢迎您，<span>{{$store.state.user.userInfo.userName}}</span></span>
      <div @click="logout">退出</div>
    </div>
  </el-header>
</template>

<script>
import sai from '@/assets/images/sai.jpg';
export default {
  data() {
    return {
      defaultImg:sai
    };
  },

  created() {},

  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      // this.$store.state.user.token=''
      // this.$router.push('/login')
    },
  },
};
</script>

<style scoped lang="scss">
.el-header {
  display: flex;
  justify-content: space-between;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABwEAAAA8CAYAAACOysV5AAADG0lEQVR4nO3aR04DURBF0bYHhPWxFDbMLggDjIQEIjh0+O2uqn/OEt70vt3D49NhAAAA4Crub/fD3c3O2AAAAKxqb14AAIDreX59H17efDEBAABYlwgIAABwZUIgAAAAaxMBAQAANiAEAgAAsCYREAAAYCNCIAAAAGsRAQEAADYkBAIAALAGERAAAGBjQiAAAACtiYAAAAABCIEAAAC0JAICAAAEIQQCAADQiggIAAAQiBAIAABACyIgAABAMEIgAAAAS4mAAAAAAQmBAAAALCECAgAABCUEAgAAMJcICAAAEJgQCAAAwBwiIAAAQHBCIAAAAFOJgAAAAAkIgQAAAEwhAgIAACQhBAIAADCWCAgAAJCIEAgAAMAYIiAAAEAyQiAAAACXiIAAAAAJCYEAAACcIwICAAAkJQQCAABwiggIAACQmBAIAADAMSIgAABAckIgAAAAf4mAAAAABQiBAAAA/CQCAgAAFCEEAgAA8EUEBAAAKEQIBAAAYBABAQAA6hECAQAAEAEBAAAKEgIBAAD6JgICAAAUJQQCAAD0SwQEAAAoTAgEAADokwgIAABQnBAIAADQHxEQAACgA0IgAABAX0RAAACATgiBAAAA/RABAQAAOiIEAgAA9EEEBAAA6IwQCAAAUJ8ICAAA0CEhEAAAoDYREAAAoFNCIAAAQF0iIAAAQMeEQAAAgJpEQAAAgM4JgQAAAPWIgAAAAAiBAAAAxYiAAAAAfBICAQAA6hABAQAA+CYEAgAA1CACAgAA8IsQCAAAkJ8ICAAAwD9CIAAAQG4iIAAAAEcJgQAAAHmJgAAAAJwkBAIAAOQkAgIAAHCWEAgAAJCPCAgAAMBFQiAAAEAuIiAAAACjCIEAAAB5iIAAAACMJgQCAADkIAICAAAwiRAIAAAQnwgIAADAZEIgAABAbCIgAAAAswiBAAAAcYmAAAAAzCYEAgAAxCQCAgAAsIgQCAAAEI8ICAAAwGJCIAAAQCwiIAAAAE0IgQAAAHGIgAAAADQjBAIAAMQgAgIAANCUEAgAALA9ERAAAIDmhEAAAIANDcPwAWT/XbLChBneAAAAAElFTkSuQmCC);
  background-size: cover;
  color: #333;
  text-align: center;
  line-height: 60px;
  .logo {
    height: 60px;
  }
  .info {
    width: 300px;
    display: flex;
    justify-content: space-around;
    color: #fff;
  }
}
</style>
