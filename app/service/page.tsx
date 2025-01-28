"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { BiSort } from 'react-icons/bi';

// Comprehensive TypeScript Interfaces
interface Quantity {
  quantity: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  quantities: Quantity[];
  image?: string;
  images?: string[];
  description: string;
}

interface ProductState {
  currentImageIndex: number;
  selectedQuantity: Quantity;
}

type SortOption = 'name' | 'price-asc' | 'price-desc';
type ViewMode = 'grid' | 'list';

const CATEGORIES = {
  all: {
    id: "all",
    name: "All"
  },
  businessRegistration: {
    id: "registration",
    name: "Business Registration"
  },
  gst: {
    id: "gst",
    name: "GST Services"
  },
  licensePermits: {
    id: "license",
    name: "License & Permits"
  },
  importExport: {
    id: "iec",
    name: "Import Export"
  },
  taxServices: {
    id: "tax",
    name: "Tax Services"
  },
  mcaServices: {
    id: "mca",
    name: "MCA Services"
  },
  ipr: {
    id: "ipr",
    name: "IPR"
  },
  draftingRealEstate: {
    id: "drafting",
    name: "Drafting and Realestate"
  },
  designServices: {
    id: "creatives",
    name: "Designing Services"
  },
  webSolutions: {
    id: "web",
    name: "Web Solutions"
  },
  eCommerceListing: {
    id: "elisting",
    name: "eCommerce listing"
  },
  groceries: {
    id: "grocery",
    name: "Groceries"
  },
  packagingMaterials: {
    id: "packaging",
    name: "Packaging Materials"
  }
} as const;

