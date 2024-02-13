import { Meta } from 'types';

export namespace IEntity {
  export interface Shop {
    id: string;
    title: string;
    location: string;
    phone: string;
    number: string;
    sellers: Seller[];
    createdAt: string;
  }

  export interface Seller {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
  }
}

export namespace IForm {
  export interface Add extends Pick<IEntity.Shop, 'title' | 'location' | 'phone' | 'number'> {}
  export interface Update extends Pick<IEntity.Shop, 'title' | 'location' | 'phone' | 'number'> {}
  export interface Delete extends Pick<IEntity.Shop, 'id'> {}
}

export namespace SellerIApi {
  export namespace Add {
    export interface Request extends Omit<IEntity.Seller, 'id'> {}
    export interface Response extends IEntity.Seller {}
  }

  export namespace Delete {
    export interface Request {
      shopID: string;
      sellerID:string;
    }
    export interface Response extends IEntity.Seller {}
  }
}

export namespace IApi {
  export namespace List {
    export interface Request extends Omit<Meta, 'total'> {}

    export interface Response {
      items: IEntity.Shop[];
      meta: Meta;
    }
  }

  export namespace Single {
    export interface Request {
      id: string;
    }
    export interface Response extends IEntity.Shop {}
  }

  export namespace Add {
    export interface Request extends IForm.Add {}
    export interface Response extends IEntity.Shop {}
  }

  export namespace Update {
    export interface Request extends IForm.Update {
      id: string;
    }
    export interface Response extends IEntity.Shop {}
  }

  export namespace Delete {
    export interface Request extends IForm.Delete {}
    export interface Response extends IEntity.Shop {}
  }
}
