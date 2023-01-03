import config from './config.json' assert { type: "json" };
import relay from './lib/relay.js'

const { port } = relay(config)

console.log("DHT relay running on port", port)
