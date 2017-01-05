# Introduce

* [官网](https://www.mongodb.com/)
* [下载](https://www.mongodb.com/download-center)
* [GUI - robomongo](https://robomongo.org/)

# Install

## [brew](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

> brew install mongodb

## [manually](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

> curl -O https://fastdl.mongodb.org/osx/mongodb-osx-x86_64-3.4.1.tgz

> tar -zxvf mongodb-osx-x86_64-3.4.1.tgz

> mkdir -p mongodb

> cp -R -n mongodb-osx-x86_64-3.4.1/ mongodb

> export PATH=<mongodb-install-directory>/bin:$PATH

# Run

> mkdir -p /data/db

> cd <mongodb-install-directory>/bin

> ./mongod

# Shell

> cd <mongodb-install-directory>/bin

> ./mongo

# Concept

| SQL | MongoDB | explain |
|-|-|-|
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

# Shell command

* 显示当前数据库名

> db

* 显示所有数据库列表

> show dbs

* 创建/切换数据库

> use db_name

* 文档

> db.collection_name

> db.collection_name.find()

> db.collection_name.findOne()

> db.collection_name.insert(document)

> db.collection_name.save(<document>, {writeConcern: <document>})

> db.collection_name.update(<query>, <update>, {upsert: <boolean>, multi: <boolean>, writeConcern: <document>})

> db.collection_name.remove(<query>, <justOne>)

* 删除当前数据库

> db.dropDatabase()

* 删除集合

> db.collection_name.drop()






