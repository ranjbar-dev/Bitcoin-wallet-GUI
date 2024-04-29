import { defineStore } from 'pinia'

export const useBlockchainStore = defineStore('blockchain', () => {
    
    const { $api } = useNuxtApp() 

    const fee_list = ref([])
    const price = ref(0)
    const fee_list_loading = ref(true)
    const price_loading = ref(true)

    const fetchFeeList = () => {

        fee_list_loading.value = true
        $api.blockstream.getFeeList()
        .then( (records) => fee_list.value = records )
        .finally( () => fee_list_loading.value = false )
    }

    const fetchPrice = () => {

        price_loading.value = true
        $api.binance.getPrice()
        .then( ( value ) => price.value = value )
        .finally( () => price_loading.value = false )
    }

    return { 
        fee_list, fee_list_loading, fetchFeeList,
        price, price_loading, fetchPrice,
     }

})