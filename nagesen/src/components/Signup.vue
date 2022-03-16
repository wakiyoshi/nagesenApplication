<template>
  <div class="signup">
    <h2>新規登録</h2>
    <div>
      ユーザ名<input type="text" v-model="username">
    </div>
    <div>
      メールアドレス<input type="text" v-model="email">
    </div>
      パスワード<input type="password" v-model="password">
    <div>
      <button @click="signUp">新規登録</button>
    </div>
    <p>
      <router-link to="/signin">ログインはこちらから</router-link>
    </p>
  </div>
</template>
<script>
import firebase from '../firebase.js'

export default {
  name: 'Signup',
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
/* eslint-disable */
  methods: {
    signUp () {
      this.$store.dispatch('signUp', {
        username: this.username,
        email: this.email,
        password: this.password,
      })
    },
  }
}


</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.signin {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
input {
  margin: 10px 0;
  padding: 10px;
}

</style>
