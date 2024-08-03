"use client";

import GallerySVG from "@/assets/icons/canvas.svg";
import PortfolioSVG from "@/assets/icons/power-service.svg";
import AboutSVG from "@/assets/icons/user.svg";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useAnimation,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

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

export default function NavigationBarComponent() {
  const controls = useAnimation();
  const [isRow, setIsRow] = useState(true);
  let mouseX = useMotionValue(Infinity);

  return (
    <div>
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
          }  bottom-10 left-1/2 transform -translate-x-1/2 absolute bg-whiteComponentBackground border-whiteComponentOutline dark:bg-componentBackground dark:border-componentOutline border rounded-3xl p-2`}
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
