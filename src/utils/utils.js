
const ethers = require('ethers');

function createQuestion(id, title, description, proposals, status, tags) {
    return { id, title, description, proposals, status, tags };
}

function createExpert(id, image, name, description, expertise, points, badges) {
    return { id, image, name, description, expertise, points, badges };
}

function createProposal(id, qid, eid) {
    return { id, qid, eid };
}

let myAddress = null;
function getMyAddress() {
    return myAddress;
}

function setMyAddress(_address) {
    myAddress = _address;
}

const devAngelABI = require('smart-contract/devABI.json');
const provider = new ethers.providers.Web3Provider(window.ethereum, "any"); 
const signer = provider.getSigner();
const devAngelContract = new ethers.Contract("0xaa016E47DE774b404B5DAd3A3481f0f9ff1c5617", devAngelABI, signer);

async function printTx(txReceipt, setTxLink, callback) {
    const link = "https://edu-chain-testnet.blockscout.com/tx/"+txReceipt.hash;
    console.log(link);
    setTxLink && setTxLink(link);
    txReceipt.wait(1).then((result) => {
        callback && callback(result);
        console.log(result);
    })
}

async function askQuestion(creator, title, description, tags, bounty) {
    // ask question call
    let txReceipt = await devAngelContract.askQuestion(creator, title, description, tags, bounty);
    printTx(txReceipt);
}

async function createUser(name, setTxLink, callback) {
    // create user call
    let txReceipt = await devAngelContract.createUser(ethers.utils.getAddress(myAddress), name, 'QmQVUMcKzZ9pbpMK1Pv7kFFc3H6ppYauXV5YP6P5KngayP', ['web3'], 0, 0);
    printTx(txReceipt, setTxLink, callback);
}

async function updateProposer(questionId, address) {
    // add mentor proposer
    let txReceipt = await devAngelContract.updateProposers(questionId, address);
    printTx(txReceipt);
}

const Utils = {
    createQuestion,
    createExpert,
    createProposal,
    getMyAddress,
    setMyAddress,
    createUser,
    updateProposer,
    askQuestion
};

export default Utils;
