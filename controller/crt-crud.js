const mongoose = require('mongoose');
const dao = require('../dao/dao-generic');
const mapStatus = require('../helpers/map-status');

// DB Config
const db = require('../config/database');
mongoose.connect(db.mongoURI, {
  useNewUrlParser: true
})
.then(() => {
  global.isDbConnected = true;
})
.catch(err => {
  global.isDbConnected = false;
  console.error(err); 
});
global.instantiateMessage = require('hp-message').createObjMsg;

var newModule = {
    setCollection: (fileName, collectionName, primaryKey, excludedKeys) => {
        dao.setCollection(fileName, collectionName, primaryKey, excludedKeys);
    },
    getDAO: () => {
        return dao;
    },
    saveOrUpdate: (editing, req, fncResult) => {
        let element = !editing ? req.body : req.params;
        dao.findByPKAllStatus(element, false, (result) => {
            if (!editing && result){
                return fncResult(instantiateMessage(500, 'hedz.already.exists'), result);
            }else if (editing){
                if (!result){
                    return fncResult(instantiateMessage(404, 'hedz.not.found'), 'hedz.not.found');
                }
            }
            dao.saveOrUpdate(result, req.body, (result) => {
                const msg = instantiateMessage(200, 'hedz.msg.success');
                msg.result = result;
                return fncResult(msg, false);
            },(error) => {
                const msg = instantiateMessage(500, 'hedz.msg.error.generic');
                msg.systemError = error;
                return fncResult(msg, error);
            });
        }, (error) => {
            const msg = instantiateMessage(500, 'hedz.msg.error.generic');
            msg.systemError = error;
            return fncResult(msg, error);
        });
    },
    archive: (req, fncResult) => {
        dao.findByPK(req.params, false, (result) => {
            if (result){
                console.log(result);
                result.status = mapStatus.ARCHIVED;
                dao.saveOrUpdate(result, result, (result) => {
                    const msg = instantiateMessage(200, 'hedz.msg.success');
                    msg.archived = true;
                    msg.result = result;
                    return fncResult(msg, false);
                },(error) => {
                    const msg = instantiateMessage(500, 'hedz.msg.error.generic');
                    msg.systemError = error;
                    return fncResult(msg, true);
                });
            }else {
                return fncResult(instantiateMessage(404, 'hedz.not.found'), true);
            }
        }, (error) => {
            const msg = instantiateMessage(500, 'hedz.msg.error.generic');
            msg.systemError = error;
            return fncResult(msg, true);
        });
    },
    delete: (req, fncResult) => {
        dao.delete(req.params, (result) => {
            if (!result){
                return fncResult(instantiateMessage(404, 'hedz.not.found'), true);
            }else {
                const msg = instantiateMessage(200, 'hedz.msg.success');
                msg.deleted = true;
                msg.result = result;
                return fncResult(msg, false);
            }
        },(error) => {
            const msg = instantiateMessage(500, 'hedz.msg.error.generic');
            msg.systemError = error;
            return fncResult(msg, true);
        });
    },
    listAll: (fncResult) => {
        dao.findAll((result) => {
            const msg = instantiateMessage(200, 'hedz.msg.success');
            msg.results = result;
            return fncResult(msg, false);
        }, (error) => {
            const msg = instantiateMessage(500, 'hedz.msg.error.generic');
            msg.systemError = error;
            return fncResult(msg), true;
        });
    },
    getByPK: (req, returnAllFields,  fncResult) => {
        dao.findByPK(req.params, returnAllFields, (result) => {
            if (!result){
                return fncResult(instantiateMessage(404, 'hedz.not.found'), true);
            }else {
                const msg = instantiateMessage(200, 'hedz.msg.success');
                msg.result = result;
                return fncResult(msg, false);
            }
        }, (error) => {
            const msg = instantiateMessage(500, 'hedz.msg.error.generic');
            msg.systemError = error;
            return fncResult(msg, true);
        });
    },
    getByPKAllStatus: (req, returnAllFields,  fncResult) => {
        dao.findByPKAllStatus(req.params, returnAllFields, (result) => {
            if (!result){
                return fncResult(instantiateMessage(404, 'hedz.not.found'), true);
            }else {
                const msg = instantiateMessage(200, 'hedz.msg.success');
                msg.result = result;
                return fncResult(msg, false);
            }
        }, (error) => {
            const msg = instantiateMessage(500, 'hedz.msg.error.generic');
            msg.systemError = error;
            return fncResult(msg, true);
        });
    }
};

module.exports = newModule;