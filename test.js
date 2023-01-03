import test from 'brittle'
import {SDK} from '@synonymdev/slashtags-sdk'

import relay from './lib/relay.js'

test("direct - connect to seeder through topic", async (t) => {
  const { address, destroy } = relay()

  const tc = t.test('conn')
  tc.plan(1)

  const sdk = new SDK({relay: address})

  const topic = Buffer.from("3b9f8ccd062ca9fc0b7dd407b4cd287ca6e2d8b32f046d7958fa7bea4d78fd75", "hex")

  sdk.swarm.on('connection', () => {
    tc.pass("connected to a seeder!")
  })

  sdk.swarm.join(topic, {server: false, client: true})
  sdk.swarm.joinPeer(Buffer.from("34578ea56c906bcde928a00fd89109d395d1ac6a8d43b1bde22ead64bb6c093e", "hex"))

  await tc

  await destroy()
  await sdk.close()
})


test("with relay - connect to seeder through topic", async (t) => {
  const {address, destroy} = relay()

  const tc = t.test('conn')
  tc.plan(1)

  const sdk = new SDK({relay: address})

  const topic = Buffer.from("3b9f8ccd062ca9fc0b7dd407b4cd287ca6e2d8b32f046d7958fa7bea4d78fd75", "hex")

  sdk.swarm.on('connection', () => {
    tc.pass("connected to a seeder!")
  })

  sdk.swarm.join(topic, {server: false, client: true})
  sdk.swarm.joinPeer(Buffer.from("34578ea56c906bcde928a00fd89109d395d1ac6a8d43b1bde22ead64bb6c093e", "hex"))

  await tc

  await destroy()
  await sdk.close()
})
