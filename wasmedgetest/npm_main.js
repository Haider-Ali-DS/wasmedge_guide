const solanaWeb3 = require('@solana/web3.js');
var connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'));
connection.getBlockHeight().then((data) => {
    console.log(data);
})