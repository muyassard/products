import React from 'react';
import Counter from './counter';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = props => (
  <div className="container mx-auto bg-blue-200">
    <Counter />
  </div>
);

export default Navbar;
