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
    loginPassword: ''
  },
  mutations: {
    AddToState: function (state, payload) {
      state.email = payload.email
      state.password = payload.password
      state.username = payload.username
      state.loginEmail = payload.loginEmail
      state.loginPassword = payload.loginPassword
    }
  },
  actions: {
      signUp: function (context, payload) {
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
          .then(() => {
            firebase.auth().currentUser.updateProfile({
              displayName: payload.username,
            },)
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
            context.commit('AddToState', payload)
            router.push('/home')
          })
          .catch(error => {
            console.log(error.message)
          })
      }
  },
});

export default store




