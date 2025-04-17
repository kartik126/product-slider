import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast'

import { Product, sampleProducts } from './data/products';
import './App.css';
import ProductSwiper from './components/product-swiper';

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(sampleProducts)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleProductLike = (product: Product) => {
    console.log("Liked product id:", product.id)
    toast.success(`Liked ${product.name}!`, {
      duration: 2000,
      position: 'bottom-center',
      style: {
        background: '#4CAF50',
        color: '#fff',
      },
    })
  }

  const handleProductSkip = (product: Product) => {
    console.log("Skipped product id:", product.id)
  }

  const handleProductSave = (product: Product) => {
    console.log("Add to cart product id :", product.id)
    toast.success(`Added ${product.name} to cart!`, {
      duration: 2000,
      position: 'bottom-center',
      style: {
        background: '#2196F3',
        color: '#fff',
      },
    })
  }

  const handleFinished = () => {
    console.log("No more products to show")
    toast.error("No more products to show!", {
      duration: 3000,
      position: 'bottom-center',
      style: {
        background: '#f44336',
        color: '#fff',
      },
    })
  }

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster />
      <ProductSwiper
        products={products}
        onProductLike={handleProductLike}
        onProductSkip={handleProductSkip}
        onProductSave={handleProductSave}
        onFinished={handleFinished}
      />
    </div>
  )
}

export default App;
