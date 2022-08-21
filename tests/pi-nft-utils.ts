import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  ReceivedERC20,
  RoyaltiesSetForTokenId,
  Transfer,
  TransferERC20
} from "../generated/piNFT/piNFT"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createReceivedERC20Event(
  _from: Address,
  _tokenId: BigInt,
  _erc20Contract: Address,
  _value: BigInt
): ReceivedERC20 {
  let receivedErc20Event = changetype<ReceivedERC20>(newMockEvent())

  receivedErc20Event.parameters = new Array()

  receivedErc20Event.parameters.push(
    new ethereum.EventParam("_from", ethereum.Value.fromAddress(_from))
  )
  receivedErc20Event.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )
  receivedErc20Event.parameters.push(
    new ethereum.EventParam(
      "_erc20Contract",
      ethereum.Value.fromAddress(_erc20Contract)
    )
  )
  receivedErc20Event.parameters.push(
    new ethereum.EventParam("_value", ethereum.Value.fromUnsignedBigInt(_value))
  )

  return receivedErc20Event
}

export function createRoyaltiesSetForTokenIdEvent(
  tokenId: BigInt,
  royalties: Array<ethereum.Tuple>
): RoyaltiesSetForTokenId {
  let royaltiesSetForTokenIdEvent = changetype<RoyaltiesSetForTokenId>(
    newMockEvent()
  )

  royaltiesSetForTokenIdEvent.parameters = new Array()

  royaltiesSetForTokenIdEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  royaltiesSetForTokenIdEvent.parameters.push(
    new ethereum.EventParam(
      "royalties",
      ethereum.Value.fromTupleArray(royalties)
    )
  )

  return royaltiesSetForTokenIdEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}

export function createTransferERC20Event(
  _tokenId: BigInt,
  _to: Address,
  _erc20Contract: Address,
  _value: BigInt
): TransferERC20 {
  let transferErc20Event = changetype<TransferERC20>(newMockEvent())

  transferErc20Event.parameters = new Array()

  transferErc20Event.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )
  transferErc20Event.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  transferErc20Event.parameters.push(
    new ethereum.EventParam(
      "_erc20Contract",
      ethereum.Value.fromAddress(_erc20Contract)
    )
  )
  transferErc20Event.parameters.push(
    new ethereum.EventParam("_value", ethereum.Value.fromUnsignedBigInt(_value))
  )

  return transferErc20Event
}
