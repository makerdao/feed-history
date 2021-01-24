const { ethers } = require("ethers");
const fs = require("fs")

const file = fs.createWriteStream("data.csv", {flags:'w+'});
file.write("block, timestamp, price, changed \n");

if(process.argv.length!==7){
  throw new Error(`Five arguments are required: rpcUrl, oracleAddress, authorizedReader, fromBlock, toBlock

Example: npm start https://eth-mainnet.alchemyapi.io/v2/XXXX 0x81A679f98b63B3dDf2F17CB5619f4d6775b3c5ED 0xA3F68d722FBa26173aB64697B4625d4aD0F4C818 10900000 10900001
  `)
}
const [, , rpcUrl, oracleAddress, authorizedReader, fromBlock, toBlock] = process.argv;

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const signer = new ethers.VoidSigner(authorizedReader, provider);

const oracleAbi = [
  "function read() view returns (uint256)",
];
const oracleContract = new ethers.Contract(oracleAddress, oracleAbi, signer);

(async ()=>{
  let prevPrice = null;
  for(let block = Number(fromBlock); block<=Number(toBlock); block++){
    const price = await oracleContract.read({ blockTag: block }).then(p=>ethers.utils.formatUnits(p, 18));
    const timestamp = provider.getBlock(block).then(b=>b.timestamp);
    const record = `${block}, ${await timestamp}, ${await price}, ${(await price)!==prevPrice? "yes": "no"}`
    file.write(record+"\n");
    console.log(record);
    prevPrice = price;
  }
})()
