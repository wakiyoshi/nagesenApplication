<template>
  <div class="overlay" v-show="showContent">
    <div class="main-content">
      <p v-if="data[val]">{{ data[val].username }}さんの残高:{{data[val].myWallet}}</p>
      <div id="button-content">
        <p>
          <button @click="closeModal" class="modal-button">close</button>
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
