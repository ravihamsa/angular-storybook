/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: {
          default: "#4167fd",
          hover: "#2046dd",
          active: "#1a38b1",
          background: "#f6f7ff",
        },
        content: {
          primary: "#000000",
          secondary: "#616161",
          tertiary: "#909090",
          "primary-hover": "#252525",
        },
        background: {
          neutral: {
            screen: "#ffffff",
            50: "#f8f8f9",
            100: "#eeeef0",
            200: "#e6e7ea",
            300: "#dadbdf",
          },
        },
        border: {
          line: "#dddee1",
          default: "#cecfd5",
          hover: "#b6b8c0",
          active: "#848896",
        },
        technical: {
          green: {
            transparent: "#def7ea",
            default: "#168833",
            dark: "#03622f",
          },
          orange: {
            transparent: "#fcead5",
            default: "#bb5b15",
            dark: "#784203",
          },
          red: {
            transparent: "#ffe1e1",
            default: "#ff4646",
            dark: "#7a0c0c",
          },
          blue: {
            transparent: "#d9f2fa",
            default: "#2f7cb1",
            dark: "#02536c",
          },
          purple: {
            transparent: "#f4e7ff",
            default: "#9e4de4",
            dark: "#45067a",
          },
          yellow: {
            transparent: "#fff5be",
            default: "#ffd704",
            dark: "#7e6c09",
          },
          bluelight: {
            transparent: "#caf7f7",
            default: "#92f8f8",
            dark: "#004144",
          },
        },
        graph: {
          1: {
            purple: "#6366f1",
            "purple-transparent": "#d0d1fb",
          },
          2: {
            orange: "#f59e0b",
            "orange-transparent": "#fce2b6",
          },
          3: {
            turquoise: "#14b8a6",
            "turquoise-transparent": "#b9eae4",
          },
          4: {
            magenta: "#ec4899",
            "magenta-transparent": "#f9c8e0",
          },
          5: {
            blue: "#3b82f6",
            "blue-transparent": "#c4dafc",
          },
          6: {
            yellow: "#facc15",
            "yellow-transparent": "#fef0b9",
          },
          7: {
            marine: "#159afa",
            "marine-transparent": "#b9e1fe",
          },
        },
      },
      gridTemplateColumns: {
        "key-value": "max-content 1fr",
      },
      fontSize: {
        "2xl": ["1.25rem", "1.625rem"],
        "3xl": ["1.75rem", "2.25rem"],
      },
      boxShadow: {
        "header-nav": "0px 0px 40px 0px #45474533",
        sm: "0px 0px 40px rgba(69, 71, 69, 0.2)",
        md: "0px 20px 66px rgba(34, 48, 73, 0.2)",
        lg: "0px 88px 35px rgba(0, 0, 0, 0.01), 0px 50px 30px rgba(0, 0, 0, 0.05), 0px 22px 22px rgba(0, 0, 0, 0.09), 0px 6px 12px rgba(0, 0, 0, 0.1)",
      },
      spacing: {
        4.5: "1.125rem",
      },
    },
  },
  plugins: [],
};
