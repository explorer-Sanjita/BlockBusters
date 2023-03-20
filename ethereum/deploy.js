const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require("./build/CampaignFactory.json");
const compiledCampaign = require("./build/Campaign.json");
//const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
'side crystal elite urban feature hip bomb style jacket syrup boy artefact',
'https://goerli.infura.io/v3/58bf599f68d444aeb3ba87dbe5740ccb');//for unlocking accounts in goerli testnet...

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account : ',accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000' , from: accounts[0] });

    console.log('Contract deployed to : ', result.options.address);
    provider.engine.stop();
};
deploy();