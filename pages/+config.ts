import type { Config } from "vike/types";
import vikeReact from "vike-react/config";
import Layout from "../layouts/LayoutDefault.js";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout
  Layout,

  // https://vike.dev/head-tags
  title: "ExoDiscover AI - AI-Powered Exoplanet Discovery",

  description: "Revolutionizing exoplanet discovery through artificial intelligence. Advanced TabNet classifier analyzes stellar parameters to identify genuine exoplanets from NASA's candidate observations.",
  extends: vikeReact,
  prerender: true,
} satisfies Config;
