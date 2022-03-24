<template>
  <div class="overlay" v-show="showContent">
    <div class="main-content">
      <p>あなたの残高{{$store.getters.myWallet }}</p>
      <input type="text">
      <div id="button-content">
        <p>
          <button @click="closeModal" class="modal-button">閉じる</button>
        </p>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  props:['val','data'],
  data() {
    return {
      showContent: false,
    };
  },
  methods: {
    openModal() {
      this.$emit("open", this.showContent);
    },
    closeModal() {
      this.$emit("close", this.showContent);
    },
  },
};
</script>
