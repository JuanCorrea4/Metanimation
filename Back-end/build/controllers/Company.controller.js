"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var Jwt = require('jsonwebtoken');
var conexion = require('../config/conexion');
var bcrypt = require('bcrypt');
require('dotenv').config();

// Mostrar Todos
function GetAll(req, res) {
  try {
    var sql = 'select * from Company';
    conexion.query(sql, function (err, rows, fields) {
      if (err) throw err;else {
        res.json(rows);
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error
    });
  }
}

// Leer Usuario
function Get(req, res) {
  try {
    var id = req.params.id;
    var sql = 'select * from Company where Id_Company  = ?';
    conexion.query(sql, [id], function (err, rows, fields) {
      if (err) throw err;else {
        res.json(rows);
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error
    });
  }
}
;

// Agregar Usuario
function SignUp(_x, _x2, _x3) {
  return _SignUp.apply(this, arguments);
}
function _SignUp() {
  _SignUp = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var _req$body, NameCompany, PhoneCompany, EmailCompany, Addres, PasswordCompany, RankMem, sqlEmail, sqlType;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, NameCompany = _req$body.NameCompany, PhoneCompany = _req$body.PhoneCompany, EmailCompany = _req$body.EmailCompany, Addres = _req$body.Addres, PasswordCompany = _req$body.PasswordCompany, RankMem = _req$body.RankMem;
          sqlEmail = "select Id_Company ,NameCompany,EmailCompany from Company where EmailCompany = ?";
          sqlType = "select Id from Type where Descripction= ?";
          conexion.query(sqlType, [RankMem], function (err, rows, fields) {
            var Id_Membreys = rows[0].Id;
            if (rows[0] == undefined) {
              res.status(400).json({
                message: "Rank of Membreys is Unvalid"
              });
            } else {
              conexion.query(sqlEmail, EmailCompany, /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(err, rows, fields) {
                  var BcryptPassword, sql;
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        if (!err) {
                          _context.next = 2;
                          break;
                        }
                        throw err;
                      case 2:
                        if (!(rows[0] === undefined)) {
                          _context.next = 10;
                          break;
                        }
                        _context.next = 5;
                        return bcrypt.hash(PasswordCompany, 10);
                      case 5:
                        BcryptPassword = _context.sent;
                        sql = "insert into Company (NameCompany, PhoneCompany, EmailCompany,Addres,PasswordCompany,Id_Membreys ) values ('".concat(NameCompany, "','").concat(PhoneCompany, "', '").concat(EmailCompany, "', '").concat(Addres, "','").concat(BcryptPassword, "','").concat(Id_Membreys, "')");
                        conexion.query(sql, function (err, rows, fiels) {
                          if (err) throw err;else {
                            res.status(200).json({
                              message: 'Compañia Agregada'
                            });
                          }
                        });
                        _context.next = 11;
                        break;
                      case 10:
                        if (rows[0].email = EmailCompany) {
                          res.status(400).json({
                            Mesage: 'Company/email registered'
                          });
                        }
                      case 11:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x12, _x13, _x14) {
                  return _ref.apply(this, arguments);
                };
              }());
            }
          });
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(400).json({
            error: _context2.t0
          }));
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return _SignUp.apply(this, arguments);
}
;

