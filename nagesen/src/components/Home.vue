<template>
    <div>
        <h2>こんにちは {{ name }}さん</h2>
        <h1>残高：{{ $store.getters.myWallet }}</h1>
        <button @click="logOut">サインアウト</button>
    </div>
</template>

<script>
import firebase from '../firebase.js'

export default {
    data() {
        return {
            name: firebase.auth().currentUser.displayName,
        }
    },
    methods:{
      logOut(){
     this.$store.dispatch('signOut')
      }
    },
    computed: {
    myWallet() {
      return this.$store.getters.myWallet;
    },
  },


}
</script>
