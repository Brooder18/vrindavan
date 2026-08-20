"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type ProductType = "powder" | "beans";

type Product = {
  id: string;
  name: string;
  type: ProductType;
  description: string;
  image: string;
  coffee?: number;
  chicory?: number;
  arabica?: number;
  robusta?: number;
  pricePerKg: number;
};

type CartItem = {
  id: string;
  name: string;
  type: ProductType;
  weight: number;
  price: number;
  quantity: number;
  image: string;
  blend: string;
};

const WEIGHTS = [
  { grams: 250, label: "250 g" },
  { grams: 500, label: "500 g" },
  { grams: 1000, label: "1 kg" },
  { grams: 2000, label: "2 kg" },
];

const powderProducts: Product[] = [
  {
    id: "powder-60-40",
    name: "Classic South Indian",
    type: "powder",
    description: "A balanced traditional filter coffee blend with a smooth chicory finish.",
    image: "/images/product image.png",
    coffee: 60,
    chicory: 40,
    pricePerKg: 690,
  },
  {
    id: "powder-70-30",
    name: "Traditional Strong",
    type: "powder",
    description: "A richer coffee-forward blend with just the right amount of chicory.",
    image: "/images/product image.png",
    coffee: 70,
    chicory: 30,
    pricePerKg: 755,
  },
  {
    id: "powder-80-20",
    name: "Rich & Smooth",
    type: "powder",
    description: "More coffee, less chicory for a fuller aroma and smoother cup.",
    image: "/images/product image.png",
    coffee: 80,
    chicory: 20,
    pricePerKg: 820,
  },
  {
    id: "powder-100",
    name: "Pure Coffee",
    type: "powder",
    description: "100% pure coffee with no chicory. Bold, aromatic and naturally rich.",
    image: "/images/product image.png",
    coffee: 100,
    chicory: 0,
    pricePerKg: 950,
  },
];

const beanProducts: Product[] = [
  {
    id: "beans-70-30",
    name: "Classic Espresso Blend",
    type: "beans",
    description: "A balanced Arabica and Robusta blend with body, aroma and crema.",
    image: "/images/beans image.png",
    arabica: 70,
    robusta: 30,
    pricePerKg: 1560,
  },
  {
    id: "beans-80-20",
    name: "Premium Smooth Blend",
    type: "beans",
    description: "A smooth, aromatic blend with extra Arabica character.",
    image: "/images/beans image.png",
    arabica: 80,
    robusta: 20,
    pricePerKg: 1640,
  },
  {
    id: "beans-arabica",
    name: "100% Arabica",
    type: "beans",
    description: "Premium 100% Arabica beans with a naturally aromatic and refined cup.",
    image: "/images/beans image.png",
    arabica: 100,
    robusta: 0,
    pricePerKg: 1800,
  },
  {
    id: "beans-robusta",
    name: "100% Robusta",
    type: "beans",
    description: "Bold and powerful Robusta beans with excellent body and crema.",
    image: "/images/beans image.png",
    arabica: 0,
    robusta: 100,
    pricePerKg: 1000,
  },
];

