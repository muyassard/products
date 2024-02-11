export namespace IEntity {
  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
  }
}

export namespace IForm {
  export interface Login extends Pick<IEntity.User, 'phone'> {
    password: string;
  }

  export interface Register extends Omit<IEntity.User, 'id'> {
    password: string;
  }
}

export namespace IApi {
  export namespace Login {
    export interface Request extends IForm.Login {}
    export type Response = {
      [x: string]: any;
    };
  }

  export namespace Register {
    export interface Request extends IForm.Register {}
    export type Response = {
      [x: string]: any;
    };
  }

  export namespace Me {
    export interface Request {
      token: string;
    }
    export type Response = {
      [x: string]: any;
    };
  }
}

export interface IContext {
  user: IEntity.User | null;
  logout(): void;
  login(user: IEntity.User): void;
}
