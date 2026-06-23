import { getUserSession } from '@/lib/core/session';
import React from 'react';
import ProductsPage from './ProductsPage';

const page = async() => {
    const user = await getUserSession();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/seller/${user?.id}`,
  );
  const data = await res.json();
  const products = data.data;
  return (
    <div>
      <ProductsPage products={products} user={user}/>
    </div>
  );
};

export default page;