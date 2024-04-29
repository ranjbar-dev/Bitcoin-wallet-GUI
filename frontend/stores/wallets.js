import { defineStore } from 'pinia'

export const useWalletStore = defineStore('wallets', () => {
    
    const { $api } = useNuxtApp() 

    const wallets = ref([])
    const wallets_loading = ref(true)

    const fetchWallets = () => {

        wallets_loading.value = true
        $api.backend.getWallets()
        .then( (records) => wallets.value = records )
        .finally( () => wallets_loading.value = false )
    }

    return { 
        wallets, wallets_loading, fetchWallets,
     }

})