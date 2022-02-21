function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: withOpacityValue("--color-primary"),
        secondary: withOpacityValue("--color-secondary"),
        "mint-green": "#47FFA6",
        "soft-purple": "#A56FEB",
        "royal-blue": "#4479E4",
        "dark-blue": "#012A36",
        "light-carmine": "#EF6F6C",
        silver: "#D8D7D7",
      },
      fontFamily: {
        sans: ["Space Grotesk"],
        mono: ["Space Mono"],
        display: ["Gangster Grotesk"],
        logo: ["Aqum two"],
      },
      boxShadow: {
        raised: "0px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
