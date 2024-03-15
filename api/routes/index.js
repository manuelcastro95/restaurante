
const productosRouter = require('./productos.router')
const pedidosRouter = require('./pedidos.router')
const usersRouter = require('./users.router')
const ventasRouter = require('./ventas.router')

function routerApi (app){
  app.use('/productos',productosRouter)
  app.use('/pedidos',pedidosRouter)
  app.use('/users',usersRouter)
  app.use('/ventas',ventasRouter)
}

module.exports = routerApi;
