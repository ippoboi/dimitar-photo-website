"use client";

import Menu11Icon from "@/assets/icons/menu01";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { galleryData } from "../../../data/gallery";
import NavigationBarComponent from "../../../components/navigationBar";

export default function GalleryPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddPhoto, setShowAddPhoto] = useState(false);

  return (
    <div className="bg-background">
      <section className="p-2">
        <h1 className="hidden">Gallery</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {galleryData.map((item, index) => (
            <Image
              alt={item.alt}
              src={item.src}
              key={index}
              className="rounded-lg"
            />
          ))}
        </div>
        <button
          className="fixed top-10 right-10 group p-2 bg-whiteComponentBackground border-whiteComponentOutline dark:bg-componentBackground dark:border-componentOutline hover:dark:bg-componentOutline border rounded-xl transition-all duration-300 cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        >
          <Menu11Icon color="#A0A0A0" />
        </button>
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              className="fixed min-w-24 top-24 space-y-2 right-10 bg-whiteComponentBackground border-whiteComponentOutline dark:bg-componentBackground dark:border-componentOutline border rounded-xl p-2"
            >
              <button
                className="p-2 text-subTitle w-full bg-whiteComponentBackground dark:bg-componentBackground  hover:bg-whiteComponentOutline dark:hover:bg-componentOutline rounded-xl transition-all duration-300 cursor-pointer"
                onClick={() => setShowAddPhoto(true)}
              >
                Add photo
              </button>
              <button
                className="p-2 text-subTitle w-full bg-whiteComponentBackground dark:bg-componentBackground  hover:bg-whiteComponentOutline dark:hover:bg-componentOutline rounded-xl transition-all duration-300 cursor-pointer"
                onClick={() => setShowFilters(true)}
              >
                Filters
              </button>
              <button
                className="p-2 text-error w-full bg-whiteComponentBackground dark:bg-componentBackground  hover:bg-whiteComponentOutline dark:hover:bg-componentOutline rounded-xl transition-all duration-300 cursor-pointer"
                onClick={() => setShowMenu(false)}
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
