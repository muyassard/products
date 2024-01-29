import { StandardResponse } from '@types';

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
    export interface Response extends StandardResponse<{ token: string }> {}
  }

  export namespace Register {
    export interface Request extends IForm.Register {}
    export interface Response extends StandardResponse<IEntity.User> {}
  }

  export namespace Me {
    export interface Request {
      token: string;
    }
    export interface Response extends StandardResponse<IEntity.User> {}
  }
}

export interface IContext {
  user: IEntity.User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  methods: {
    login(user: IEntity.User): void;
    logout(): void;
  };
}