function formatPrice(price: number) {
  return `₹${price.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

function getWeightPrice(pricePerKg: number, grams: number) {
  return (pricePerKg * grams) / 1000;
}

function getBlendText(product: Product) {
  if (product.type === "powder") {
    if (product.coffee === 100) {
      return "100% Pure Coffee";
    }

    return `${product.coffee}% Coffee + ${product.chicory}% Chicory`;
  }

  if (product.arabica === 100) {
    return "100% Arabica";
  }

  if (product.robusta === 100) {
    return "100% Robusta";
  }

  return `${product.arabica}% Arabica + ${product.robusta}% Robusta`;
}

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = 
  useState<"all" | ProductType>( "all");

  const [selectedWeights, setSelectedWeights] = useState<
    Record<string, number>
  >({});

  const [cart, setCart] = useState<CartItem[]>([]);

  // Custom powder blend
  const [customPowderCoffee, setCustomPowderCoffee] = useState(70);

  // Custom bean blend
  const [customArabica, setCustomArabica] = useState(70);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("vrindavan-cart");

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch {
      console.log("Could not load saved cart.");
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("vrindavan-cart", JSON.stringify(cart));
    } catch {
      console.log("Could not save cart.");
    }
  }, [cart]);

  function getSelectedWeight(productId: string) {
    return selectedWeights[productId] || 500;
  }

  function selectWeight(productId: string, grams: number) {
    setSelectedWeights((previous) => ({
      ...previous,
      [productId]: grams,
    }));
  }

  function addToCart(
    product: Product,
    weight: number,
    customBlend?: {
      label: string;
      pricePerKg: number;
      idSuffix: string;
    }
  ) {
    const pricePerKg = customBlend?.pricePerKg ?? product.pricePerKg;
    const price = getWeightPrice(pricePerKg, weight);

    const itemId = customBlend
      ? `${product.id}-${customBlend.idSuffix}-${weight}`
      : `${product.id}-${weight}`;

    const blend = customBlend?.label ?? getBlendText(product);

    setCart((previous) => {
      const existing = previous.find((item) => item.id === itemId);

      if (existing) {
        return previous.map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...previous,
        {
          id: itemId,
          name: customBlend
            ? `${product.name} - Custom`
            : product.name,
          type: product.type,
          weight,
          price,
          quantity: 1,
          image: product.image,
          blend,
        },
      ];
    });
  }

  function calculateCustomPowderPrice() {
    const coffee = customPowderCoffee;
    const chicory = 100 - coffee;

    // Coffee ₹950/kg, Chicory ₹300/kg
    return (coffee / 100) * 950 + (chicory / 100) * 300;
  }

  function calculateCustomBeanPrice() {
    const arabica = customArabica;
    const robusta = 100 - arabica;

    // Arabica ₹1800/kg, Robusta ₹1000/kg
    return (arabica / 100) * 1800 + (robusta / 100) * 1000;
  }

  const visiblePowders =
    activeCategory === "beans" ? [] : powderProducts;

  const visibleBeans =
    activeCategory === "powder" ? [] : beanProducts;

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <main className="min-h-screen bg-[#f7f1e7] text-[#2d160d]">
      
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#5b2d1b]/20 bg-[#2d160d]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link
  href="/"
  className="flex items-center gap-3 text-xl font-bold tracking-wide text-[#f6c453]"
>
  <Image
    src="/images/logo.pnj.jpg"
    alt="Vrindavan Coffee House"
    width={48}
    height={48}
    className="h-12 w-12 rounded-full object-cover"
    priority
  />

  <span>Vrindavan Coffee House</span>
</Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-white transition hover:text-[#f6c453]"
            >
              Home
            </Link>

            <Link
              href="/shop"
              className="text-sm font-semibold text-[#f6c453]"
            >
              Shop
            </Link>

            <Link
              href="/cart"
              className="rounded-full bg-[#f6c453] px-5 py-2 text-sm font-bold text-[#2d160d] transition hover:bg-[#eab63e]"
            >
              Cart {cartCount > 0 && `(${cartCount})`}
            </Link>
          </nav>

          <Link
            href="/cart"
            className="rounded-full bg-[#f6c453] px-4 py-2 text-sm font-bold text-[#2d160d] md:hidden"
          >
            Cart {cartCount > 0 && `(${cartCount})`}
          </Link>
        </div>
      </header>

   {/* Hero */}
<section className="relative overflow-hidden bg-[#3a1d10]">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(246,196,83,0.20),transparent_40%)]" />

  <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
    
    {/* Hero Text */}
    <div className="text-center md:text-left">
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#f6c453]">
        Vrindavan Coffee House
      </p>

      <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
        Choose Your Perfect Coffee
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#e5d3c4] md:mx-0 md:text-lg">
        From traditional South Indian filter coffee to freshly roasted
        beans, choose your favourite blend and make every cup special.
      </p>
    </div>

    {/* Hero Image */}
    <div className="relative mx-auto w-full max-w-xl">
      <div className="overflow-hidden rounded-3xl border border-[#f6c453]/30 shadow-2xl">
        <Image
          src="/images/hero.png"
          alt="Vrindavan Coffee House coffee"
          width={900}
          height={700}
          className="h-[320px] w-full object-cover md:h-[420px]"
          priority
        />
      </div>
    </div>

  </div>
</section>

     
     {/* Category buttons */}
<section
  className="relative z-[9999] mx-auto max-w-7xl px-5 pt-10"
  style={{
    pointerEvents: "auto",
    touchAction: "manipulation",
  }}
>
  <div
    className="relative z-[9999] flex flex-wrap justify-center gap-3"
    style={{
      pointerEvents: "auto",
      touchAction: "manipulation",
    }}
  >
    <button
      type="button"
      onPointerUp={() => setActiveCategory("all")}
      className={`relative z-[9999] rounded-full px-6 py-3 text-sm font-bold ${
        activeCategory === "all"
          ? "bg-[#5b2d1b] text-white"
          : "border border-[#5b2d1b]/30 bg-white text-[#5b2d1b]"
      }`}
      style={{
        pointerEvents: "auto",
        touchAction: "manipulation",
      }}
    >
      All Coffee
    </button>

    <button
      type="button"
      onPointerUp={() => setActiveCategory("powder")}
      className={`relative z-[9999] rounded-full px-6 py-3 text-sm font-bold ${
        activeCategory === "powder"
          ? "bg-[#5b2d1b] text-white"
          : "border border-[#5b2d1b]/30 bg-white text-[#5b2d1b]"
      }`}
      style={{
        pointerEvents: "auto",
        touchAction: "manipulation",
      }}
    >
      Filter Coffee Powder
    </button>

    <button
      type="button"
      onPointerUp={() => setActiveCategory("beans")}
      className={`relative z-[9999] rounded-full px-6 py-3 text-sm font-bold ${
        activeCategory === "beans"
          ? "bg-[#5b2d1b] text-white"
          : "border border-[#5b2d1b]/30 bg-white text-[#5b2d1b]"
      }`}
      style={{
        pointerEvents: "auto",
        touchAction: "manipulation",
      }}
    >
      Coffee Beans
    </button>
  </div>
</section>
      {/* FILTER COFFEE POWDER */}
      {visiblePowders.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-14">
          <div className="mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a46a12]">
              Traditional South Indian Coffee
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
              Filter Coffee Powder
            </h2>

            <p className="mt-3 max-w-2xl text-[#795548]">
              Choose your preferred coffee-to-chicory ratio. Every blend is
              carefully crafted for a rich, aromatic filter coffee experience.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
            {visiblePowders.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selectedWeight={getSelectedWeight(product.id)}
                onSelectWeight={selectWeight}
                onAddToCart={addToCart}
              />
            ))}
          </div>

          {/* Custom powder */}
          <CustomBlendCard
            type="powder"
            coffeePercentage={customPowderCoffee}
            onPercentageChange={setCustomPowderCoffee}
            pricePerKg={calculateCustomPowderPrice()}
            onAdd={(weight) =>
              addToCart(
                {
                  id: "custom-powder",
                  name: "Create Your Own Filter Coffee",
                  type: "powder",
                  description: "Your coffee. Your ratio. Your perfect cup.",
                  image: "/images/powder.pnj.jpg",
                  pricePerKg: calculateCustomPowderPrice(),
                },
                weight,
                {
                  label: `${customPowderCoffee}% Coffee + ${
                    100 - customPowderCoffee
                  }% Chicory`,
                  pricePerKg: calculateCustomPowderPrice(),
                  idSuffix: `${customPowderCoffee}-${100 - customPowderCoffee}`,
                }
              )
            }
          />
        </section>
      )}

      {/* COFFEE BEANS */}
      {visibleBeans.length > 0 && (
        <section className="border-t border-[#5b2d1b]/10 bg-[#eee3d4]">
          <div className="mx-auto max-w-7xl px-5 py-14">
            <div className="mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a46a12]">
                Freshly Roasted
              </p>

              <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
                Coffee Beans
              </h2>

              <p className="mt-3 max-w-2xl text-[#795548]">
                Choose your Arabica and Robusta combination for espresso,
                cappuccino, filter brewing or your own preferred style.
              </p>
            </div>

            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
              {visibleBeans.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  selectedWeight={getSelectedWeight(product.id)}
                  onSelectWeight={selectWeight}
                  onAddToCart={addToCart}
                />
              ))}
            </div>

            {/* Custom beans */}
            <CustomBlendCard
              type="beans"
              coffeePercentage={customArabica}
              onPercentageChange={setCustomArabica}
              pricePerKg={calculateCustomBeanPrice()}
              onAdd={(weight) =>
                addToCart(
                  {
                    id: "custom-beans",
                    name: "Create Your Own Coffee Beans",
                    type: "beans",
                    description: "Build your own Arabica and Robusta blend.",
                    image: "/images/beans.pnj.jpg",
                    pricePerKg: calculateCustomBeanPrice(),
                  },
                  weight,
                  {
                    label: `${customArabica}% Arabica + ${
                      100 - customArabica
                    }% Robusta`,
                    pricePerKg: calculateCustomBeanPrice(),
                    idSuffix: `${customArabica}-${100 - customArabica}`,
                  }
                )
              }
            />
          </div>
        </section>
      )}

      {/* Why choose us */}
      <section className="bg-[#2d160d] px-5 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#f6c453]">
              Why Vrindavan
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
              Coffee Crafted With Tradition
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7 text-center">
              <div className="text-4xl">☕</div>
              <h3 className="mt-4 text-xl font-bold">Authentic Blends</h3>
              <p className="mt-3 text-sm leading-6 text-[#d9c4b4]">
                Carefully selected coffee and chicory ratios inspired by
                traditional South Indian filter coffee.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-7 text-center">
              <div className="text-4xl">🌱</div>
              <h3 className="mt-4 text-xl font-bold">Quality Beans</h3>
              <p className="mt-3 text-sm leading-6 text-[#d9c4b4]">
                Carefully chosen Arabica and Robusta beans for balanced flavour
                and aroma.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-7 text-center">
              <div className="text-4xl">❤️</div>
              <h3 className="mt-4 text-xl font-bold">Made For Your Cup</h3>
              <p className="mt-3 text-sm leading-6 text-[#d9c4b4]">
                Choose your blend and quantity so you can enjoy coffee exactly
                the way you like it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1f1009] px-5 py-12 text-[#d9c4b4]">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Vrindavan Coffee House
            </h3>

            <p className="mt-2 text-sm text-[#f6c453]">
              Crafted with tradition.
            </p>

            <p className="mt-5 max-w-sm text-sm leading-6">
              Bringing the warmth of Indian coffee traditions to your cup, one
              carefully crafted blend at a time.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#f6c453]">Explore</h3>

            <div className="mt-5 flex flex-col gap-3 text-sm">
              <Link href="/" className="hover:text-white">
                Home
              </Link>

              <Link href="/shop" className="hover:text-white">
                Shop Coffee
              </Link>

              <Link href="/cart" className="hover:text-white">
                Cart
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#f6c453]">
              Connect With Us
            </h3>

            <div className="mt-5 flex flex-col gap-4 text-sm">
              <a
                href="https://wa.me/918247067453"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                💬 WhatsApp: 8247067453
              </a>

              <a
                href="mailto:vrindavancoffeehouse@gmail.com"
                className="break-all hover:text-white"
              >
                ✉️ vrindavancoffeehouse@gmail.com
              </a>

              <a
                href="https://instagram.com/vrindavancoffeehouse"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                ◎ @vrindavancoffeehouse
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm">
          <div className="flex flex-col justify-between gap-3 md:flex-row">
            <p>© 2026 Vrindavan Coffee House. All rights reserved.</p>
            <p>
              Crafted with <span className="text-red-500">♥</span> in India
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Checkout Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2">
          <Link
            href="/checkout"
            className="flex items-center justify-between rounded-2xl bg-[#f6c453] px-5 py-4 font-bold text-[#2d160d] shadow-2xl transition hover:bg-[#e7b43b] active:scale-[0.98]"
          >
            <span>
              Checkout ({cartCount}{" "}
              {cartCount === 1 ? "item" : "items"})
            </span>

            <span className="rounded-lg bg-[#2d160d] px-4 py-2 text-sm text-white">
              Checkout →
            </span>
          </Link>
        </div>
      )}

    </main>
  );
}

/* -------------------------------------------------------
   PRODUCT CARD
------------------------------------------------------- */

function ProductCard({
  product,
  selectedWeight,
  onSelectWeight,
  onAddToCart,
}: {
  product: Product;
  selectedWeight: number;
  onSelectWeight: (productId: string, grams: number) => void;
  onAddToCart: (
    product: Product,
    weight: number,
    customBlend?: {
      label: string;
      pricePerKg: number;
      idSuffix: string;
    }
  ) => void;
}) {
  const currentPrice = getWeightPrice(
    product.pricePerKg,
    selectedWeight
  );

  return (
    <article className="overflow-hidden rounded-2xl border border-[#5b2d1b]/10 bg-white shadow">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#eee3d4]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-4 top-4 rounded-full bg-[#2d160d]/90 px-3 py-1 text-xs font-bold text-[#f6c453]">
          {product.type === "powder" ? "FILTER COFFEE" : "COFFEE BEANS"}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-2xl font-bold text-[#3a1d10]">
          {product.name}
        </h3>

        <p className="mt-2 text-sm font-semibold text-[#a46a12]">
          {getBlendText(product)}
        </p>

        <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#795548]">
          {product.description}
        </p>

        {/* Price */}
        <div className="mt-4">
          <span className="text-2xl font-bold text-[#3a1d10]">
            {formatPrice(currentPrice)}
          </span>

          <span className="ml-2 text-xs text-[#795548]">
            / {selectedWeight === 1000 ? "1 kg" : `${selectedWeight} g`}
          </span>
        </div>

        {/* Weight selector */}
        <div className="mt-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#795548]">
            Select Quantity
          </p>

          <div className="grid grid-cols-4 gap-2">
            {WEIGHTS.map((weight) => {
              const selected = selectedWeight === weight.grams;

              return (
                <button
  key={weight.grams}
  type="button"
  onClick={(e) => {
    e.preventDefault();
    onSelectWeight(product.id, weight.grams);
  }}

  className={`relative z-30 rounded-lg border px-2 py-2 text-xs font-bold transition ${
    selected
      ? "border-[#5b2d1b] bg-[#5b2d1b] text-white"
      : "border-[#5b2d1b]/20 bg-[#f7f1e7] text-[#5b2d1b] hover:border-[#5b2d1b]"
  }`}
  style={{
    pointerEvents: "auto",
    touchAction: "manipulation",
  }}
>
  {weight.label}
</button>
              );
            })}
          </div>
        </div>

        {/* Add to cart */}
        <button
  type="button"
  onPointerDown={(e) => {
    e.preventDefault();
    onAddToCart(product, selectedWeight);
  }}
  onClick={() => {
    onAddToCart(product, selectedWeight);
  }}
  className="relative z-30 mt-5 w-full rounded-xl bg-[#f6c453] px-5 py-3 font-bold text-[#2d160d] transition hover:bg-[#e7b43b] active:scale-[0.98]"
  style={{
    pointerEvents: "auto",
    touchAction: "manipulation",
  }}
>
  Add to Cart
</button>
      </div>
    </article>
  );
}

/* -------------------------------------------------------
   CUSTOM BLEND CARD
------------------------------------------------------- */
function CustomBlendCard({

  type,
  coffeePercentage,
  onPercentageChange,
  pricePerKg,
  onAdd,
}: {
  type: ProductType;
  coffeePercentage: number;
  onPercentageChange: (value: number) => void;
  pricePerKg: number;
  onAdd: (weight: number) => void;
}) {
  const [weight, setWeight] = useState(500);

  const secondPercentage = 100 - coffeePercentage;

  const firstName =
    type === "powder" ? "Coffee" : "Arabica";

  const secondName =
    type === "powder" ? "Chicory" : "Robusta";

  const price = getWeightPrice(pricePerKg, weight);

  return (
    <div className="mt-10 overflow-hidden rounded-3xl border-2 border-dashed border-[#a46a12]/50 bg-[#fffaf2]">
      <div className="grid md:grid-cols-[0.8fr_1.2fr]">
        {/* Image */}
        <div className="relative min-h-[300px] bg-[#eee3d4]">
          <Image
            src={
              type === "powder"
                ? "/images/powder.pnj.jpg"
                : "/images/beans.pnj.jpg"
            }
            alt="Create your own blend"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-5 left-5">
            <span className="rounded-full bg-[#f6c453] px-4 py-2 text-sm font-bold text-[#2d160d]">
              CUSTOM BLEND
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="p-7 md:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a46a12]">
            Make It Yours
          </p>

          <h3 className="mt-2 font-serif text-3xl font-bold text-[#3a1d10]">
            Create Your Own Blend
          </h3>

          <p className="mt-3 text-sm leading-6 text-[#795548]">
            Choose the ratio that suits your taste. Your blend price is
            automatically calculated from the ingredient rates.
          </p>

          {/* Blend display */}
          <div className="mt-7 rounded-2xl bg-[#f0e3d3] p-5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#3a1d10]">
                {firstName}
              </span>

              <span className="text-2xl font-bold text-[#a46a12]">
                {coffeePercentage}%
              </span>
            </div>

            <div className="mt-4 h-4 overflow-hidden rounded-full bg-[#d7c5b2]">
              <div
                className="h-full rounded-full bg-[#5b2d1b] transition-all duration-300"
                style={{ width: `${coffeePercentage}%` }}
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="font-bold text-[#3a1d10]">
                {secondName}
              </span>

              <span className="text-2xl font-bold text-[#a46a12]">
                {secondPercentage}%
              </span>
            </div>
          </div>
{/* Custom Ratio */}
<div className="mt-6">
  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#795548]">
    Choose Your Ratio
  </p>

  <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
    <div>
      <label className="mb-2 block text-sm font-bold text-[#3a1d10]">
        {firstName} %
      </label>

      <input
        type="number"
        min="0"
        max="100"
        value={coffeePercentage}
        onChange={(e) => {
          const value = Number(e.target.value);

          if (Number.isNaN(value)) return;

          const limitedValue = Math.min(100, Math.max(0, value));

          onPercentageChange(limitedValue);
        }}
        className="w-full rounded-xl border border-[#5b2d1b]/20 bg-white px-4 py-3 text-lg font-bold text-[#3a1d10] outline-none transition focus:border-[#5b2d1b] focus:ring-2 focus:ring-[#f6c453]/40"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm font-bold text-[#3a1d10]">
        {secondName} %
      </label>

      <input
        type="number"
        min="0"
        max="100"
        value={secondPercentage}
        onChange={(e) => {
          const value = Number(e.target.value);

          if (Number.isNaN(value)) return;

          const limitedSecond = Math.min(100, Math.max(0, value));

          onPercentageChange(100 - limitedSecond);
        }}
        className="w-full rounded-xl border border-[#5b2d1b]/20 bg-white px-4 py-3 text-lg font-bold text-[#3a1d10] outline-none transition focus:border-[#5b2d1b] focus:ring-2 focus:ring-[#f6c453]/40"
      />
    </div>
  </div>

  <p className="mt-3 text-xs text-[#795548]">
    Enter any ratio you like. The two percentages will always total 100%.
  </p>

  <div className="mt-4 flex flex-wrap gap-2">
    {[50, 60, 70, 80, 90, 100].map((percentage) => (
      <button
        key={percentage}
        type="button"
        onClick={() => onPercentageChange(percentage)}
        className={`rounded-lg border px-4 py-2 text-sm font-bold transition ${
          coffeePercentage === percentage
            ? "border-[#5b2d1b] bg-[#5b2d1b] text-white"
            : "border-[#5b2d1b]/20 bg-white text-[#5b2d1b] hover:border-[#5b2d1b]"
        }`}
      >
        {percentage}:{100 - percentage}
      </button>
    ))}
  </div>
</div>
          {/* Weight */}
          <div className="mt-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#795548]">
              Select Quantity
            </p>

            <div className="grid grid-cols-4 gap-2">
              {WEIGHTS.map((item) => {
                const selected = weight === item.grams;

                return (
                  <button
                    key={item.grams}
                    type="button"
                    onClick={() => setWeight(item.grams)}
                    className={`rounded-lg border px-2 py-2 text-xs font-bold transition ${
                      selected
                        ? "border-[#5b2d1b] bg-[#5b2d1b] text-white"
                        : "border-[#5b2d1b]/20 bg-white text-[#5b2d1b] hover:border-[#5b2d1b]"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price + button */}
          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-[#795548]">
                Your blend price
              </p>

              <p className="text-3xl font-bold text-[#3a1d10]">
                {formatPrice(price)}
              </p>

              <p className="text-xs text-[#795548]">
                {formatPrice(pricePerKg)} / kg
              </p>
            </div>

            <button
              type="button"
              onClick={() => onAdd(weight)}
              className="rounded-xl bg-[#f6c453] px-7 py-4 font-bold text-[#2d160d] transition hover:bg-[#e7b43b] active:scale-[0.98]"
            >
              Add Custom Blend
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}