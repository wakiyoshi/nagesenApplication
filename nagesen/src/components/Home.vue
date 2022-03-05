<template>
    <div>
        <h2>こんにちは {{ name }}さん</h2>
        <button @click="signOut">サインアウト</button>
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
    methods: {
        signOut: function () {
            firebase.auth().signOut().then(() => {
                this.$router.push('/signin')
            })
        }
    }
}
</script>
