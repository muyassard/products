export {};

export namespace IEntity {
  export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    amount: number;
  }
}
export namespace IForm {
  export namespace Product {
    export interface Add extends Pick<IEntity.Product, 'description' | 'name' | 'amount'> {}
    export interface Update extends Pick<IEntity.Product, 'description' | 'name'  | 'amount'> {}
  }
}

export namespace IApi {
  export namespace Product {
    export namespace List {
      export interface Response extends Array<IEntity.Product> {}
    }
    export namespace Add {
      export interface Request extends IForm.Product.Add {
      }
      export interface Response extends IEntity.Product {}
    }
  }
}
