#!/usr/bin/env node

'use strict';

const fs = require('fs');
const glob = require('glob').sync;
const program = require('commander');
const pkgInfo = require('./package.json');
const MongoClient = require('mongodb').MongoClient;

program
  .version(pkgInfo.version)
  .usage('<directory> [mongourl]')
  .parse(process.argv);

const dir = program.args[0];
const mongourl = program.args[1] || 'mongodb://localhost:27017/weflex-api';

if (!dir) {
  console.error('directory required');
}

try {
  fs.accessSync(dir);
  const models = glob(dir + '/common/models/*.json').map(require);
  const modelconf = require(dir + '/server/model-config.json');
  MongoClient.connect(mongourl, function (err, db) {
    Promise.all(
      models.map(function (model) {
        return new Promise(function (resolve, reject) {
          db.collection(model.name).findOne(function (err, data) {
            if (!data) {
              console.warn(`o <${model.name}> skip the mode ${model.name}`);
              resolve(false);
              return;
            }
            for (let key in model.properties) {
              const prop = model.properties[key];
              const item = data[key];
              if (key === 'id') key = '_id';
              if (prop.required === true && item === undefined) {
                console.error(`- <${model.name}> ${key} is required now`);
              }
              if (typeof prop.type === 'string') {
                const type = prop.type.toLowerCase();
                if (type === 'any') continue;
                if (type !== typeof item) {
                  console.error(`- <${model.name}> ${key} should be type(${prop.type})`);
                }
              } else {
                console.warn(`o <${model.name}> skip the check for ${key}`);
              }
            }
            resolve(true);
          });
        });
      })
    )
    .then(function () {
      db.close();
    });
  });

} catch (e) {
  console.error(e);
}
