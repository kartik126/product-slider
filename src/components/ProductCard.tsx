"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, useMotionValue, useTransform, AnimatePresence, animate } from "framer-motion"
import { Heart, X, ShoppingBag, Star } from "lucide-react"
import { Product } from "../types/product"

interface ProductCardProps {
  product: Product
  onSwipeLeft: () => void
  onSwipeRight: () => void
  onSwipeUp: () => void
  active: boolean
  index: number
  hasShownDemo: boolean
  onDemoComplete: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSwipeLeft, onSwipeRight, onSwipeUp, active, index, hasShownDemo, onDemoComplete }) => {
  const [exitX, setExitX] = useState<number>(0)
  const [exitY, setExitY] = useState<number>(0)
  const [currentDemo, setCurrentDemo] = useState<'none' | 'right' | 'left' | 'up'>('none')

  // Motion values for tracking drag
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Transform values for visual feedback
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15])
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 0.5, 1, 0.5, 0])

  // Visual indicators opacity based on drag direction
  const likeOpacity = useTransform(x, [0, 125], [0, 1])
  const nopeOpacity = useTransform(x, [-125, 0], [1, 0])
  const saveOpacity = useTransform(y, [-125, 0], [1, 0])

  // Demo animation sequence
  useEffect(() => {
    if (active && !hasShownDemo) {
      const sequence = async () => {
        // Initial delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Demo right swipe (like)
        setCurrentDemo('right')
        await animate(x, 150, { duration: 1, ease: "easeInOut" })
        await new Promise(resolve => setTimeout(resolve, 800))
        await animate(x, 0, { duration: 0.5 })
        await new Promise(resolve => setTimeout(resolve, 500))

        // Demo left swipe (nope)
        setCurrentDemo('left')
        await animate(x, -150, { duration: 1, ease: "easeInOut" })
        await new Promise(resolve => setTimeout(resolve, 800))
        await animate(x, 0, { duration: 0.5 })
        await new Promise(resolve => setTimeout(resolve, 500))

        // Demo up swipe (save)
        setCurrentDemo('up')
        await animate(y, -150, { duration: 1, ease: "easeInOut" })
        await new Promise(resolve => setTimeout(resolve, 800))
        await animate(y, 0, { duration: 0.5 })
        
        // Reset and finish demo
        setCurrentDemo('none')
        await new Promise(resolve => setTimeout(resolve, 500))
        onDemoComplete()
      }

      sequence()
    }
  }, [active, hasShownDemo, x, y, onDemoComplete])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number }; velocity: { x: number; y: number } },
  ) => {
    const threshold = 100
    const velocityThreshold = 500

    // Check if the swipe was fast enough (velocity) or far enough (offset)
    if (Math.abs(info.velocity.x) > velocityThreshold || Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        setExitX(1000) // Swipe right
        onSwipeRight()
      } else {
        setExitX(-1000) // Swipe left
        onSwipeLeft()
      }
    } else if (Math.abs(info.velocity.y) > velocityThreshold || Math.abs(info.offset.y) > threshold) {
      if (info.offset.y < 0) {
        setExitY(-1000) // Swipe up
        onSwipeUp()
      }
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="absolute sm:px-1 w-[calc(100vw-16px)] max-w-[420px] h-[calc(100vh-140px)] bg-white rounded-2xl overflow-hidden"
        style={{
          x,
          y,
          rotate,
          opacity,
          zIndex: active ? 10 : 10 - index,
          top: active ? 60 : 60 + index * -10,
          scale: active ? 1 : 1 - index * 0.05,
          willChange: 'transform',
          WebkitBackfaceVisibility: 'hidden',
          WebkitTransform: 'translate3d(0,0,0)',
          transform: 'translate3d(0,0,0)',
          transformStyle: 'flat'
        }}
        drag={active}
        dragDirectionLock
        dragMomentum={false}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.15}
        dragTransition={{ 
          bounceStiffness: 1000,
          bounceDamping: 100,
          timeConstant: 200
        }}
        onDragEnd={handleDragEnd}
        animate={{ 
          x: exitX, 
          y: exitY,
          opacity: exitX !== 0 || exitY !== 0 ? 0 : 1
        }}
        transition={{ 
          type: "spring",
          duration: 0.2,
          bounce: 0.1,
          damping: 20,
          stiffness: 300
        }}
        whileDrag={{ scale: 1 }}
      >
        {/* Like indicator */}
        <motion.div
          className="absolute top-1/2 right-8 -translate-y-1/2 bg-green-500/90 text-white p-4 rounded-full z-20 backdrop-blur-sm"
          style={{ 
            opacity: likeOpacity,
            willChange: 'opacity',
            WebkitBackfaceVisibility: 'hidden'
          }}
          transition={{ type: "tween", duration: 0.2 }}
        >
          <Heart className="w-8 h-8" fill="white" />
        </motion.div>

        {/* Nope indicator */}
        <motion.div
          className="absolute top-1/2 left-8 -translate-y-1/2 bg-red-500/90 text-white p-4 rounded-full z-20 backdrop-blur-sm"
          style={{ opacity: nopeOpacity }}
        >
          <X className="w-8 h-8" />
        </motion.div>

        {/* Save indicator */}
        <motion.div
          className="absolute top-8 left-1/2 -translate-x-1/2 bg-blue-500/90 text-white p-4 rounded-full z-20 backdrop-blur-sm"
          style={{ opacity: saveOpacity }}
        >
          <ShoppingBag className="w-8 h-8" />
        </motion.div>

        {/* Initial tutorial overlay */}
        {active && !hasShownDemo && (
          <motion.div 
            className="absolute inset-0 bg-black/50 z-30 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-white text-center px-8">
              <p className="text-xl font-semibold mb-6">Welcome! Let's learn how to use the app</p>
              <div className="space-y-4">
                <motion.p 
                  className={`flex items-center justify-center gap-2 text-lg p-2 rounded-lg ${currentDemo === 'right' ? 'bg-green-500/30' : ''}`}
                  animate={{ scale: currentDemo === 'right' ? 1.1 : 1 }}
                >
                  <Heart className="w-6 h-6" fill={currentDemo === 'right' ? "white" : "none"} stroke="white" /> 
                  Swipe right to like
                </motion.p>
                <motion.p 
                  className={`flex items-center justify-center gap-2 text-lg p-2 rounded-lg ${currentDemo === 'left' ? 'bg-red-500/30' : ''}`}
                  animate={{ scale: currentDemo === 'left' ? 1.1 : 1 }}
                >
                  <X className="w-6 h-6" /> 
                  Swipe left to skip
                </motion.p>
                <motion.p 
                  className={`flex items-center justify-center gap-2 text-lg p-2 rounded-lg ${currentDemo === 'up' ? 'bg-blue-500/30' : ''}`}
                  animate={{ scale: currentDemo === 'up' ? 1.1 : 1 }}
                >
                  <ShoppingBag className="w-6 h-6" fill={currentDemo === 'up' ? "white" : "none"} stroke="white" /> 
                  Swipe up to save
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="relative h-[55vh] rounded-lg overflow-hidden">
          <motion.div 
            className="w-full h-full"
            style={{ 
              transform: 'translate3d(0,0,0)',
              WebkitTransform: 'translate3d(0,0,0)',
              willChange: 'transform'
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300
            }}
          >
            <img 
              src={product.imageUrl || "/placeholder.svg"} 
              alt={product.name} 
              className="rounded-lg w-full h-full object-cover"
              loading="eager"
              decoding="async"
              style={{
                willChange: 'transform',
                WebkitBackfaceVisibility: 'hidden',
                WebkitTransform: 'translate3d(0,0,0)',
                transform: 'translate3d(0,0,0)',
                imageRendering: 'auto',
                backfaceVisibility: 'hidden',
                pointerEvents: 'none',
                touchAction: 'none'
              }}
            />
          </motion.div>

          {product.discountPercentage > 0 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-medium"
                 style={{ transform: 'translateZ(0)' }}>
              {product.discountPercentage}% OFF
            </div>
          )}

          <div className="rounded-lg absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-24 pointer-events-none"
               style={{ transform: 'translateZ(0)' }} />
        </div>

        <div className="py-3 px-1">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1 items-start">
              <h3 className="text-xl text-left font-bold text-gray-800 capitalize ">{product.name}</h3>
              <p className="text-sm font-medium text-red-500 capitalize">{product.brand}</p>
            </div>

            <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
          </div>

          <p className="mt-2 text-left text-sm text-gray-400 line-clamp-2">{product.description}</p>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center">
          <div className="text-xs text-center text-gray-500">Swipe left to skip, right to like, up to save</div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProductCard
