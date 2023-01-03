import { WebSocketServer } from 'ws'
import DHT from '@hyperswarm/dht'
import { relay } from '@hyperswarm/dht-relay'
import Stream from '@hyperswarm/dht-relay/ws'

export default function (config = {}) {
  const port = config.port || 8080

  const dht = new DHT()
  const server = new WebSocketServer({ port })

  server.on('connection', (socket) => {
    relay(dht, new Stream(false, socket))
  })

  return {
    port,
    address: 'ws://localhost:' + port,
    destroy: async () => {
      dht.destroy();
      server.close()
    }
  }
}
