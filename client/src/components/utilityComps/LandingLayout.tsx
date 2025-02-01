import { motion } from "framer-motion";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full min-h-[600px] w-full gap-4 flex flex-col items-center justify-center pb-[20%]"
    >
      {children}
    </motion.div>
  );
}
