namespace BookshopDB;

using { cuid ,managed} from '@sap/cds/common';

@cds.search :{author}
entity Books {
  key ID:Integer;
  title  : String;
  descr  : String;
  price:Integer;
  stock:Integer;
  author : Association to Authors;
}

entity Authors{
  key ID:Integer;
  name   : String;
  books  : Association to many Books on books.author=$self;
}

entity Orders:managed{
  key ID:Integer;
  books:Association to Books;
  count:Integer;
  amount:Integer;
}
