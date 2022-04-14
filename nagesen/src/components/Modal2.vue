<template>
  <div class="overlay" v-show="showContent">
    <div class="main-content">
      <p>あなたの残高{{$store.getters.myWallet }}</p>
      <input type="text" v-model="nagesen">

      <div id="button-content">
        <p>
          <button @click="closeModal" class="modal-button">送る</button>
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
      nagesen: '',

    };
  },
  methods: {
    openModal() {
      this.$emit("open", this.showContent);
    },
    closeModal() {
      this.nagesen = this.$store.getters.myWallet - this.nagesen
      this.nage = this.data[this.val].myWallet + this.nagesen;

      this.$emit("close", this.showContent,this.nagesen);
      this.$store.dispatch("nagesen",this.nagesen,this.val,
      );
    },
  },
};
</script>
