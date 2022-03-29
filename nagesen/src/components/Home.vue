<template>
  <div>
    <p>こんにちは {{ name }}さん</p>
    <p>残高：{{ $store.getters.myWallet }}</p>
    <button @click="logOut">サインアウト</button>
    <h1>ユーザ一覧</h1>
    <table>
      <thead>
        <tr>
          <th>ユーザー</th>
        </tr>
      </thead>
    <tr v-for="(user,index) in userDatas" :key="index">
      <td>{{user.username}}</td>
      <td><button class="button" @click="openModal(index)">Walletを見る</button></td>
      <td><button class="button2" @click="openModal2(index)">送る</button></td>
    </tr>
    </table>
    <div>
      <transition>
        <Modal
          :data="userDatas"
          :val="usersIndex"
          v-show="showContent"
          @click="closeModal"
          @open="showContent = true"
          @close="showContent = false">
        </Modal>
      </transition>
    </div>
    <div>
      <transition>
        <Modal2
          :data="userDatas"
          :val="usersIndex"
          v-show="showContent2"
          @click="closeModal2"
          @open="showContent2 = true"
          @close="showContent2 = false"
        ></Modal2>
      </transition>
    </div>
  </div>
</template>

<script>
import Modal from './Modal.vue';
import Modal2 from './Modal2.vue';
import firebase from '../firebase.js'

export default {
  name:'Home',
  components:{
    Modal,
    Modal2,
  },
  data() {
    return {
      name: firebase.auth().currentUser.displayName,
      showContent:false,
      showContent2: false,
      usersIndex:'',
      userDatas: [],
    }
  },
  methods:{
    openModal (index){
    this.showContent = true
    this.usersIndex = index
    this.$store.dispatch('modalSet', this.usersIndex)
    },
    closeModal (){
      this.showContent = false
    },
    openModal2 (index){
      this.showContent2 = true
      this.usersIndex = index
      this.$store.dispatch('modalSet', usersIndex)
    },
    closeModal2 (){
      this.showContent2 = false
    },
    logOut(){
      this.$store.dispatch('signOut')
    },
    },
  computed: {
    myWallet() {
      return this.$store.getters.myWallet;
    },
    showData() {
      return this.$store.getters.userDatas;
    },
    mounted(){
      return this.$store.dispatch('loginCheck')
    }
  },

}
</script>
