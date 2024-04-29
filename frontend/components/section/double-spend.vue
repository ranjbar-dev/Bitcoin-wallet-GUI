<template>

    <div class="flex-1 flex text-center">

        <div class="w-96 border border-dark-400 px-4 py-3">

            <table v-if="!price_loading" >
                <tbody>
                    <tr>
                        <th>BTC price</th>
                        <td>{{ price.toFixed(2) }} usd</td>
                    </tr>
                </tbody>
            </table>

            <div class="my-5"></div>

            <table v-if="!fee_list_loading">
                <thead>
                    <tr>
                        <th colspan="2">BTC Fee estimation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> 10 Min </td>
                        <td> {{ fee_list[1].toFixed(2) }} sat/vbyte </td>
                    </tr>
                    <tr>
                        <td> 30 Min </td>
                        <td> {{ fee_list[3].toFixed(2) }} sat/vbyte </td>
                    </tr>
                    <tr>
                        <td> 1 Hour </td>
                        <td> {{ fee_list[6].toFixed(2) }} sat/vbyte </td>
                    </tr>
                    <tr>
                        <td> 4 Hour </td>
                        <td> {{ fee_list[24].toFixed(2) }} sat/vbyte </td>
                    </tr>
                    <tr>
                        <td> 1 Day </td>
                        <td> {{ fee_list[144].toFixed(2) }} sat/vbyte </td>
                    </tr>
                    <tr>
                        <td> 5 Day </td>
                        <td> {{ fee_list[504].toFixed(2) }} sat/vbyte </td>
                    </tr>
                </tbody>
            </table>

            <div class="my-5"></div>

            <div class="h-96 overflow-auto" v-if="!wallets_loading">
                <table>
                    <thead>
                        <tr>
                            <th colspan="2">Wallets</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item of wallets">
                            <td> {{ item.label }} </td>
                            <td> {{ item.address.substring(0, 8) + "..." + item.address.substring( item.address.length - 8 , item.address.length ) }} </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

        <div class="min-w-96 flex-1 border border-dark-400 flex justify-center items-center">

            <LoadingSpinner v-if="transaction_loading" />

            <template v-else-if="transaction == null">

                <div class="w-64 flex flex-col">

                    <label class="text-sm mb-1" for="txid">TxId</label>
                    <input class="text-sm bg-dark-400 rounded py-1.5 px-2" type="text" v-model="txId">

                    <button class="text-base bg-dark-400 rounded px-5 py-1 mt-4" @click="fetchTransaction">fetch</button>

                </div>

            </template>

            <template v-else >

                kho kif

            </template>

        </div>
        
        <div class="w-96 border border-dark-400 px-4 py-3" v-if="transaction != null">

            <table>
                <tbody>
                    <tr>
                        <th>TxId</th>
                        <td>{{ transaction.txid.substring(0, 8) + "..." + transaction.txid.substring( transaction.txid.length - 8 , transaction.txid.length ) }}</td>
                    </tr>
                    <tr>
                        <th>Confirmations</th>
                        <td>{{ transaction.confirmations }}</td>
                    </tr>
                    <tr>
                        <th>vSize</th>
                        <td>{{ transaction.vsize }}</td>
                    </tr>
                    <tr>
                        <th>Fee BTC</th>
                        <td>{{ parseFloat(transaction.fees) / 100000000 }} </td>
                    </tr>
                    <tr>
                        <th>Fee USD</th>
                        <td>{{ parseFloat(( parseFloat(transaction.fees) / 100000000 ) * price).toFixed(2) }} </td>
                    </tr>
                </tbody>
            </table>

            <button class="text-base bg-dark-400 rounded px-5 py-1 mt-4" @click="cencelTransaction">Cancel</button>

        </div>
        
    </div>
    
</template>
<script setup>

const blockchainStore = useBlockchainStore() 
const walletStore = useWalletStore() 
const transactionStore = useTransactionStore() 

const { fee_list, price, fee_list_loading, price_loading } = storeToRefs(blockchainStore)
const { wallets, wallets_loading } = storeToRefs(walletStore)
const { transaction, transaction_loading } = storeToRefs(transactionStore)

const txId = ref("")

onMounted( () => {

    blockchainStore.fetchFeeList()
    blockchainStore.fetchPrice()
    walletStore.fetchWallets()

})

const fetchTransaction = () => {
    transactionStore.fetchTransaction(txId.value)
    txId.value = ""
}

const cencelTransaction = () => {
    transactionStore.setTransaction(null)
}

</script>

<style>
table {
    @apply w-full text-sm ;
}
th {
    @apply border border-dark-400 py-2 px-2 ;
}
td {
    @apply border border-dark-400 py-2 px-2 ;
}
</style>