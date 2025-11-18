"use client";

import { motion } from "framer-motion";

export default function TimelineItem({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        x: 6,
        transition: { duration: 0.25 },
      }}
      className="relative pl-20 pr-4 cursor-pointer"
    >
      {/* Icon container */}
      <motion.div
        className="absolute left-6 top-1 w-10 h-10 rounded-full flex items-center justify-center border"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--accent)",
        }}
        whileHover={{
          scale: 1.2,
          rotate: -8,
          boxShadow: "0 0 15px var(--timeline-glow)",
        }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          style={{
            fontSize: "1.3rem",
          }}
        >
          {icon}
        </motion.span>
      </motion.div>

      {/* Title */}
      <motion.h3
        whileHover={{ color: "var(--accent)" }}
        className="text-xl font-semibold"
        style={{ color: "var(--text)" }}
      >
        {title}
      </motion.h3>

      {/* Description */}
      <motion.p
        style={{ color: "var(--text-muted)" }}
        whileHover={{
          opacity: 1.0,
        }}
        className="mt-1 text-sm"
      >
        {text}
      </motion.p>

      {/* Pulsing glow over timeline line */}
      <motion.div
        className="absolute left-[1.6rem] top-2 w-2 h-2 rounded-full"
        style={{
          backgroundColor: "var(--accent)",
          filter: "blur(4px)",
        }}
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
