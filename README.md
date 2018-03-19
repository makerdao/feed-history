# Feed history

Retrieve the price at every block from a medianizer or price-feed contract.

## Dependencies

You will need `seth` https://dapp.tools/seth/

And more importantly, an Ethereum node running in archive mode

## Usage

```bash
export ETH_RPC_URL=[path to node]
./run.sh <address> [blocks to report] [starting block]
```

If you have a node running at http://localhost:8545 then you do not need to export the `ETH_RPC_URL` variable.

`[blocks to read]` and `[starting block]` are optional. By default it will read the last 256 blocks starting at the current latest block.

## Example

Using the current ETH_USD MakerDAO Medianizer:

```bash
./run.sh 0x729D19f657BD0614b4985Cf1D82531c67569197B 4096 5280000
```

Will return the last 4096 blocks starting from block 5280000 and going back to block 5275904. 

```
5280000 1521415391 544.755000000000000000 CHANGED
5279999 1521415380 544.755000000000000000 
5279998 1521415366 544.755000000000000000 
5279997 1521415359 544.755000000000000000 
5279996 1521415353 544.755000000000000000 
5279995 1521415319 544.755000000000000000 
5279994 1521415312 544.755000000000000000 
5279993 1521415283 544.755000000000000000 
5279992 1521415236 544.755000000000000000 
5279991 1521415226 544.755000000000000000
```