export default function ProductsPage() {
  // Typed State Management
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productStates, setProductStates] = useState<Record<string, ProductState>>({});

  const PRODUCTS_PER_PAGE = 25;

  // Typed Product Loading
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('/products.json');
        const data: Product[] = await response.json();
        setProductsData(data);
        
        // Initialize product states
        const initialProductStates = data.reduce<Record<string, ProductState>>((acc, product) => {
          acc[product.name] = {
            currentImageIndex: 0,
            selectedQuantity: product.quantities[0]
          };
          return acc;
        }, {});
        setProductStates(initialProductStates);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    }
    loadProducts();
  }, []);

  // Typed Filtering and Sorting
  const filteredProducts = useMemo(() => {
    return productsData.filter(product => 
      (searchTerm === '' || product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === null || product.category.toLowerCase() === selectedCategory.toLowerCase())
    ).sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-asc':
          return a.quantities[0].price - b.quantities[0].price;
        case 'price-desc':
          return b.quantities[0].price - a.quantities[0].price;
      }
    });
  }, [productsData, searchTerm, selectedCategory, sortBy]);

  // Pagination Calculations
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Product State Update Handler
  const updateProductState = (productId: string, updates: Partial<ProductState>) => {
    setProductStates(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        ...updates
      }
    }));
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex min-h-screen bg-white pt-20 pb-20"
    >
      {/* Sidebar */}
      <motion.div 
        variants={itemVariants}
        className="h-full mt-8 w-64 bg-white p-6 border-2 border-black shadow-sm flex flex-col max-md:hidden rounded-md ml-2"
      >
        <h2 className="text-xl mb-6 font-bold flex items-center border-b-2 border-black">
          FILTERS
        </h2>
        
        <div className="space-y-1">
          {Object.entries(CATEGORIES).map(([key, category]) => (
            <div key={key} className={`flex items-center px-2 py-1 rounded-md ${selectedCategory === category.id || (category.id === "all" && selectedCategory === null) ? "bg-black text-white" : ""} transition`}>
              <input 
                type="radio" 
                name="category"
                id={category.id}
                checked={selectedCategory === category.id || (category.id === "all" && selectedCategory === null)}
                onChange={() => setSelectedCategory(
                  selectedCategory === category.id ? null : (category.id === "all" ? null : category.id)
                )}
                className="hidden"
              />
              <label htmlFor={category.id} className={`cursor-pointer w-full`}>{category.name}</label>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <motion.div 
          variants={itemVariants}
          className="flex max-md:flex-col max-md:space-y-2 justify-between items-center mb-6"
        >
          <div className="relative flex-1 w-full mr-4 max-md:mr-0">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-b-2 border-black "
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          </div>
          <div className="w-full items-center hidden max-md:flex">
            <Filter />
            <div className="space-y-2 flex-1 ml-2">
              <select
                onChange={(e) => setSelectedCategory(
                  selectedCategory === e.target.value ? null : (e.target.value === "all" ? null : e.target.value)
                )}
                className="w-full border-b-2 border-black px-2 py-1"
              >
                {Object.entries(CATEGORIES).map(([key, category]) => (
                  <option key={key} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex-1 flex justify-between items-center space-x-4 w-full">
            <div className="flex items-center">
              <span className="mr-2"><BiSort size={28} /></span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="border-b-2 border-black px-2 py-1"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </select>
            </div>

            <div className="flex">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-200' : ''}`}
              >
                <Grid />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-200' : ''}`}
              >
                <List />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className={`
            ${viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' 
              : 'space-y-4'
            }
          `}
        >
          {currentProducts.map((product) => {
            const productState = productStates[product.name] || {
              currentImageIndex: 0,
              selectedQuantity: product.quantities[0]
            };

            const images = product.images || (product.image ? [product.image] : []);

            const handleNextImage = () => {
              updateProductState(product.name, {
                currentImageIndex: (productState.currentImageIndex + 1) % images.length
              });
            };

            const handlePrevImage = () => {
              updateProductState(product.name, {
                currentImageIndex: (productState.currentImageIndex - 1 + images.length) % images.length
              });
            };

            const handleQuantityChange = (qty: Quantity) => {
              updateProductState(product.name, { selectedQuantity: qty });
            };

            const whatsappMessage = encodeURIComponent(
              `Hey! I'm interested in ${product.name} - ${productState.selectedQuantity.quantity} at ₹${productState.selectedQuantity.price}`
            );

            return (
              <motion.div 
                key={product.name}
                variants={itemVariants}
                className={`
                  bg-white border-2 border-black rounded-md shadow-sm overflow-hidden 
                  ${viewMode === 'list' ? 'flex items-center p-4' : 'p-4'}
                `}
              >
                {images.length > 0 && (
                  <div className="relative">
                    <Image
                      src={images[productState.currentImageIndex]} 
                      alt={product.name} 
                      width={viewMode === 'grid' ? 300 : 96}
                      height={viewMode === 'grid' ? 200 : 96}
                      className={`
                        object-cover 
                        ${viewMode === 'grid' ? 'w-full h-48' : 'w-24 h-24 mr-4'}
                      `}
                    />
                    {images.length > 1 && (
                      <>
                        <button 
                          onClick={handlePrevImage} 
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button 
                          onClick={handleNextImage} 
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </div>
                )}
                <div className='flex flex-col justify-between'>
                  <div className="">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                  </div>
                  
                  <div className="mt-2">
                    <select 
                      value={JSON.stringify(productState.selectedQuantity)}
                      onChange={(e) => handleQuantityChange(JSON.parse(e.target.value))}
                      className="border-b-2 border-black px-2 py-1"
                    >
                      {product.quantities.map((qty, idx) => (
                        <option 
                          key={idx} 
                          value={JSON.stringify(qty)}
                        >
                          {qty.quantity} - ₹{qty.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={`mt-2 flex justify-between items-center ${viewMode === 'list' ? "self-start gap-2" : ""}`}>
                    <span className="font-bold text-gray-800">
                      ₹{productState.selectedQuantity.price}
                    </span>
                    <motion.a 
                      href={`https://wa.me/+919790813661?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-black text-white px-3 py-1 rounded-md hover:bg-green-600 flex items-center"
                    >
                      Inquire
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Pagination */}
        <div className={`flex justify-center mt-8 space-x-2 w-full ${totalPages === 1 ? 'hidden' : ''}`}>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`rounded-md ${currentPage === 1 ? 'hidden' : 'text-gray-500'} hover:text-black`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`
                rounded-md hover:text-black
                ${currentPage === page 
                  ? 'text-black' 
                  : 'text-gray-500'}
              `}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`rounded-md ${currentPage === totalPages ? 'hidden' : 'text-gray-500'} hover:text-black`}
          >
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
}