"use client";

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

function formatWeight(grams: number) {
  if (grams === 1000) return "1 kg";
  if (grams === 2000) return "2 kg";
  return `${grams} g`;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("vrindavan-cart");

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch {
      console.log("Could not load cart.");
    }
  }, []);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryCharge = subtotal >= 1000 ? 0 : 80;

  const total = subtotal + deliveryCharge;

  function placeOrder() {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    if (!city.trim()) {
      alert("Please enter your city.");
      return;
    }

    if (!pincode.trim()) {
      alert("Please enter your PIN code.");
      return;
    }

    const orderItems = cart
      .map(
        (item) =>
          `• ${item.name}\n` +
          `  ${item.blend}\n` +
          `  ${formatWeight(item.weight)} × ${item.quantity} = ${formatPrice(
            item.price * item.quantity
          )}`
      )
      .join("\n\n");

    const message =
      `☕ *NEW ORDER - VRINDAVAN COFFEE HOUSE*\n\n` +
      `*Customer Details*\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Address: ${address}\n` +
      `City: ${city}\n` +
      `PIN Code: ${pincode}\n` +
      (notes.trim() ? `Notes: ${notes}\n` : "") +
      `\n*Order Details*\n\n` +
      `${orderItems}\n\n` +
      `*Subtotal:* ${formatPrice(subtotal)}\n` +
      `*Delivery:* ${
        deliveryCharge === 0 ? "FREE" : formatPrice(deliveryCharge)
      }\n` +
      `*TOTAL: ${formatPrice(total)}*`;

    const whatsappUrl = `https://wa.me/918247067453?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  }

  return (
    <main className="min-h-screen bg-[#f7f1e7] text-[#2d160d]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#5b2d1b]/20 bg-[#2d160d]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="text-xl font-bold tracking-wide text-[#f6c453]"
          >
            Vrindavan Coffee House
          </Link>

          <nav className="flex items-center gap-4 sm:gap-8">
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
              Shop
            </Link>

            <Link
              href="/cart"
              className="rounded-full bg-[#f6c453] px-5 py-2 text-sm font-bold text-[#2d160d]"
            >
              Cart
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#3a1d10] px-5 py-14 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#f6c453]">
          Vrindavan Coffee House
        </p>

        <h1 className="mt-3 font-serif text-4xl font-bold text-white md:text-5xl">
          Checkout
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-[#e5d3c4]">
          Complete your delivery details and place your coffee order.
        </p>
      </section>

      {/* Checkout */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Customer details */}
          <div className="rounded-3xl border border-[#5b2d1b]/10 bg-white p-6 shadow-sm md:p-8">
            <h2 className="font-serif text-3xl font-bold text-[#3a1d10]">
              Delivery Details
            </h2>

            <p className="mt-2 text-sm text-[#795548]">
              Tell us where we should deliver your coffee.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-bold text-[#3a1d10]">
                  Full Name *
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-[#5b2d1b]/20 bg-[#fffaf2] px-4 py-3 outline-none transition focus:border-[#5b2d1b] focus:ring-2 focus:ring-[#f6c453]/40"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-bold text-[#3a1d10]">
                  Phone Number *
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  className="w-full rounded-xl border border-[#5b2d1b]/20 bg-[#fffaf2] px-4 py-3 outline-none transition focus:border-[#5b2d1b] focus:ring-2 focus:ring-[#f6c453]/40"
                />
              </div>
            </div>

            {/* Address */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-[#3a1d10]">
                Delivery Address *
              </label>

              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House / Flat number, Street, Area"
                rows={4}
                className="w-full resize-none rounded-xl border border-[#5b2d1b]/20 bg-[#fffaf2] px-4 py-3 outline-none transition focus:border-[#5b2d1b] focus:ring-2 focus:ring-[#f6c453]/40"
              />
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {/* City */}
              <div>
                <label className="mb-2 block text-sm font-bold text-[#3a1d10]">
                  City *
                </label>

                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Your city"
                  className="w-full rounded-xl border border-[#5b2d1b]/20 bg-[#fffaf2] px-4 py-3 outline-none transition focus:border-[#5b2d1b] focus:ring-2 focus:ring-[#f6c453]/40"
                />
              </div>

              {/* PIN */}
              <div>
                <label className="mb-2 block text-sm font-bold text-[#3a1d10]">
                  PIN Code *
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="6-digit PIN"
                  maxLength={6}
                  className="w-full rounded-xl border border-[#5b2d1b]/20 bg-[#fffaf2] px-4 py-3 outline-none transition focus:border-[#5b2d1b] focus:ring-2 focus:ring-[#f6c453]/40"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold text-[#3a1d10]">
                Order Notes{" "}
                <span className="font-normal text-[#795548]">
                  (optional)
                </span>
              </label>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special delivery instructions?"
                rows={3}
                className="w-full resize-none rounded-xl border border-[#5b2d1b]/20 bg-[#fffaf2] px-4 py-3 outline-none transition focus:border-[#5b2d1b] focus:ring-2 focus:ring-[#f6c453]/40"
              />
            </div>
          </div>

          {/* Order summary */}
          <div className="h-fit rounded-3xl border border-[#5b2d1b]/10 bg-white p-6 shadow-sm md:p-8">
            <h2 className="font-serif text-3xl font-bold text-[#3a1d10]">
              Your Order
            </h2>

            {cart.length === 0 ? (
              <div className="py-10 text-center">
                <div className="text-5xl">☕</div>

                <p className="mt-4 font-bold text-[#3a1d10]">
                  Your cart is empty
                </p>

                <Link
                  href="/shop"
                  className="mt-5 inline-block rounded-xl bg-[#f6c453] px-6 py-3 font-bold text-[#2d160d]"
                >
                  Go To Shop
                </Link>
              </div>
            ) : (
              <>
                <div className="mt-7 space-y-5">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-[#5b2d1b]/10 pb-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-[#3a1d10]">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-xs font-semibold text-[#a46a12]">
                            {item.blend}
                          </p>

                          <p className="mt-1 text-sm text-[#795548]">
                            {formatWeight(item.weight)} × {item.quantity}
                          </p>
                        </div>

                        <p className="whitespace-nowrap font-bold text-[#3a1d10]">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="mt-7 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#795548]">Subtotal</span>
                    <span className="font-semibold">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#795548]">Delivery</span>

                    <span className="font-semibold">
                      {deliveryCharge === 0
                        ? "FREE"
                        : formatPrice(deliveryCharge)}
                    </span>
                  </div>

                  <div className="border-t border-[#5b2d1b]/10 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#3a1d10]">
                        Total
                      </span>

                      <span className="text-3xl font-bold text-[#3a1d10]">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Order */}
                <button
                  type="button"
                  onClick={placeOrder}
                  className="mt-7 w-full rounded-xl bg-[#f6c453] px-5 py-4 text-center font-bold text-[#2d160d] transition hover:bg-[#e7b43b] active:scale-[0.98]"
                >
                  Place Order on WhatsApp
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-[#795548]">
                  Your order details will open in WhatsApp. We will confirm
                  your order and payment details with you.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1f1009] px-5 py-10 text-center text-[#d9c4b4]">
        <h2 className="font-serif text-2xl font-bold text-white">
          Vrindavan Coffee House
        </h2>

        <p className="mt-2 text-sm text-[#f6c453]">
          Crafted with tradition.
        </p>

        <p className="mt-5 text-sm">
          Questions? Contact us on WhatsApp.
        </p>
      </footer>
    </main>
  );
}