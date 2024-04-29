export default defineNuxtPlugin(app => {

    const createGetOptions = () => {

        return {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        } 
    }

    const createPostOptions = (body = {}) => {

        return {
            method: "POST",
            body: body,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        } 
    }

    const handleError = (err, url) => {

        alert(err.message)

        throw err
    }

    const get = async (url, body = {}) => $fetch( url, createGetOptions(body)).catch(err => handleError(err, url) )
    
    const post = async (url, body = {}) => $fetch( url, createPostOptions(body)).catch(err => handleError(err, url) )
  
    return {
        provide: {

            api: {

                get,

                post,

                trezor: {

                },

                backend: {

                    getWallets: () => get("/api/wallets").then( data => data.data )

                },

                blockstream: {

                    getFeeList: () => get("/blockstream/api/fee-estimates")

                },

                binance: {

                    getPrice: ( symbol = "BTCUSDT" ) => get(`/binance/api/v3/avgPrice?symbol=${symbol}`).then( (data) => parseFloat(data.price) )

                },

                trezor: {

                    getTx: ( txId ) => get(`/trezor/api/v2/tx/${txId}`)

                },

            }
        }
    }
})

