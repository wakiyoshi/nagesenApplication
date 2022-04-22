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
<style>
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 10;
}
.main-content {
	position: absolute;
	top: 50%;
	left: 50%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 500px;
	height: 200px;
	padding: 32px;
	background-color: #fff;
	border-radius: 4px;
	transform: translate(-50%, -50%);
}
</style>
