import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'	

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [ showFilters, setShowFilters ] = useState(false)
  const [ filteredProducts, setFilteredProducts ] = useState([])
  const [ category, setCategory ] = useState([])
  const [ subCategory, setSubCategory ] = useState([])
  const [ sortType, setSortType ] = useState('relevant')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(category.filter(item => item !== e.target.value))
    } else {
      setCategory([...category, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(subCategory.filter(item => item !== e.target.value))
    } else {
      setSubCategory([...subCategory, e.target.value])
    }
  }

  useEffect(() => {
    let tempProducts = [...products]

    if (showSearch && search) {
      tempProducts = tempProducts.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      tempProducts = tempProducts.filter(item => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      tempProducts = tempProducts.filter(item => subCategory.includes(item.subCategory))
    }

    if (sortType === 'low-high') {
      tempProducts = [...tempProducts].sort((a, b) => a.price - b.price)
    } else if (sortType === 'high-low') {
      tempProducts = [...tempProducts].sort((a, b) => b.price - a.price)
    }

    setFilteredProducts(tempProducts)
  }, [products, category, subCategory, sortType, search, showSearch])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilters(!showFilters)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilters ? 'rotate-90' : '' }`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilters ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory} /> Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilters ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory} /> Topwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filteredProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
