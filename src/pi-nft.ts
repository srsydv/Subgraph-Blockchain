import { BigInt,Bytes } from "@graphprotocol/graph-ts"
import { log } from '@graphprotocol/graph-ts'
import { store } from '@graphprotocol/graph-ts'
import {Address, BigDecimal, TypedMap } from "@graphprotocol/graph-ts"
import {
  piNFT,
  Approval,
  ApprovalForAll,
  ReceivedERC20,
  RoyaltiesSetForTokenId,
  Transfer,
  TransferERC20
} from "../generated/piNFT/piNFT"
import { ExampleEntity } from "../generated/schema"

import { Energize } from "../generated/schema"
import { ReleaseToken } from "../generated/schema"
// import { SetRoyalties, Royalities } from "../generated/schema"
import {  Nft } from "../generated/schema"

// export function handleApproval(event: Approval): void {
//   // Entities can be loaded from the store using a string ID; this ID
//   // needs to be unique across all entities of the same type
//   let entity = ExampleEntity.load(event.transaction.from.toHex())

//   // Entities only exist after they have been saved to the store;
//   // `null` checks allow to create entities on demand
//   if (!entity) {
//     entity = new ExampleEntity(event.transaction.from.toHex())

//     // Entity fields can be set using simple assignments
//     entity.count = BigInt.fromI32(0)
//   }

//   // BigInt and BigDecimal math are supported
//   // entity.count = entity.count + BigInt.fromI32(1)

//   // Entity fields can be set based on event parameters
//   entity.owner = event.params.owner
//   entity.approved = event.params.approved

//   // Entities can be written to the store with `.save()`
//   entity.save()

//   // Note: If a handler doesn't require existing field values, it is faster
//   // _not_ to load the entity from the store. Instead, create it fresh with
//   // `new Entity(...)`, set the fields that should be updated and save the
//   // entity back to the store. Fields that were not set or unset remain
//   // unchanged, allowing for partial updates to be applied.

//   // It is also possible to access smart contracts from mappings. For
//   // example, the contract that has emitted the event can be connected to
//   // with:
//   //
//   // let contract = Contract.bind(event.address)
//   //
//   // The following functions can then be called on this contract to access
//   // state variables and other data:
//   //
//   // - contract.mintNFT(...)
//   // - contract.balanceOf(...)
//   // - contract.getApproved(...)
//   // - contract.getRoyalties(...)
//   // - contract.isApprovedForAll(...)
//   // - contract.name(...)
//   // - contract.ownerOf(...)
//   // - contract.royaltiesByTokenId(...)
//   // - contract.supportsInterface(...)
//   // - contract.symbol(...)
//   // - contract.tokenURI(...)
//   // - contract.viewBalance(...)
// }

// export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleReceivedERC20(event: ReceivedERC20): void {
  let tokenID = event.params._tokenId.toString();
  let from = event.params._from.toString();
  let AddERC20 = event.transaction.hash.toString();
    let entity = new Energize(AddERC20)

  entity.from = event.params._from
  entity.tokenId = event.params._tokenId
  entity.erc20Contract = event.params._erc20Contract
  entity.value = event.params._value
  entity.save()
  let nft = Nft.load(tokenID)
  if(nft == null){
    nft = new Nft(tokenID)

  }
  let piNFTs = nft.piNFT;

  if(piNFTs==null){
    nft.piNFT = [AddERC20];
  }else{
    piNFTs.push(AddERC20);
    nft.piNFT = piNFTs;
  }
  
  nft.save();
}

// export function handleRoyaltiesSetForTokenId(
//   event: RoyaltiesSetForTokenId
// ): void {}

export function handleTransfer(event: Transfer): void {
  log.info('Mint From is', [event.params.from.toHexString()])
  let nft = new Nft(event.params.tokenId.toString());
  // nft.tokenAddress = event.address;
  nft.tokenId = event.params.tokenId;
  nft.blockNumber = event.block.number
  nft.transactionHash = event.transaction.hash
  nft.createdAt = event.block.timestamp;
  nft.save();
}

export function handleTransferERC20(event: TransferERC20): void {
  let tokenID = event.params._tokenId.toString();
  // let from = event.params._from.toString();
  let releaseERC20 = event.transaction.hash.toString();
    let entity = new ReleaseToken(releaseERC20)

  entity.to = event.params._to
  entity.tokenId = event.params._tokenId
  entity.erc20Contract = event.params._erc20Contract
  entity.value = event.params._value
  entity.save()
  let nft = Nft.load(tokenID)
  if(nft == null){
    nft = new Nft(tokenID)

  }
  let Releases = nft.releaseTokens;

  if(Releases==null){
    nft.releaseTokens = [releaseERC20];
  }else{
    Releases.push(releaseERC20);
    nft.releaseTokens = Releases;
  }
  
  nft.save();
}
