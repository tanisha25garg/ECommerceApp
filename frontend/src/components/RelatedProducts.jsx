import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useContext(ShopContext)
    const [ relatedProducts, setRelatedProducts ] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            const tempProducts = [...products]
            const filteredProducts = tempProducts.filter(product => product.category === category && product.subCategory === subCategory).slice(0, 5)
            setRelatedProducts(filteredProducts)
        }
    }, [products])

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
            relatedProducts.map((product, index) => (
                <ProductItem key={index} id={product._id} image={product.image} name={product.name} price={product.price} />
            ))
        }
      </div>
    </div>
  )
}

export default RelatedProducts
