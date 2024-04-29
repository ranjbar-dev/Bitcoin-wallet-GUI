import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('transaction', () => {
    
    const { $api } = useNuxtApp() 

    const transaction = ref(null)
    const transaction_loading = ref(false)

    const fetchTransaction = ( txId ) => {

        transaction_loading.value = true
        $api.trezor.getTx(txId)
        .then( (data) => transaction.value = data )
        .finally( () => transaction_loading.value = false )
    }

    const setTransaction = ( value ) => {
        transaction_loading.value = true 
        transaction.value = value
        transaction_loading.value = false
    }

    return { 
        transaction, transaction_loading, fetchTransaction, setTransaction
     }

})