<template>

    <LoadingSpinner v-if="loading" />

    <slot v-else-if="loggedIn" />

    <Transition name="fade">
        <div class="w-80 bg-dark-400 rounded-lg flex flex-col justify-center align-center px-10 py-8" v-if="!loading && !loggedIn" >
    
            <h6 class="text-lg text-center mb-5">Login</h6>
    
            <div class="flex flex-col">
                <label class="text-sm mb-1" for="username">Username</label>
                <input class="text-sm bg-dark-500 rounded py-1.5 px-2" type="text" v-model="username">
            </div>
            
            <div class="flex flex-col my-5">
                <label class="text-sm mb-1" for="password">Password</label>
                <input class="text-sm bg-dark-500 rounded py-1.5 px-2" type="text" v-model="password">
            </div>
    
            <div class="text-center">
                <button class="text-base bg-dark-500 rounded px-5 py-1 w-full" @click="loginWithDelay">Login</button>
            </div>
            
        </div>
    </Transition>

</template>
<script setup>

const timer = ref(0)
const loggedIn = ref(false)
const loading = ref(false)
const username = ref("")
const password = ref("")

const loginWithDelay = () => {

    loading.value = true
    setTimeout(login, timer.value)
}

const login = () => {

    const config = useConfig()
    const config_username = config.username
    const config_password = config.password

    if( config_username == username.value && config_password == password.value ) {

        loggedIn.value = true
        timer.value = 0

    } else {

        timer.value = timer.value + 250
        loggedIn.value = false

        username.value = ""
        password.value = ""

    }

    loading.value = false

}

</script>