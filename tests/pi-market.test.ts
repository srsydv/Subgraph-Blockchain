import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { BidExecuted } from "../generated/schema"
import { BidExecuted as BidExecutedEvent } from "../generated/piMarket/piMarket"
import { handleBidExecuted } from "../src/pi-market"
import { createBidExecutedEvent } from "./pi-market-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let price = BigInt.fromI32(234)
    let newBidExecutedEvent = createBidExecutedEvent(price)
    handleBidExecuted(newBidExecutedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BidExecuted created and stored", () => {
    assert.entityCount("BidExecuted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BidExecuted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "price",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
