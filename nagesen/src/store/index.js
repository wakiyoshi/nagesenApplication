/* eslint-disable */
"use strict"

import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '../firebase.js'
import router from '@/router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {

    username: '',
    email: '',
    password: '',
    loginEmail: '',
    loginPassword: '',
    myWallet:'',
    userDatas:[],
    modalDatas:[],
  },
  getters:{
    myWallet(state){
      return state.myWallet;
    },
    modalDatas(state){
      return state.modalDatas;
    },
    userDatas(state){
      return state.userDatas;
    }

  },
  mutations: {
    AddToState: function (state, payload) {
      state.email = payload.email
      state.password = payload.password
      state.username = payload.username
      state.loginEmail = payload.loginEmail
      state.loginPassword = payload.loginPassword
      state.myWallet = payload.myWallet
    },
    setUserDatas(state,userDatas) {
      state.userDatas.push(userDatas);
    },
    setUserData(state, doc) {
      state.username = doc.data().username
      state.myWallet = doc.data().myWallet
    },
    setUsersData(state, users) {
      state.users = users
    },
    setModalDatas(state, modalDatas) {
      state.modalDatas = modalDatas
    },
    setNagesenData(state,nage){
      state.myWallet = nage
    },
    setWalletData(state,{walletData,id}){
      console.log(state.userDatas)
      console.log(id)
      state.userDatas[id]['myWallet'] = walletData
    }
  },
  actions: {
    signUp: function (context, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          const user = firebase.auth().currentUser
          user.updateProfile({
            displayName: payload.username,
          },)
          .then(() => {
            const db = firebase.firestore();
            db.collection("userData").doc(user.uid).set({
              uid: user.uid,
              email: payload.email,
              password: payload.password,
              username: payload.username,
              myWallet: payload.myWallet,
            })
          })
          .then(() => {
            context.commit('AddToState', payload)
          })
          .then(() => {
            router.push('/home')
          })
          })
          .catch(error => {
            console.log(error.message)
          })
    },
      signOut: function () {
        firebase.auth().signOut().then(() => {
            router.push('/signin')
        })
        .catch(error =>{
          console.log(error.message)
        })
      },
      signIn: function (context,payload){
        firebase.auth().signInWithEmailAndPassword(payload.loginEmail,payload.loginPassword)
          .then(() => {
            const user = firebase.auth().currentUser
            const docRef = firebase.firestore().collection("userData").doc(user.uid);
            docRef.get()
          .then((doc) => {
            if (doc.exists) {
              context.commit('setUserData', doc)
            } else {
              console.log('ダメ');
            }
          })
        })
          .then(()=>{
            router.push('/home')
          })
          .catch(error => {
            console.log(error.message)
          })
      },
      loginCheck: function (context){
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            console.log("true");
          } else {
            location.href = "/signin";
          }
          const currentUser = firebase.auth().currentUser
          firebase
          .firestore()
          .collection("userData")
          .where(firebase.firestore.FieldPath.documentId(), "!=", currentUser.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const userDatas = {
                uid: doc.data().uid,
                username: doc.data().username,
                myWallet: doc.data().myWallet,
              };


              context.commit("setUserDatas",userDatas)

            });
          })
        })
      },
      modalSet (context, usersIndex) {
        const modalDatas = [];
        const user = firebase.auth().currentUser
        const db = firebase.firestore();
        db.collection("userData")
          .where(firebase.firestore.FieldPath.documentId(), "==", user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const modalData = {
                uid: usersIndex,
                username: doc.data().username,
                myWallet: doc.data().myWallet
              }
              modalDatas.push(modalData)
              context.commit('setModalDatas', modalDatas)

            });
        });
      },
    nagesen(context,{ nagesen,uid,wallet,userWallet,val}) {
      console.log(uid,wallet)

      const user = firebase.auth().currentUser
      const db = firebase.firestore();
      const sendRef = db.collection("userData");
      sendRef.doc(user.uid).update({
        myWallet :  Number(userWallet) - Number(nagesen)
      })
      const nage = userWallet - nagesen
      context.commit('setNagesenData', nage)
      db.collection('userData').doc(uid).update({
        myWallet: Number(wallet) + Number(nagesen),
      })
      const walletData = Number(wallet) + Number(nagesen)

      context.commit('setWalletData', {walletData: walletData,id: val})
    }
  }

  });


export default store




