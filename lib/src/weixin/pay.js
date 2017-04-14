"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pay = require("node-weixin-pay");
var WeiXinPay = (function () {
    function WeiXinPay(config) {
        this.api = pay;
        this.config = config;
    }
    WeiXinPay.prototype.qrString = function (app, merchant, productId) {
        return pay.qrcode(app, merchant, productId);
    };
    WeiXinPay.prototype.preparePublicPay = function (data) {
        data.trade_type = 'JSSDK';
    };
    WeiXinPay.prototype.prepareQRScanPay = function (data) {
        data.trade_type = 'NATIVE';
    };
    WeiXinPay.prototype.preparePayType = function (data, type) {
        if (type === void 0) { type = 'JSSDK'; }
        data.trade_type = type;
    };
    WeiXinPay.prototype.prepareClientInfo = function (data, req) {
        var ip = req.headers['x-forwarded-for'] ||
            (req.connection ? req.connection.remoteAddress : null) || req.ip;
        ip = ip.split(',')[0];
        data.spbill_create_ip = ip;
    };
    WeiXinPay.prototype.prepareOrderInfo = function (data, order) {
        data.body = order.title;
        data.out_trade_no = String(order.no);
        data.total_fee = parseInt(((order.price - 0) * 100).toFixed(0));
    };
    WeiXinPay.prototype.prepareUserInfo = function (data, user) {
        data.openid = user.openid.openid;
    };
    WeiXinPay.prototype.qrPay = function (req, data, type, order, user) {
        if (user === void 0) { user = null; }
        this.prepareClientInfo(data, req);
        this.preparePayType(data, type);
        this.prepareOrderInfo(data, order);
        if (user) {
            this.prepareUserInfo(data, user);
        }
    };
    WeiXinPay.prototype.uniPay = function (config, data) {
        return new Promise(function (resovle, reject) {
            pay.api.order.unified(config, data, function (error, data) {
                if (error) {
                    // console.error(error, data);
                    return reject(error);
                }
                resovle(data);
            });
        });
    };
    WeiXinPay.prototype.onNotify = function (config, req, res, next) {
        return new Promise(function (resolve, reject) {
            pay.callback.notify(config.app, config.merchant, req, res, function (error, result, info) {
                if (error) {
                    return reject(info);
                }
                resolve(result);
            });
        });
    };
    return WeiXinPay;
}());
exports.WeiXinPay = WeiXinPay;
