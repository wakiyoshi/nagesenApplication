<template>
    <div>
        <h2>こんにちは {{ name }}さん</h2>
        <button @click="logOut">サインアウト</button>
    </div>
</template>

<script>
import firebase from '../firebase.js'

export default {
    data() {
        return {
            name: firebase.auth().currentUser.displayName
        }
    },
    methods:{
      logOut(){
     this.$store.dispatch('signOut')
      }
    }

}
</script>
