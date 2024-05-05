import { abi, contractAddress } from "./constans.js"
import { ethers } from "./ethers-5.1.esm.min.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
connectButton.onclick = connect
fundButton.onclick = fund

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
            console.log(error)
        }
        connectButton.innerHTML = "Connected!"
        const accounts = await ethereum.request({ method: "eth_accounts" })
    } else {
        connectButton.innerHTML = "Please install MetaMask!!"
    }
}

async function fund() {
    const ethAmount = "0.1"
    console.log(`Funding with ${ethAmount}...`)
    if (typeof window.ethereum !== "undefined") {
        // provider / connection to the blockchain
        // signer / wallet / someoen with some gas
        // contract that we are interacting with
        // ^ ABI & address
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        console.log(signer)
        const contract = new ethers.Contract(contractAddress, abi, signer)

        const transactionResponse = await contract.fund({
            value: ethers.utils.parseEther(ethAmount),
        })
    }
}
