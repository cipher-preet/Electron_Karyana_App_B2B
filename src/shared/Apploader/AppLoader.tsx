import { motion } from "framer-motion";
import "./AppLoader.css";

const AppLoader = () => {
  return (
    <div className="app-loader">
      <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p>Loading .... </p>
    </div>
  );
};

export default AppLoader;
