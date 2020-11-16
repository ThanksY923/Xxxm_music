const express = require('express');
const axios = require('axios');
var app = express();
module.exports = {
    devServer: {

        //自动打开浏览器
        open: true,
        port: 8888,
        before(app) {
            app.get('/api/getDiscList', function(req, res) {
                const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'; //node端要发送HTTP请求的url
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com', //node端伪造referer和host
                        host: 'c.y.qq.com'
                    },
                    params: req.query //请求的参数
                }).then((response) => {
                    res.json(response.data) //node端http请求成功后拿到的数据吐给前端调用/api/getDiscList接口后返回的res
                }).catch((e) => {
                    console.log(e)
                })

            }),
                app.get('/api/getSongList', function (req, res) {
                    var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
                    axios.get(url, {
                    headers: {
                        referer: 'https://y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query
                    }).then((response) => {
                    var ret = response.data
                    if (typeof ret === 'string') {
                        // var reg = /^\w+\(({[^()]+})\)$/
                        var reg = /{.*}/
                        var matches = ret.match(reg)           
                        if (matches) {
                        ret = JSON.parse(matches[0])
                        }
                    }
                    res.json(ret)
                    }).catch((e) => {
                    console.log(e)
                    })
                })
        }
    }
}