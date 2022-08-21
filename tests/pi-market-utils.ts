import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import {
  BidExecuted,
  BidOrderReturn,
  TokenMetaReturn
} from "../generated/piMarket/piMarket"

export function createBidExecutedEvent(price: BigInt): BidExecuted {
  let bidExecutedEvent = changetype<BidExecuted>(newMockEvent())

  bidExecutedEvent.parameters = new Array()

  bidExecutedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return bidExecutedEvent
}

export function createBidOrderReturnEvent(bid: ethereum.Tuple): BidOrderReturn {
  let bidOrderReturnEvent = changetype<BidOrderReturn>(newMockEvent())

  bidOrderReturnEvent.parameters = new Array()

  bidOrderReturnEvent.parameters.push(
    new ethereum.EventParam("bid", ethereum.Value.fromTuple(bid))
  )

  return bidOrderReturnEvent
}

export function createTokenMetaReturnEvent(
  data: ethereum.Tuple,
  id: BigInt
): TokenMetaReturn {
  let tokenMetaReturnEvent = changetype<TokenMetaReturn>(newMockEvent())

  tokenMetaReturnEvent.parameters = new Array()

  tokenMetaReturnEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromTuple(data))
  )
  tokenMetaReturnEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return tokenMetaReturnEvent
}
