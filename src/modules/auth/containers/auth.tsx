import React from 'react';
import { session } from 'services';
import { IEntity } from '../types';
import { Spin } from 'antd';
import { AuthContext } from '../context';

interface AuthProps {
  children: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  const [loading, setLoading] = React.useState(!!session.get());
  const [user, setUser] = React.useState<IEntity.User | null>(null);

  const logout = () => {
    session.remove();
    setUser(null);
  };

  const login = (user: IEntity.User) => {
    setUser(user);
  };

  React.useEffect(() => {
    if (!loading) return;

    const token = session.get();
    Api.Me({ token }).then(({ data }) => {
      const user = data.data;
      login(user);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="grid  place-items-center">
        <Spin size="large" />
      </div>
    );

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export default Auth;
