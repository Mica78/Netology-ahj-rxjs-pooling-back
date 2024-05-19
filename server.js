const http = require('http');
const Koa = require("koa");
const { koaBody } = require("koa-body");
const Router = require("@koa/router");
const createRandomMessage = require("./message");

const app = new Koa();


app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    return await next();
  }

  const headers = {'Access-Control-Allow-Origin': '*', };

  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({...headers});
    try {
      return await next();
    } catch (e) {
      e.headers = {...e.headers, ...headers};
      throw e;
    }
  }

  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': GET, POST, PUT, DELETE, PATCH,
    });

    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set('Access-Control-Allow-Headers', ctx.request);
    }

    ctx.response.status = 204;
  }
});

app.use(
  koaBody({
    urlencoded:true,
  })
);


const router = new Router();

router.get("/messages/unread", async (ctx) => {

  if (Math.random() > 0.5) {
    ctx.response.status = 404;

    return;
  }

  const message = createRandomMessage(Math.floor(Math.random() * (5 - 1) + 1));
  ctx.response.body = message;
})

app.use(router.routes()).use(router.allowedMethods());

const server = http.createServer(app.callback());

const port = 7000;

server.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Server listen on port" + port)

})
