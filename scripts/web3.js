let account = null;
let transferContract = null;
const TRANSFER_ABI = '[{"inputs":[{"internalType":"address payable","name":"_to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"sendViaCall","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"sendViaCallMsg","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_to","type":"address"}],"name":"sendViaSend","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_to","type":"address"}],"name":"sendViaTransfer","outputs":[],"stateMutability":"payable","type":"function"}]\n';
const TRANSFER_ADDRESS = '0x963c9F988A2746D9d433603d282B1eDA507fe959';
let profitOption = null;

(async () => {
  const connectWalletBtn = document.querySelector('#connectWallet');
  const accountID = document.querySelector('#account-id');
  const investValue = document.querySelector('#invest-value');
  const profitBtns = document.querySelectorAll('.profit-btn');
  const confirmBtn = document.querySelector('#confirm-btn');

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

    interactTransferContract(investValue.value);

  });
})();

const connectMetamask = async () => {
  await window.ethereum.send('eth_requestAccounts');
  window.web3 = new Web3(window.ethereum);

  let accounts = await web3.eth.getAccounts();
  account = accounts[0];
}

const interactTransferContract = async (amount) => {
  const spinner = document.querySelector('#spinner');
  transferContract = await new web3.eth.Contract(JSON.parse(TRANSFER_ABI), TRANSFER_ADDRESS);
  const data = {
    address: '0xda79251323303eBBF57ad02b01Be26563d281CcC',
    amount: amount
  };

  spinner.style.display = 'flex';
  const result = await transferContract
      .methods
      .sendViaCallMsg()
      .send({from: account});

  spinner.style.display = 'none';
  alert(JSON.stringify(result));
  console.log(result);
}