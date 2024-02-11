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
  export interface Add {}
  export interface Update {}
  export interface Delete {}
}

export namespace IApi {
  export namespace List {
    export type Response = IEntity.Shop[];
  }

  export namespace Single {
    export interface Request {
      shopId: string;
    }
    export interface Response extends IEntity.Shop {}
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
