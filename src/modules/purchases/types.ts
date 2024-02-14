import { Meta } from 'types';
import { Types as ShopsTypes } from 'modules/shops';

export namespace IEntity {
  export interface Product {
    _id: string;
    name: string;
    price: number;
    amount: number;
  }
  export interface Payout {
    _id: string;
    amount: number;
    description: string;
    updateReason: string;
    createdAt: string;
  }

  export interface Purchase {
    _id: string;
    total: number;
    debt: number;
    shop: ShopsTypes.IEntity.Shop;
    products: Product[];
    payouts: Payout[];
    createdAt: string;
  }
}

export namespace IForm {
  export interface Add {
    shop: string;
    products: Omit<IEntity.Product, '_id'>[];
  }
}

export namespace IApi {
  export namespace List {
    export interface Request extends Omit<Meta, 'total'> {}

    export interface Response {
      items: IEntity.Purchase[];
      meta: Meta;
    }
  }

  export namespace Single {
    export interface Request {
      _id: string;
    }
    export interface Response extends IEntity.Purchase {}
  }

  export namespace Add {
    export interface Request extends IForm.Add {}
    export interface Response extends IEntity.Purchase {}
  }
}
