const path = require('path')

module.exports = {
  apps: [{
    name: 'app',
    script: 'index.js', // Your entry point
    instances: 1,
    autorestart: true,
    max_memory_restart: '1G',
  }]
}