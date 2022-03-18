<template>
  <div class="signin">
    <h2>ログイン</h2>
    <div>
      メールアドレス<input type="text" v-model="loginEmail">
    </div>
      パスワード<input type="password" v-model="loginPassword">
    <div>
      <button @click="signIn">ログイン</button>
    </div>
    <p>
      <router-link to="/">新規登録はこちらから</router-link>
    </p>
  </div>
</template>
<script>
import firebase from '../firebase.js'

export default {
  name: 'Signin',
  data () {
    return {
      loginEmail: '',
      loginPassword: ''
    }
  },
/* eslint-disable */
  methods: {
    signIn () {
      this.$store.dispatch('signIn', {
        loginEmail: this.loginEmail,
        loginPassword: this.loginPassword,
      })
    },
  }
}
</script>
