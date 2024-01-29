import Counter from 'components/counter';
import Navbar from 'components/navbar';
import React from 'react';

interface UsersProps {
  refresh(): void;
}

const Users: React.FC<UsersProps> = ({ refresh }) => (
  <div className="container mx-auto flex flex-col gap-2">
    <Navbar />
    <Counter />
  </div>
);

export default Users;
