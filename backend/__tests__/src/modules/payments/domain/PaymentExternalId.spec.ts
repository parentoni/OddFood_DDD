import { PaymentExternalId } from '../../../../../src/modules/payments/domain/paymentExternalId'

describe("Payment external id", () => {

  it("Creates with valid data", () => {
    const withCustomId = PaymentExternalId.create({ txid: "595c285cfe9146ea81fa945b1a4b321b" })
    const autoGenerated = PaymentExternalId.createNew()

    expect(withCustomId.isLeft()).toBe(false)
    expect(autoGenerated).toBeDefined()
  })

  it("Fails to be created with invalid data", () => {
    const undefinedId = PaymentExternalId.create({ txid: undefined as unknown as string })
    const nonStringWord = PaymentExternalId.create({ txid: [] as unknown as string })

    expect(undefinedId.isLeft()).toBe(true)
    expect(nonStringWord.isLeft()).toBe(true)
   })


})
