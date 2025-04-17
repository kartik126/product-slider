"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import ProductCard from "./ProductCard"
import type { Product } from "../types/product"
import { ChevronLeft, Heart, ShoppingBag, X } from "lucide-react"

interface ProductSwiperProps {
  products: Product[]
  onProductLike?: (product: Product) => void
  onProductSkip?: (product: Product) => void
  onProductSave?: (product: Product) => void
  onFinished?: () => void
}

const ProductSwiper: React.FC<ProductSwiperProps> = ({
  products,
  onProductLike,
  onProductSkip,
  onProductSave,
  onFinished,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasShownDemo, setHasShownDemo] = useState(false)

  const currentProduct = products[currentIndex]
  const canSwipe = currentIndex < products.length

  const handleSwipeLeft = () => {
    if (!canSwipe) return

    onProductSkip?.(currentProduct)
    setCurrentIndex((prevIndex) => prevIndex + 1)
  }

  const handleSwipeRight = () => {
    if (!canSwipe) return

    onProductLike?.(currentProduct)
    setCurrentIndex((prevIndex) => prevIndex + 1)
  }

  const handleSwipeUp = () => {
    if (!canSwipe) return

    onProductSave?.(currentProduct)
    setCurrentIndex((prevIndex) => prevIndex + 1)
  }

  useEffect(() => {
    if (currentIndex >= products.length) {
      onFinished?.()
    }
  }, [currentIndex, products.length, onFinished])

  return (
    <div className="relative min-h-screen w-full bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-[420px] h-[100vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="p-4 flex items-center justify-between bg-white shadow-sm fixed top-0 left-0 right-0 z-50 max-w-[420px] mx-auto">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Discover</h1>
          <div className="w-10" />
        </div>

        <div className=" flex-1 relative flex items-center justify-center overflow-hidden pt-[60px]">
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence>
              {canSwipe &&
                products
                  .slice(currentIndex, currentIndex + 3)
                  .map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSwipeLeft={handleSwipeLeft}
                      onSwipeRight={handleSwipeRight}
                      onSwipeUp={handleSwipeUp}
                      active={index === 0}
                      index={index}
                      hasShownDemo={hasShownDemo}
                      onDemoComplete={() => setHasShownDemo(true)}
                    />
                  ))}
            </AnimatePresence>

            {!canSwipe && (
              <div className="text-center p-8 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4">No more products</h2>
                <p className="text-gray-600 mb-6">You've seen all available products</p>
                <button
                  className="bg-red-500 px-6 py-3 bg-black text-white rounded-full font-medium"
                  onClick={() => setCurrentIndex(0)}
                >
                  Start Over
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductSwiper
