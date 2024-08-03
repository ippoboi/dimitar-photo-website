"use client";

import Image from "next/image";
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  useAnimation,
} from "framer-motion";
import { useRef, useState } from "react";
import Menu11Icon from "@/assets/icons/menu01";
import { galleryData } from "../../../data/gallery";
import Link from "next/link";
import AboutSVG from "@/assets/icons/user.svg";
import GallerySVG from "@/assets/icons/canvas.svg";
import PortfolioSVG from "@/assets/icons/power-service.svg";

const nav = [
  {
    name: "About",
    link: "/about",
    icon: AboutSVG,
  },
  {
    name: "Gallery",
    link: "/gallery",
    icon: GallerySVG,
  },
  {
    name: "Portfolio (soon)",
    link: "/",
    icon: PortfolioSVG,
  },
];

interface AppIconProps {
  mouseX: MotionValue<number>;
  item?: { name: string; icon: string; link: string };
  isRow?: boolean;
}

export default function GalleryPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddPhoto, setShowAddPhoto] = useState(false);

  const controls = useAnimation();
  const [isRow, setIsRow] = useState(true);
  let mouseX = useMotionValue(Infinity);

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

      <AnimatePresence>
        <motion.div
          //   drag
          //   dragConstraints={{
          //     top: 0,
          //     right: 0,
          //     bottom: 0,
          //     left: 0,
          //   }}
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          // onDragEnd={(event, info) => snapToEdge(info)}
          animate={controls}
          className={`flex ${
            isRow
              ? "flex-row space-x-2 h-16 items-end"
              : "flex-col space-y-2 w-16 items-start"
          }  bottom-20 left-1/2 transform -translate-x-1/2 fixed bg-whiteComponentBackground border-whiteComponentOutline dark:bg-componentBackground dark:border-componentOutline border rounded-3xl p-2`}
        >
          {/* <div
            className={`group flex ${
              isRow ? "flex-row space-x-1" : "flex-col space-y-1"
            } cursor-pointer h-full items-center`}
          >
            <div
              className={`flex ${
                isRow ? "flex-col space-y-1" : "flex-row space-x-1"
              }`}
            >
              <div className="w-1 h-1 bg-whiteComponentOutline dark:bg-btn-background rounded-full" />
              <div className="w-1 h-1 bg-whiteComponentOutline dark:bg-btn-background rounded-full" />
              <div className="w-1 h-1 bg-whiteComponentOutline dark:bg-btn-background rounded-full" />
            </div>
            <div
              className={`flex ${
                isRow ? "flex-col space-y-1" : "flex-row space-x-1"
              }`}
            >
              <div className="w-1 h-1 bg-whiteComponentOutline dark:bg-btn-background rounded-full" />
              <div className="w-1 h-1 bg-whiteComponentOutline dark:bg-btn-background rounded-full" />
              <div className="w-1 h-1 bg-whiteComponentOutline dark:bg-btn-background rounded-full" />
            </div>
          </div> */}

          {nav.map((item) => (
            <AppIcon
              key={item.name}
              mouseX={mouseX}
              item={item}
              isRow={isRow}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function AppIcon({ mouseX, item, isRow }: AppIconProps) {
  const [active, setActive] = useState(null);
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [50, 80, 50]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 100, damping: 12 });

  return (
    <Link href={item?.link as string}>
      <motion.div
        ref={ref}
        style={{ width }}
        onMouseMove={() => setActive(item)}
        onMouseLeave={() => setActive(null)}
        key={item?.name}
        whileHover={{ scale: 1.1, transition: { duration: 0.01 } }}
        className="p-4 relative aspect-square flex items-center justify-center  bg-whiteComponentBackground border-whiteComponentOutline hover:bg-whiteComponentOutline dark:bg-componentBackground group rounded-2xl dark:hover:bg-componentOutline drop-shadow cursor-pointer dark:border-componentOutline border"
      >
        <Image
          src={item?.icon as string}
          alt="logo"
          width={24}
          height={24}
          className="opacity-30 group-hover:opacity-80 transition-all duration-300 cursor-pointer "
        />
        {active === item && (
          <motion.p
            initial={{ opacity: 0, filter: "blur(2px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(2px)" }}
            className={`absolute text-sm text-nowrap ${
              isRow
                ? "-top-14 left-1/2 transform -translate-x-1/2"
                : "-right-14 top-1/2 transform -translate-y-1/2"
            } p-2 bg-whiteComponentBackground  dark:bg-componentBackground  dark:text-subTitle  rounded-xl `}
          >
            {item?.name}
          </motion.p>
        )}
      </motion.div>
    </Link>
    // <motion.div
    //   ref={ref}
    //   style={{ width }}
    //   className="aspect-square w-10 rounded-full bg-gray-400"
    // />
  );
}
