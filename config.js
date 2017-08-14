var localhost = {
    name: "localhost",
    localPort: 3000,
    webContext: '/',
    happinessAPIUrl: 'http://localhost:8081',
    isLocalEnv: true,
    aws_ses: {
        accessKeyId: "AKIAJ2OBUCX6LMQRDZLA",
        secretAccessKey: "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",
        host: "email-smtp.us-west-2.amazonaws.com",
        port: 25,
        defaultFrom: "careu@104.com.tw",
        region: "us-west-2"
    },
    document: {
        apiUrl: 'http://api.staging.docapi.104.com.tw/docapi/v0',
        uploadUrl: 'http://ori.staging.docapi.104.com.tw'
    },
    // 本地開發使用 memory store
    redis: {
        host: 'cluster-redis-2-8-24.klj5yq.0001.apne1.cache.amazonaws.com',
        port: 6379
    }
}

var swcareu = {
    name: "swcareu",
    localPort: 3000,
    webContext: '/',
    happinessAPIUrl: 'http://sacareu.104dev.com/happiness/api',
    aws_ses: {
        accessKeyId: "AKIAJ2OBUCX6LMQRDZLA",
        secretAccessKey: "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",
        host: "email-smtp.us-west-2.amazonaws.com",
        port: 25,
        defaultFrom: "careu@104.com.tw",
        region: "us-west-2"
    },
    document: {
        apiUrl: 'http://api.staging.docapi.104.com.tw/docapi/v0',
        uploadUrl: 'http://ori.staging.docapi.104.com.tw'
    },
    redis: {
        host: 'cluster-redis-2-8-24.klj5yq.0001.apne1.cache.amazonaws.com',
        port: 6379
    }
}

/** set this field to switch env */
module.exports = localhost; // localhost, uwcareu, swcareu, careu.
