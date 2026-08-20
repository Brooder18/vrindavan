"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f1e7] text-[#2d160d]">

      {/* ================= HEADER ================= */}
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
              className="text-sm font-semibold text-[#f6c453]"
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
              className="rounded-full bg-[#f6c453] px-5 py-2 text-sm font-bold text-[#2d160d] transition hover:bg-[#e7b43b]"
            >
              Cart
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

      {/* ================= HERO ================= */}
      <section className="relative min-h-[680px] overflow-hidden bg-[#2d160d]">

        {/* Big background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.png"
            alt="Fresh coffee and plantation"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/45" />

          {/* Brown gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2d160d]/80 via-[#2d160d]/45 to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-5 py-20">

          <div className="max-w-2xl rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md md:p-12">

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f6c453]">
              Vrindavan Coffee House
            </p>

            <h1 className="mt-4 font-serif text-5xl font-bold leading-tight text-white md:text-7xl">
              From Our Plantation
              <br />
              <span className="text-[#f6c453]">
                To Your Cup
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/90 md:text-lg">
              Discover the warmth of authentic Indian coffee,
              carefully crafted with tradition, quality and a passion
              for every cup.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="rounded-xl bg-[#f6c453] px-7 py-4 font-bold text-[#2d160d] transition hover:bg-[#e7b43b] hover:shadow-lg"
              >
                Shop Our Coffee
              </Link>

              <a
                href="#story"
                className="rounded-xl border border-white/40 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Our Story
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PLANTATION STORY ================= */}
      <section
        id="story"
        className="mx-auto max-w-7xl px-5 py-20 md:py-28"
      >
        <div className="grid items-center gap-12 md:grid-cols-2">

          {/* Image */}
          <div className="relative min-h-[420px] overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/images/plant.pnj.jpg"
              alt="Coffee plantation"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#a46a12]">
              Where It Begins
            </p>

            <h2 className="mt-3 font-serif text-4xl font-bold text-[#3a1d10] md:text-5xl">
              From the Plantation
              <br />
              to Your Kitchen
            </h2>

            <p className="mt-6 text-base leading-8 text-[#795548]">
              Great coffee begins with great care. From carefully selected
              coffee beans to the final roast, every step matters.
            </p>

            <p className="mt-4 text-base leading-8 text-[#795548]">
              At Vrindavan Coffee House, we believe coffee should carry
              the warmth, aroma and character of the places where it grows.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-block rounded-xl bg-[#5b2d1b] px-6 py-3 font-bold text-white transition hover:bg-[#432115]"
            >
              Explore Our Coffee
            </Link>
          </div>

        </div>
      </section>

      {/* ================= FAMILY STORY ================= */}
      <section className="bg-[#eee3d4]">
        <div className="mx-auto max-w-7xl px-5 py-20 md:py-28">

          <div className="grid items-center gap-12 md:grid-cols-2">

            {/* Family photo */}
            <div className="relative min-h-[420px] overflow-hidden rounded-3xl shadow-xl md:order-2">
              <Image
                src="/images/family.pnj.jpg"
                alt="Vrindavan Coffee House family"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Story */}
            <div className="md:order-1">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#a46a12]">
                Our Family
              </p>

              <h2 className="mt-3 font-serif text-4xl font-bold text-[#3a1d10] md:text-5xl">
                A Family Passion
                <br />
                for Good Coffee
              </h2>

              <p className="mt-6 text-base leading-8 text-[#795548]">
                Vrindavan Coffee House was built from a simple love for
                coffee and the joy of sharing it with family and friends.
              </p>

              <p className="mt-4 text-base leading-8 text-[#795548]">
                What started with a passion for authentic coffee traditions
                continues today with carefully crafted blends made for
                everyday moments.
              </p>

              <p className="mt-4 text-base leading-8 text-[#795548]">
                Every packet we prepare carries a little piece of our
                family and our commitment to quality.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= POWDER / BEANS ================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:py-28">

        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#a46a12]">
            Discover Your Coffee
          </p>

          <h2 className="mt-3 font-serif text-4xl font-bold text-[#3a1d10] md:text-5xl">
            Choose Your Favourite
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#795548]">
            Whether you love traditional filter coffee powder or freshly
            roasted beans, we have something for every coffee lover.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">

          {/* Powder */}
          <Link
            href="/shop"
            className="group relative min-h-[420px] overflow-hidden rounded-3xl shadow-xl"
          >
            <Image
              src="/images/powder.pnj.jpg"
              alt="Filter coffee powder"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-8 left-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f6c453]">
                Traditional
              </p>

              <h3 className="mt-2 font-serif text-4xl font-bold text-white">
                Filter Coffee Powder
              </h3>

              <p className="mt-2 text-white/80">
                Classic South Indian coffee blends.
              </p>
            </div>
          </Link>

          {/* Beans */}
          <Link
            href="/shop"
            className="group relative min-h-[420px] overflow-hidden rounded-3xl shadow-xl"
          >
            <Image
              src="/images/beans.pnj.jpg"
              alt="Coffee beans"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-8 left-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f6c453]">
                Freshly Roasted
              </p>

              <h3 className="mt-2 font-serif text-4xl font-bold text-white">
                Coffee Beans
              </h3>

              <p className="mt-2 text-white/80">
                Arabica, Robusta and custom blends.
              </p>
            </div>
          </Link>

        </div>

        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-block rounded-xl bg-[#f6c453] px-8 py-4 font-bold text-[#2d160d] transition hover:bg-[#e7b43b]"
          >
            Shop All Coffee
          </Link>
        </div>

      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-[#2d160d] px-5 py-20 text-white md:py-24">
        <div className="mx-auto max-w-7xl">

          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#f6c453]">
              Why Vrindavan
            </p>

            <h2 className="mt-3 font-serif text-4xl font-bold md:text-5xl">
              Coffee Crafted With Tradition
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <div className="text-5xl">☕</div>

              <h3 className="mt-5 text-xl font-bold">
                Authentic Blends
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#d9c4b4]">
                Traditional coffee ratios carefully crafted for a rich,
                satisfying cup.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <div className="text-5xl">🌱</div>

              <h3 className="mt-5 text-xl font-bold">
                Quality Ingredients
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#d9c4b4]">
                Carefully selected coffee beans and ingredients for
                consistent flavour and aroma.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <div className="text-5xl">❤️</div>

              <h3 className="mt-5 text-xl font-bold">
                Made With Care
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#d9c4b4]">
                From our family to yours, every blend is prepared with
                care and passion.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
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

            <p className="mt-5 max-w-sm text-sm leading-7">
              Bringing the warmth of Indian coffee traditions to your cup,
              one carefully crafted blend at a time.
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
          <div className="flex flex-col justify-between gap-3 md:flex-row">
            <p>
              © 2026 Vrindavan Coffee House. All rights reserved.
            </p>

            <p>
              Crafted with <span className="text-red-500">♥</span> in India
            </p>
          </div>
        </div>

      </footer>

    </main>
  );
}