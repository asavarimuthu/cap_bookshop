const cds = require('@sap/cds')

class bookshopService extends cds.ApplicationService {
  /** Registering custom event handlers */

 
// changes made by usha
  init() {
    this.before("READ", "book", (req) => this.getBook(req));
    this.before("CREATE", "order", (req) => this.createOrder(req));

    return super.init();
  }
  getBook(data){
    const bookdata=data;
  }
  async createOrder(req){
    const {Books} = cds.entities ('BookshopDB');
    const order = req.data
    if (!order.amount || order.amount <= 0)  return req.error (400, 'Order at least 1 book')
    const tx = cds.transaction(req)
    const bookdata=await SELECT.from(Books).where({ID: order.books_ID})

     if(bookdata[0].stock<order.count) return req.error(400,'We dont have enough stock')
    const affectedRows = await tx.run (
      
      UPDATE (Books)
        .set   ({ stock: {'-=': order.count}})
        .where ({ ID: order.books_ID})
    )
    if (affectedRows === 0)  req.error (409, "Sold out, sorry")
  }

}



  module.exports = { bookshopService }