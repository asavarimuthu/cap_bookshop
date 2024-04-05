using { BookshopDB as bs } from '../db/data-model';

@cds.query.limit.default: 3
@cds.query.limit.max: 4

/*service bookshopService{
    entity book @(restrict:[{grant:'*', to : [ 'RiskManager1' ]}
   ]) as projection on bs.Books;
    entity author @(restrict:[{grant:'*', to : [ 'RiskManager1' ]}
   ]) as projection on bs.Authors;
    entity order @(restrict:[{grant:'*', to : [ 'RiskManager1' ]}
   ]) as projection on bs.Orders;

}  */

service bookshopService  @(path : '/odata/v4'){
    entity book 
  as projection on bs.Books;
  //  entity author 
  //  as projection on bs.Authors;
    entity order
    as projection on bs.Orders;
     entity author1 as projection on bs.Authors{
      *,
            books: redirected to book
    };

   
}


