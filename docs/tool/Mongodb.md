# Introduce

* [官网](https://www.mongodb.com/)
* [下载](https://www.mongodb.com/download-center)
* [GUI - robomongo](https://robomongo.org/)

# Install

* brew update
* brew install mongodb
* export PATH=`<mongodb-install-directory>`/bin:$PATH
> export PATH=/usr/local/mongodb/bin:$PATH
* mkdir -p /data/db
* mongod --dbpath `<path to data directory>`
* [Referrence](https://docs.mongodb.com/getting-started/shell/tutorial/install-mongodb-on-os-x/)

# Concept

| SQL | MongoDB | explain |
|---|---|---|
| database | database | 数据库 |
| table | collection | 数据库表/集合 |
| row | document | 数据记录行/文档 |
| column | field | 数据字段/域 |
| index | index | 索引 |
| table joins | | 表连接,MongoDB不支持 |
| primary key | primary key | 主键,MongoDB自动将_id字段设置为主键 |

| RDBMS | MongoDB |
|-|-|
| 数据库 | 数据库 |
| 表格 | 集合 |
| 行 | 文档 |
| 列 | 字段 |
| 表联合 | 嵌入文档 |
| 主键 |  主键 (MongoDB 提供了 key 为 _id ) |

# Shell

```
if 设置了环境变量
  mongo
else
  cd `<mongodb-install-directory>`/bin
  ./mongo
```

```
# 显示当前数据库名
db

# 显示所有数据库列表
show dbs

# 创建/切换数据库
use db_name

# 文档
db.collection_name
db.collection_name.find()
db.collection_name.findOne()
db.collection_name.insert(document)
db.collection_name.save(<document>, {writeConcern: <document>})
db.collection_name.update(<query>, <update>, {upsert: <boolean>, multi: <boolean>, writeConcern: <document>})
db.collection_name.remove(<query>, <justOne>)

# 删除当前数据库
db.dropDatabase()

# 删除集合
db.collection_name.drop()
```

#  MongoDB Package Components

## mongod

```
--help, -h
--version
--verbose, -v
--config <filename>, -f <filename>
--quiet
--port <port> Default: 27017
--bind_ip <ip address>
--logpath <path>
--logappend
--logRotate <string> Default: rename
--timeStampFormat <string> Default: iso8601-local   ctime | iso8601-utc | iso8601-local
--syslog
--syslogFacility <string> Default: user
--traceExceptions
--pidfilepath <path>
--keyFile <file>
--setParameter <options>
--nounixsocket
--unixSocketPrefix <path> Default: /tmp
--filePermissions <path> Default: 0700
--fork
--auth
--noauth
--transitionToAuth
--jsonp
--profile <level> Default: 0 0 | 1 | 2
--cpu
```

## mongoimport

> mongoexport --db `db_name` --collection `collection_name` --out `data.json`

## mongoexport

### json

> mongoexport --db `db_name` --collection `collection_name` --out `data.json`

### csv

> mongoexport --db `db_name` --collection `collection_name` --type=csv --fields `field1,field2` --out `data.csv`