<template>
  <div class="overlay" v-show="showContent2">
    <div class="main-content">
      <p>あなたの残高{{$store.getters.myWallet }}</p>
      <input type="text" v-model="nagesen">
      <div id="button-content">
        <p>
          <button @click="closeModal2" class="modal-button">送る</button>
        </p>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  props:['data','val'],
  data() {
    return {
      showContent2: false,
      nagesen: '',
    };
  },

  methods: {
    openModal2() {
      this.$emit("open", this.showContent2);
    },
    closeModal2() {

      // console.log(this.val)

      this.$store.dispatch("nagesen",{
        nagesen: this.nagesen,
        uid: this.data[this.val]['uid'],
        userWallet: this.$store.getters.myWallet,
        wallet: this.data[this.val]['myWallet'],
        val: this.val
        });


      this.$emit("close", this.nagesen);

      this.nagesen = ''
    },

  },

};
</script>
<style scoped>
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
