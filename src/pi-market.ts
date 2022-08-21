import { BigInt,Address, BigDecimal,store, TypedMap } from "@graphprotocol/graph-ts"
import {
  BidExecuted as BidExecutedEvent,
  BidOrderReturn as BidOrderReturnEvent,
  piMarket,
  TokenMetaReturn as TokenMetaReturnEvent
} from "../generated/piMarket/piMarket"
import { piNFT } from "../generated/piNFT/piNFT";
import {
  BidExecuted,
  BidOrderReturn,
  TokenMetaReturn
} from "../generated/schema"
import {  Nft, Sale, Bid  } from "../generated/schema"


// export function handleBidExecuted(event: BidExecutedEvent): void {
//   let entity = new BidExecuted(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   )
//   entity.price = event.params.price
//   entity.save()
// }

export function handleBidOrderReturn(event: BidOrderReturnEvent): void {
  let bidId = event.params.bid.bidId.toString();
  let saleId = event.params.bid.saleId.toString();
  let id = saleId+"/"+bidId;
    let bidData = new Bid(id);
    bidData.bidId = event.params.bid.bidId
    bidData.saleId = event.params.bid.saleId;
    bidData.sellerAddress = event.params.bid.sellerAddress
    bidData.buyerAddress = event.params.bid.buyerAddress
    bidData.price = event.params.bid.price
    bidData.withdrawn = event.params.bid.withdrawn
    bidData.save()
  let contract = piMarket.bind(event.address)
  let data = contract._tokenMeta(event.params.bid.saleId)
  let nftId = (data.value1.toHexString()+"/"+data.value2.toString())
  let nft = Nft.load(nftId)
  if(nft == null){
    nft = new Nft(nftId)
  }
  let bids = nft.bids;
  if(bids==null){
    nft.bids = [id];
  }else{
    bids.push(id);
    nft.bids = bids;
  }
  nft.save();
}

export function handleTokenMetaReturn(event: TokenMetaReturnEvent): void {
    let tokenID = event.params.data.tokenId.toString();
    let nft = new Nft(tokenID);

    nft.blockNumber = event.block.number
    nft.transactionHash = event.transaction.hash
    nft.tokenId = event.params.data.tokenId
    nft.createdAt = event.block.timestamp;
    nft.sale = event.params.data.saleId.toString();
    let bids = nft.bids;
    if(bids==null){
      nft.bids = ['0'];
    }else{
      bids.push('0');
      nft.bids = bids;
    }
    nft.save();
 updateSaledata(event.params.data.saleId, event.address, event.params.data.directSale)

}
// export function updateCollection(nftId: BigInt, address:Address, event:TokenMetaReturn ): void{
//   let id = address.toHexString();
//   if (Collection.load(id) == null){
//     let nftContract = new Collection(id)
//     let contract = erc721.bind(address);
//     nftContract.name = contract.name();
//     nftContract.symbol = contract.symbol();
//     nftContract.creator = contract.owner();
//     nftContract.createdAt = event.block.timestamp;
//     nftContract.save()
//   }
// }

function updateSaledata(saleId: BigInt, address: Address, directSale: bool): void {
  let id = saleId.toString()
 
    let saleData = new Sale(id);
    let contract = piMarket.bind(address)
    let data = contract.try__tokenMeta(saleId);
    saleData.saleId = data.value.value0;
    saleData.tokenAddress = data.value.value1;
    saleData.tokenID = data.value.value2;
    saleData.price = data.value.value3;
    if(directSale!==true){
      saleData.saleType = "BidSale";
      saleData.bidStartTime = data.value.value7;
      saleData.bidEndTime = data.value.value8;
    }else{
      saleData.saleType = "DirectSale";
    }
    saleData.status = data.value.value6;
    saleData.currentOwner = data.value.value9;
    saleData.save();
}