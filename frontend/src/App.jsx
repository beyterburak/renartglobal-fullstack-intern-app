import Header from './components/layout/Header';
import ProductGrid from './components/product/ProductGrid';
import ProductCard from './components/product/ProductCard';
import Loading from './components/ui/Loading';
import useProducts from './hooks/useProducts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';


function App() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="relative">
        {/* Custom Navigation Arrows - Minimal Design */}
        <button className="swiper-button-prev-custom fixed left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center transition-opacity duration-200 hover:opacity-80">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-800"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <button className="swiper-button-next-custom fixed right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center transition-opacity duration-200 hover:opacity-80">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-800"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>

        <div className="max-w-[1700px] mx-auto px-6 sm:px-8 lg:px-12 py-12">
          <div className="relative">
            <Swiper
            modules={[Navigation, Scrollbar]}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            scrollbar={{
              el: '.swiper-scrollbar-custom',
              draggable: true,
              hide: false,
              dragSize: 'auto',
              snapOnRelease: true,
            }}
            slidesPerView={4}
            slidesPerGroup={1}
            spaceBetween={36}
            speed={600}
            className="product-carousel"
            breakpoints={{
              320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 28,
              },
              1024: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 32,
              },
              1280: {
                slidesPerView: 4,
                slidesPerGroup: 1,
                spaceBetween: 36,
              },
            }}
          >
            {products.map(product => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>

            {/* Custom Horizontal Scrollbar */}
            <div className="swiper-scrollbar-custom mt-6 h-2 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;