// Eliminar Usuario
function DeleteCompany(req, res) {
  try {
    var id = req.params.id;
    var sql = "delete from Company where Id_Company = '".concat(id, "'");
    conexion.query(sql, function (err, rows, fields) {
      if (err) throw err;else {
        res.json({
          status: 'Usuario Eliminado'
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error
    });
  }
}
;

// Modify Company
function ModifyCompany(_x4, _x5) {
  return _ModifyCompany.apply(this, arguments);
}
function _ModifyCompany() {
  _ModifyCompany = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id, _req$body2, NameCompany, PhoneCompany, EmailCompany, Addres, PasswordCompany, RankMem, sqlPassword, SqlSearchEmail, SqlSearchConfirmed;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _req$body2 = req.body, NameCompany = _req$body2.NameCompany, PhoneCompany = _req$body2.PhoneCompany, EmailCompany = _req$body2.EmailCompany, Addres = _req$body2.Addres, PasswordCompany = _req$body2.PasswordCompany, RankMem = _req$body2.RankMem;
          sqlPassword = "select PasswordCompany from Company where Id_Company=?";
          SqlSearchEmail = "select EmailCompany from company where EmailCompany =  ?";
          SqlSearchConfirmed = "select EmailCompany from Company where Id_Company = ".concat(req.params.id);
          conexion.query(SqlSearchConfirmed, function (err, rows, fields) {
            if (err) throw err;
            var SearchConfirmed = rows[0].email;
            conexion.query(SqlSearchEmail, [EmailCompany], function (err, rows, fields) {
              if (err) throw err;
              var SearchEmail = rows[0];
              if (SearchEmail == undefined) {
                conexion.query(sqlPassword, [id], function (err, rows, fields) {
                  if (err) throw err;
                  var BcryptPassword = rows[0].PasswordCompany;
                  bcrypt.compare(PasswordCompany, BcryptPassword, /*#__PURE__*/function () {
                    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(err, hash) {
                      var sqlType;
                      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                        while (1) switch (_context3.prev = _context3.next) {
                          case 0:
                            if (!err) {
                              _context3.next = 2;
                              break;
                            }
                            throw err;
                          case 2:
                            if (hash) {
                              sqlType = "select Id from Type where Descripction= ?";
                              conexion.query(sqlType, [RankMem], function (err, rows, fields) {
                                var Id_Membreys = rows[0].Id;
                                if (rows[0] == undefined) {
                                  res.status(400).json({
                                    message: "Rank of Membreys is Unvalid"
                                  });
                                } else {
                                  var sqlId = "update Company set NameCompany ='".concat(NameCompany, "',PhoneCompany = '").concat(PhoneCompany, "', EmailCompany = '").concat(EmailCompany, "',addres= '").concat(Addres, "',Id_Membreys='").concat(Id_Membreys, "' where Id_Company = '").concat(id, "'");
                                  conexion.query(sqlId, function (err, rows, fields) {
                                    if (err) throw err;
                                    res.status(201).json({
                                      message: "User modify in successful"
                                    });
                                  });
                                }
                              });
                            } else {
                              console.log("Password Incorrect");
                              res.status(401).json({
                                message: "Password Incorrect"
                              });
                            }
                          case 3:
                          case "end":
                            return _context3.stop();
                        }
                      }, _callee3);
                    }));
                    return function (_x15, _x16) {
                      return _ref2.apply(this, arguments);
                    };
                  }());
                });
              } else if (SearchConfirmed == req.body.EmailCompany) {
                conexion.query(sqlPassword, [id], function (err, rows, fields) {
                  if (err) throw err;
                  var BcryptPassword = rows[0].PasswordCompany;
                  bcrypt.compare(PasswordCompany, BcryptPassword, /*#__PURE__*/function () {
                    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(err, hash) {
                      var sqlType;
                      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                        while (1) switch (_context4.prev = _context4.next) {
                          case 0:
                            if (!err) {
                              _context4.next = 2;
                              break;
                            }
                            throw err;
                          case 2:
                            if (hash) {
                              sqlType = "select Id from Type where Descripction= ?";
                              conexion.query(sqlType, [RankMem], function (err, rows, fields) {
                                var Id_Membreys = rows[0].Id;
                                if (rows[0] == undefined) {
                                  res.status(400).json({
                                    message: "Rank of Membreys is Unvalid"
                                  });
                                } else {
                                  var sqlId = "update Company set NameCompany ='".concat(NameCompany, "',PhoneCompany = '").concat(PhoneCompany, "', EmailCompany = '").concat(EmailCompany, "',addres= '").concat(Addres, "',Id_Membreys='").concat(Id_Membreys, "' where Id_Company = '").concat(id, "'");
                                  conexion.query(sqlId, function (err, rows, fields) {
                                    if (err) throw err;
                                    res.status(201).json({
                                      message: "User modify in successful"
                                    });
                                  });
                                }
                              });
                            } else {
                              console.log("Password Incorrect");
                              res.status(401).json({
                                message: "Password Incorrect"
                              });
                            }
                          case 3:
                          case "end":
                            return _context4.stop();
                        }
                      }, _callee4);
                    }));
                    return function (_x17, _x18) {
                      return _ref3.apply(this, arguments);
                    };
                  }());
                });
              } else if (SearchEmail != SearchConfirmed) {
                res.status(400).json({
                  message: "Email Unvalid changed"
                });
              }
            });
          });
          _context5.next = 12;
          break;
        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", res.status(400).json({
            error: _context5.t0
          }));
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 9]]);
  }));
  return _ModifyCompany.apply(this, arguments);
}
;

