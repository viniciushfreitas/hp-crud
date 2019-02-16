const mongoose = require('mongoose');
const mapStatus = require('../helpers/map-status');

let Collection = null;
let pkNames = [];
let excludedKeysOnResult = [];

var newModule = {
    setCollection: (fileName, collectionName, primaryKey, excludedKeys) => {
        require('../models/'+fileName);
        Collection = mongoose.model(collectionName);
        pkNames = primaryKey;
        excludedKeysOnResult = excludedKeys;
    },
    saveOrUpdate: (oldObj, element, fncSuccess, fncError) => {
        if (!isDbConnected) return fncError({error: '## CRUD ERROR TO CONNECT TO DATABASE!!!!!'});
        let newObj = new Collection({status: mapStatus.ACTIVE});
        if (oldObj){//in case of edit
            newObj = oldObj;
        } 
        Reflect.ownKeys(element).forEach(key => {
            newObj[key] = element[key];
        });

        pkNames.forEach(function (value) {
            if (value != '_id'){
                newObj[value] = newObj[value].toString().toLowerCase();
            }
        });
        
        newObj.save()
        .then(collection => {
            let copy = JSON.parse(JSON.stringify(collection));
            if (excludedKeysOnResult && excludedKeysOnResult.length>0){
                excludedKeysOnResult.forEach(function (value) {
                    delete copy[value];
                });
            }
            fncSuccess(copy);
        })
        .catch((err) => {
            console.log(`caught the error: ${err.stack}`);
            fncError(err.stack);
        });
    },
    delete: (element, fncSuccess, fncError) => {
        if (!isDbConnected) return fncError({error: '## CRUD ERROR TO CONNECT TO DATABASE!!!!!'});
        let params = {};
        pkNames.forEach(function (value) {
            params[value] = element[value];
        });
        Collection.findOne(params)
        .then(obj => {
            if (!obj) return fncSuccess(obj);
            obj.remove();
            fncSuccess(obj);
        }).catch((err) => {
            if (`${err.name}` == 'CastError' && `${err.kind}` == 'ObjectId'){
                return fncSuccess(null);
            }
            console.log(`caught the error: ${err.stack}`);
            fncError(err.stack);
        });
    },
    findAll: (fncSuccess, fncError) => {
        if (!isDbConnected) return fncError({error: '## CRUD ERROR TO CONNECT TO DATABASE!!!!!'});
        let excluded = {};
        excludedKeysOnResult.forEach(function (value) {
            excluded[value] = 0;
        });
        Collection.find({}, excluded)
        .then(obj => {
            fncSuccess(obj);
        }).catch((err) => {
            console.log(`caught the error: ${err.stack}`);
            fncError(err.stack);
        });
    },
    findByPK: (element, returnAllFields, fncSuccess, fncError) => {
        findByPK(element, returnAllFields, (result)=>{
            fncSuccess(result);
        }, (error) => {
            fncError(error);
        }, false);
    },
    findByPKAllStatus: (element, returnAllFields, fncSuccess, fncError) => {
        findByPK(element, returnAllFields, (result)=>{
            fncSuccess(result);
        }, (error) => {
            fncError(error);
        }, true);
    }
};

const findByPK = (element, returnAllFields, fncSuccess, fncError, returnAll) => {
    if (!isDbConnected) return fncError({error: '## CRUD ERROR TO CONNECT TO DATABASE!!!!!'});
    let excluded = {};
    if (!returnAllFields){
        excludedKeysOnResult.forEach(function (value) {
            excluded[value] = 0;
        });
    }
    let params = {};
    pkNames.forEach(function (value) {
        params[value] = element[value];
        if (value != '_id'){
            params[value] = params[value].toString().toLowerCase();
        }
    });
    
    if (!returnAll){
        params.status = {$ne: mapStatus.ARCHIVED};
    }
    Collection.findOne(params, excluded)
    .then(obj => {
        fncSuccess(obj);
    }).catch((err) => {
        if (`${err.name}` == 'CastError' && `${err.kind}` == 'ObjectId'){
            return fncSuccess(null);
        }
        console.log(`caught the error: ${err.stack}`);
        fncError(err.stack);
    });
}

module.exports = newModule;