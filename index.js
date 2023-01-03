import { WebSocketServer } from 'ws'

import DHT from '@hyperswarm/dht'
import { relay } from '@hyperswarm/dht-relay'
import Stream from '@hyperswarm/dht-relay/ws'

const dht = new DHT()
const server = new WebSocketServer({ port: 8080 })

server.on('connection', (socket) => {
  relay(dht, new Stream(false, socket))
})

console.log("DHT relay running on port 8080")