// Modify Password
function ModifyPassword(_x6, _x7, _x8) {
  return _ModifyPassword.apply(this, arguments);
}
function _ModifyPassword() {
  _ModifyPassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res, next) {
    var id, NewPassword, sqlPassword;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id;
          NewPassword = req.body.NewPassword;
          sqlPassword = "select PasswordCompany from Company where Id_Company=".concat(req.params.id);
          conexion.query(sqlPassword, [id], function (err, rows, fields) {
            if (err) throw err;
            var BcryptPassword = rows[0].PasswordCompany;
            bcrypt.compare(req.body.PasswordCompany, BcryptPassword, /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(err, hash) {
                var PasswordEncrypted, sqlId;
                return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                  while (1) switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return bcrypt.hash(NewPassword, 10);
                    case 2:
                      PasswordEncrypted = _context6.sent;
                      sqlId = "update Company set PasswordCompany = '".concat(PasswordEncrypted, "'where Id_Company = '").concat(id, "'");
                      if (!err) {
                        _context6.next = 6;
                        break;
                      }
                      throw err;
                    case 6:
                      if (hash) {
                        conexion.query(sqlId, function (err, rows, fields) {
                          if (err) throw err;
                          res.status(201).json({
                            message: "Password modify in successful"
                          });
                        });
                      } else {
                        console.log("Password Incorrect");
                        res.status(401).json({
                          message: "Password Incorrect"
                        });
                      }
                    case 7:
                    case "end":
                      return _context6.stop();
                  }
                }, _callee6);
              }));
              return function (_x19, _x20) {
                return _ref4.apply(this, arguments);
              };
            }());
          });
          _context7.next = 10;
          break;
        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          return _context7.abrupt("return", res.status(400).json({
            error: _context7.t0
          }));
        case 10:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return _ModifyPassword.apply(this, arguments);
}
;

// Login
function SignIn(_x9, _x10, _x11) {
  return _SignIn.apply(this, arguments);
}
function _SignIn() {
  _SignIn = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res, next) {
    var EmailCompany, sql, sqlP;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          EmailCompany = req.body.EmailCompany;
          sql = 'select NameCompany, Id_Company from Company where EmailCompany =  ?';
          sqlP = 'select PasswordCompany from Company where EmailCompany =  ?';
          conexion.query(sql, [EmailCompany], function (err, rows, fields) {
            if (err) throw err;
            if (rows.length == 1) {
              console.log("authorized");
              conexion.query(sqlP, [EmailCompany], function (err, rows) {
                var PasswordCompany = rows[0].PasswordCompany;
                bcrypt.compare(req.body.PasswordCompany, PasswordCompany, function (err, hash) {
                  if (err) throw err;
                  if (hash) {
                    var Token = Jwt.sign({
                      EmailCompany: EmailCompany
                    }, process.env.SecretJWT, {
                      expiresIn: 3600
                    });
                    console.log("Sign in successful");
                    res.status(201).json({
                      message: "Sign in successful",
                      Token: Token
                    });
                    next();
                  } else {
                    console.log("Password Incorrect");
                    res.status(401).json({
                      message: "Password Incorrect"
                    });
                  }
                });
              });
            } else {
              res.status(401).json({
                response: "User does not exist"
              });
            }
          });
          _context8.next = 10;
          break;
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          return _context8.abrupt("return", res.status(400).json({
            error: _context8.t0
          }));
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return _SignIn.apply(this, arguments);
}
;
module.exports = {
  Get: Get,
  GetAll: GetAll,
  ModifyPassword: ModifyPassword,
  SignIn: SignIn,
  SignUp: SignUp,
  ModifyCompany: ModifyCompany,
  DeleteCompany: DeleteCompany
};