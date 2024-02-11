import { StandardResponse } from '@types';

export namespace IEntity {
  export interface Shop {
    id: string;
    title: string;
    location: string;
    phone: string;
    number: string;
    sellers: Seller[];
    createdAt: string; //
  }

  export interface Seller {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
  }
}

export namespace IForm {
  export interface Add {
    title: string;
    location: string;
    phone: string;
    number: string;
  }
  export interface Delete {
    
  }
  export interface Update extends Partial<Omit<IEntity.Shop, 'createdAt'>> {}
}

export namespace IApi {
  export namespace List {
    export interface Request {
      token: string;
    }
    export interface Response extends StandardResponse<IEntity.Shop[]> {}
  }

  export namespace Single {
    export interface Request {
      token: string;
      shopId: string;
    }
    export interface Response extends StandardResponse<IEntity.Shop> {}
  }

  export namespace Add {
    export interface Request extends IForm.Add {
      token: string;
    }
    export interface Response {}
  }

  export namespace Update {
    export interface Request extends IForm.Update {
      token: string;
    }
    export interface Response {}
  }

  export namespace Delete {
    export interface Request extends IForm.Delete {
      token: string;
    }
    export interface Response {}
  }
}
