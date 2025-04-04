"use client"

import { motion } from "framer-motion"

export function Loader() {
  return (
    <div className="flex flex-col justify-center items-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <span className="loader"></span>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-muted-foreground"
      >
        Loading...
      </motion.p>
    </div>
  )
}

