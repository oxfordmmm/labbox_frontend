/* eslint-disable import/no-extraneous-dependencies */
import plugin from "tailwindcss/plugin";

export const shadcnPlugin = plugin(
  ({ addBase }) => {
    // 1. Add CSS variable definitions to the base layer
    addBase({
      ":root": {
        "--background": "0 0% 100%",
        "--foreground": "222.2 84% 8.9%",
        "--card": "0 0% 100%",
        "--card-foreground": "222.2 84% 8.9%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "222.2 84% 8.9%",
        "--primary": "221.2 83.2% 53.3%",
        "--primary-foreground": "210 40% 98%",
        "--secondary": "210 40% 96.1%",
        "--secondary-foreground": "222.2 47.4% 11.2%",
        "--muted": "210 40% 96.1%",
        "--muted-foreground": "215.4 16.3% 46.9%",
        "--accent": "210 40% 96.1%",
        "--accent-foreground": "222.2 47.4% 11.2%",
        "--destructive": "0 84.2% 60.2%",
        "--destructive-foreground": "210 40% 98%",
        "--border": "214.3 31.8% 91.4%",
        "--input": "214.3 31.8% 91.4%",
        "--ring": "221.2 83.2% 53.3%",
        "--radius": "0.5rem",
      },
      ".dark": {
        "--background": "222.2 84% 8.9%",
        "--foreground": "210 40% 98%",
        "--card": "222.2 84% 8.9%",
        "--card-foreground": "210 40% 98%",
        "--popover": "222.2 84% 8.9%",
        "--popover-foreground": "210 40% 98%",
        "--primary": "217.2 91.2% 59.8%",
        "--primary-foreground": "222.2 47.4% 11.2%",
        "--secondary": "217.2 32.6% 17.5%",
        "--secondary-foreground": "210 40% 98%",
        "--muted": "217.2 32.6% 17.5%",
        "--muted-foreground": "215 20.2% 65.1%",
        "--accent": "217.2 32.6% 17.5%",
        "--accent-foreground": "210 40% 98%",
        "--destructive": "0 62.8% 30.6%",
        "--destructive-foreground": "210 40% 98%",
        "--border": "217.2 32.6% 17.5%",
        "--input": "217.2 32.6% 17.5%",
        "--ring": "224.3 76.3% 48%",
      },
    });

    // 2. Extend the Tailwind theme with "themable" utilities
    addBase({
      "*": {
        "@apply border-border": {},
      },
      body: {
        "@apply bg-background text-foreground": {},
        "font-feature-settings": "'rlig' 1, 'calt' 1",
      },
    });
  },

  {
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        fontFamily: {
          sans: ["Roboto", "noto-sans", "sans-serif"],
        },
        gridTemplateColumns: {
          "70/30": "70% 28%",
        },
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
          "oxford-blue": "#002147",
          "oxford-mauve": "#776885",
          "oxford-peach": "#E08D79",
          "oxford-potters-pink": "#ED9390",
          "oxford-dusk": "#C4A29E",
          "oxford-lilac": "#D1BDD5",
          "oxford-siena": "#994636",
          "oxford-red": "#AA1A2D",
          "oxford-plum": "#7F055F",
          "oxford-coral": "#FE615A",
          "oxford-lavender": "#D4CDF4",
          "oxford-orange": "#FB5607",
          "oxford-pink": "#E6007E",
          "oxford-green": "#426A5A",
          "oxford-ocean-grey": "#789E9E",
          "oxford-yellow-ochre": "#E2C044",
          "oxford-cool-grey": "#E4F0EF",
          "oxford-sky-blue": "#B9D6F2",
          "oxford-sage-green": "#A0AF84",
          "oxford-viridian": "#15616D",
          "oxford-royal-blue": "#1D42A6",
          "oxford-aqua": "#00AAB4",
          "oxford-vivid-green": "#65E5AE",
          "oxford-lime-green": "#95C11F",
          "oxford-cerulean-blue": "#49B6FF",
          "oxford-lemon-yellow": "#F7EF66",
          "oxford-charcoal": "#211D1C",
          "oxford-ash-grey": "#61615F",
          "oxford-umber": "#89827A",
          "oxford-stone-grey": "#D9D8D6",
          "oxford-shell-grey": "#F1EEE9",
          "oxford-off-white": "#F2F0F0",
          gold: "#FFD700",
          silver: "#C0C0C0",
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
        "::-webkit-scrollbar-track": {
          background: "hsl(var(--background))",
        },
      },
    },
  }
);
