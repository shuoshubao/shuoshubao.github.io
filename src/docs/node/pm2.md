# Installation

```
npm i -g pm2@latest
```

# Usage

```
pm2 start app.js
```

# Application-declaration

> process.yml

```
apps:
  - script   : app.js
    instances: 4
    exec_mode: cluster
  - script : worker.js
    watch  : true
    env    :
      NODE_ENV: development
    env_production:
      NODE_ENV: production
```

> pm2 start process.yml

# setup-startup-script

> pm2 startup

# Listing

* pm2 list
* pm2 jlist
* pm2 prettylist
* pm2 describe [id]
* pm2 monit

# Logs

* pm2 logs [--raw]
* pm2 flush
* pm2 reloadLogs

# Actions

* pm2 stop all
* pm2 restart all
* pm2 reload all 
* pm2 gracefulReload all

* pm2 stop [id]
* pm2 restart [id]

* pm2 delete [id]
* pm2 delete all

# Misc

* pm2 reset <process>
* pm2 updatePM2
* pm2 ping
* pm2 start app.js --no-daemon
* pm2 start app.js --no-vizion
* pm2 start app.js --no-autorestart