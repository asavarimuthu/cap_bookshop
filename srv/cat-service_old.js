const cds = require('@sap/cds');

//module.exports = cds.service.impl(async function() {
  module.exports=(srv)=>{

   const {Books} = cds.entities ('BookshopDB');


  // Reduce stock of ordered books
  srv.before ('CREATE', 'order', async (req) => {

    const order = req.data
    if (!order.amount || order.amount <= 0)  return req.error (400, 'Order at least 1 book')
    const tx = cds.transaction(req)

     const bookdata=await tx.run(
      GET (Books)
       .where ({ ID: order.books_ID})
     )
    const affectedRows = await tx.run (
     
      UPDATE (Books)
        .set   ({ stock: {'-=': order.count}})
        .where ({ ID: order.books_ID})
    )
    if (affectedRows === 0)  req.error (409, "Sold out, sorry")
  }) ;



    
}
  //});




