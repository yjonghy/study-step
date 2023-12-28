/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      content : {
        chevronRight : 'url("//s3.hourplace.com/web/icon/system/ic-chevron-right.svg")'
      },
      boxShadow: {
        shadow16_15 : "0px 8px 16px rgba(0, 0, 0, 0.15)",
        shadow15: "0px 8px 12px rgba(0, 0, 0, 0.15)",
        shadow008 : "0px -2px 8px rgba(5, 5, 5, 0.08)",
        shadow0 : "0px 0px 0px rgba(0, 0, 0, 0)"
      },
      blur: {
        blur80: "80px"
      },
      keyframes: {
        bounce: {
          '100%' : { transform: 'translateY(-10%)'},
          //'0%' : { transform: 'translateY(100%)'},
        },
      },
      animation: {
        spin : "spin 0.8s linear infinite",
        bounce: 'bounce 0.1s ease-in forwards',
        pulse : "pulse 1s ease-in-out infinite"
        //     pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite
      },
    },
    screens: {
      //default media query
      mobile: {min: '0px', max: '767px'},
      tablet: {min: '768px', max: `1023px`},
      desktop: '1024px',
      // => @media (min-width: 1024px) { ... }
      fullCol : "1116px",
      halfCol : { min: '0px', max: '1115px'},
      mainSearchBar : {min: '0px', max: '1345px'}
    },
    colors: {
      dim : "rgba(5, 5, 5, 0.25)",
      transparent : "transparent",
      white : "#FFFFFF",
      black : "#000000",
      alphaBlack : "rgba(5, 5, 5, 0.06)",
      gray010 : "#F7F8F9",
      gray015 : "#EDEFF2",
      gray020 : "#E7EAEE",
      gray025 : "#DFE2E7",
      gray030 : "#C9CDD2",
      gray035 : "#ADB2B9",
      gray040 : "#9DA3AB",
      gray050 : "#717980",
      gray060 : "#4A4F54",
      gray070 : "#26292B",
      gray080 : "#1B1E1F",
      gray090 : "#050505",
      green005 : "#ECF9ED",
      green010 : "#D3F4D8",
      green020 : "#ABE7AF",
      green030 : "#85D786",
      green040 : "#68C963",
      green050 : "#54BD5F",
      green060 : "#47AE54",
      green070 : "#379A47",
      blue005 : "#EBF3FF",
      blue010 : "#D6E7FF",
      blue020 : "#A8CBFF",
      blue025 : "#246FF840",
      blue030 : "#518FFB",
      blue040 : "#246FF8",
      blue050 : "#195BFA",
      blue060 : "#0F3DDE",
      blue070 : "#0038C1",
      yellow005 : "#FFF7E0",
      yellow010 : "#FFECC2",
      yellow020 : "#FFDC8F",
      yellow030 : "#FBC959",
      yellow040 : "#F5BA26",
      yellow050 : "#E8AF00",
      yellow060 : "#C99A00",
      yellow070 : "#B48A00",
      red005 : "#FFF1F0",
      red010 : "#FFE6E4",
      red020 : "#FFD0CD",
      red030 : "#FFA292",
      red040 : "#FE6D55",
      red050 : "#F0462F",
      red060 : "#E22E21",
      red070 : "#D10E00",
      hourblue : "#0056FF",
      gold : "#C19F63"
    },
  },
  variants: {
    extend: {}, // 지정된 속성에만 사용 가능함! 사용할 속성: ['클래스명']
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require('tailwindcss-font-inter')
  ]
}

