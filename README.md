# Feed history

Retrieve the price at every block from a medianizer or price-feed contract.

## Dependencies

You will need node and npm:
```bash
npm install
```

And more importantly, an Ethereum node running in archive mode

## Usage

```bash
npm start [path to rpc node] [oracle contract address] [address of a whitelisted contract] [starting block] [last block]
```

## Example

Using the current ETH_BTC MakerDAO Medianizer:

```bash
npm start https://eth-mainnet.alchemyapi.io/v2/XXXX 0x81A679f98b63B3dDf2F17CB5619f4d6775b3c5ED 0xA3F68d722FBa26173aB64697B4625d4aD0F4C818 10900000 10900006
```

Will return the last 7 blocks starting from block 10900000 and going back to block 1090006. 

```
block,    timestamp,  price,    changed 
10900000, 1600615026, 0.034377, yes
10900001, 1600615034, 0.034377, no
10900002, 1600615042, 0.034377, no
10900003, 1600615070, 0.034377, no
10900004, 1600615079, 0.034377, no
10900005, 1600615101, 0.034377, no
10900006, 1600615122, 0.034377, no
```
