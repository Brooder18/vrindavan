"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  type: "powder" | "beans";
  weight: number;
  price: number;
  quantity: number;
  image: string;
  blend: string;
};

function formatPrice(price: number) {
  return `₹${price.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

function weightLabel(weight: number) {
  if (weight === 1000) return "1 kg";
  if (weight === 2000) return "2 kg";
  return `${weight} g`;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("vrindavan-cart");

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch {
      console.log("Could not load cart.");
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem("vrindavan-cart", JSON.stringify(cart));
    } catch {
      console.log("Could not save cart.");
    }
  }, [cart, loaded]);

  function increaseQuantity(id: string) {
    setCart((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function decreaseQuantity(id: string) {
    setCart((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(id: string) {
    setCart((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }

  function clearCart() {
    setCart([]);
  }

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

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
              className="text-sm font-medium text-white transition hover:text-[#f6c453]"
            >
              Shop Coffee
            </Link>

            <Link
              href="/cart"
              className="rounded-full bg-[#f6c453] px-5 py-2 text-sm font-bold text-[#2d160d]"
            >
              Cart {itemCount > 0 && `(${itemCount})`}
            </Link>

          </nav>

          <Link
            href="/shop"
            className="rounded-full bg-[#f6c453] px-4 py-2 text-sm font-bold text-[#2d160d] md:hidden"
          >
            Shop
          </Link>

        </div>
      </header>

      {/* Page heading */}
      <section className="bg-[#3a1d10] px-5 py-16 text-center">

        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f6c453]">
          Your Selection
        </p>

        <h1 className="mt-3 font-serif text-4xl font-bold text-white md:text-6xl">
          Your Cart
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-[#e5d3c4]">
          Review your coffee selection before placing your order.
        </p>

      </section>

      {/* Cart */}
      <section className="mx-auto max-w-7xl px-5 py-14">

        {cart.length === 0 ? (

          /* Empty cart */
          <div className="mx-auto max-w-2xl rounded-3xl border border-[#5b2d1b]/10 bg-white p-10 text-center shadow-sm">

            <div className="text-6xl">
              ☕
            </div>

            <h2 className="mt-5 font-serif text-3xl font-bold text-[#3a1d10]">
              Your cart is empty
            </h2>

            <p className="mt-3 text-[#795548]">
              Looks like you haven't selected any coffee yet.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-block rounded-xl bg-[#f6c453] px-7 py-4 font-bold text-[#2d160d] transition hover:bg-[#e7b43b]"
            >
              Explore Our Coffee
            </Link>

          </div>

        ) : (

          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

            {/* Items */}
            <div>

              <div className="mb-6 flex items-center justify-between">

                <div>
                  <h2 className="font-serif text-3xl font-bold text-[#3a1d10]">
                    Selected Coffee
                  </h2>

                  <p className="mt-1 text-sm text-[#795548]">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={clearCart}
                  className="text-sm font-bold text-red-700 hover:underline"
                >
                  Clear Cart
                </button>

              </div>

              <div className="space-y-5">

                {cart.map((item) => (

                  <article
                    key={item.id}
                    className="overflow-hidden rounded-2xl border border-[#5b2d1b]/10 bg-white shadow-sm"
                  >

                    <div className="flex flex-col sm:flex-row">

                      {/* Product image */}
                      <div className="relative h-52 w-full shrink-0 bg-[#eee3d4] sm:h-auto sm:w-48">

                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="192px"
                          className="object-cover"
                        />

                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col justify-between p-5">

                        <div>

                          <div className="flex items-start justify-between gap-4">

                            <div>

                              <p className="text-xs font-bold uppercase tracking-wider text-[#a46a12]">
                                {item.type === "powder"
                                  ? "Filter Coffee"
                                  : "Coffee Beans"}
                              </p>

                              <h3 className="mt-1 font-serif text-2xl font-bold text-[#3a1d10]">
                                {item.name}
                              </h3>

                              <p className="mt-2 text-sm font-semibold text-[#a46a12]">
                                {item.blend}
                              </p>

                            </div>

                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-xl text-[#795548] transition hover:text-red-700"
                              aria-label={`Remove ${item.name}`}
                            >
                              ×
                            </button>

                          </div>

                          <p className="mt-3 text-sm text-[#795548]">
                            Quantity: {weightLabel(item.weight)}
                          </p>

                        </div>

                        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                          {/* Quantity */}
                          <div className="flex items-center">

                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item.id)}
                              className="flex h-10 w-10 items-center justify-center rounded-l-lg border border-[#5b2d1b]/20 bg-[#f7f1e7] text-lg font-bold text-[#5b2d1b] hover:bg-[#eee3d4]"
                            >
                              −
                            </button>

                            <div className="flex h-10 min-w-12 items-center justify-center border-y border-[#5b2d1b]/20 bg-white px-3 font-bold">
                              {item.quantity}
                            </div>

                            <button
                              type="button"
                              onClick={() => increaseQuantity(item.id)}
                              className="flex h-10 w-10 items-center justify-center rounded-r-lg border border-[#5b2d1b]/20 bg-[#f7f1e7] text-lg font-bold text-[#5b2d1b] hover:bg-[#eee3d4]"
                            >
                              +
                            </button>

                          </div>

                          {/* Price */}
                          <div className="text-left sm:text-right">

                            <p className="text-xs text-[#795548]">
                              {formatPrice(item.price)} each
                            </p>

                            <p className="text-2xl font-bold text-[#3a1d10]">
                              {formatPrice(item.price * item.quantity)}
                            </p>

                          </div>

                        </div>

                      </div>

                    </div>

                  </article>

                ))}

              </div>

              <Link
                href="/shop"
                className="mt-7 inline-block font-bold text-[#5b2d1b] hover:underline"
              >
                ← Continue Shopping
              </Link>

            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-28 lg:self-start">

              <div className="rounded-3xl border border-[#5b2d1b]/10 bg-white p-7 shadow-sm">

                <h2 className="font-serif text-3xl font-bold text-[#3a1d10]">
                  Order Summary
                </h2>

                <div className="mt-7 space-y-4">

                  <div className="flex justify-between text-sm">
                    <span className="text-[#795548]">
                      Items
                    </span>

                    <span className="font-bold">
                      {itemCount}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#795548]">
                      Subtotal
                    </span>

                    <span className="font-bold">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#795548]">
                      Delivery
                    </span>

                    <span className="font-bold text-[#a46a12]">
                      Calculated at checkout
                    </span>
                  </div>

                </div>

                <div className="my-6 border-t border-[#5b2d1b]/10" />

                <div className="flex items-center justify-between">

                  <span className="text-lg font-bold">
                    Total
                  </span>

                  <span className="text-3xl font-bold text-[#3a1d10]">
                    {formatPrice(subtotal)}
                  </span>

                </div>

                 bg-[#f6c453] px-5 py-4 font-bold text-[#2d160d] transition hover:bg-[#e7b43b] active:scale-[0.98]"
    <Link
  href="/checkout"
  className="mt-7 block w-full rounded-xl bg-[#f6c453] px-5 py-4 text-center font-bold text-[#2d160d] transition hover:bg-[#e7b43b]"
>
  Proceed to Checkout
</Link>

                <p className="mt-4 text-center text-xs leading-5 text-[#795548]">
                  Secure ordering. We will collect your delivery details
                  during checkout.
                </p>

              </div>

            </aside>

          </div>

        )}

      </section>

      {/* Footer */}
      <footer className="bg-[#1f1009] px-5 py-12 text-[#d9c4b4]">

        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">

          <div>

            <div className="flex items-center gap-3">

              <Image
                src="/images/logo.pnj.jpg"
                alt="Vrindavan Coffee House"
                width={50}
                height={50}
                className="h-12 w-12 rounded-full object-cover"
              />

              <h3 className="font-serif text-2xl font-bold text-white">
                Vrindavan Coffee House
              </h3>

            </div>

            <p className="mt-3 text-sm text-[#f6c453]">
              Crafted with tradition.
            </p>

          </div>

          <div>

            <h3 className="text-lg font-bold text-[#f6c453]">
              Explore
            </h3>

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

          © 2026 Vrindavan Coffee House. All rights reserved.

        </div>

      </footer>

    </main>
  );
}