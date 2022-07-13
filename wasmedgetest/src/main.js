const solanaWeb3 = require('@solana/web3.js');
var connection = solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'));
console.log(connection.getBlockHeight());