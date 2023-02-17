const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/layouts/**/*.{js,jsx}",
    "./src/application/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto)", ...fontFamily.sans],
      },
      colors: {
        beereign_bg: "#0F1421",
        beereign_yellow: "#EDD224",
        beereign_grey: "#2C303B",
        beereign_silver: "#515057",
        beereign_ligth: "#505058",
        beereign_clear: "#F9FAFB",
        beereign_green: "#28A745",
        beereign_hover: "#E0F3FF",
        shadow: "#919295",
      },
      width: {
        input: "19rem",
      },
      spacing: {
        side_height: "calc(100vh - 4rem)",
        tab_height: "calc(100vh - 8rem)",
      },
      minHeight: {
        tab_height: "calc(100vh - 8rem)",
        xl_height: "calc(100vh - 6rem)",
        app_height: "calc(100vh - 4rem)",
        not_found: "calc(100vh - 5rem)",
      },
      maxHeight: {
        tab_height: "calc(100vh - 10rem)",
        xl_height: "calc(100vh - 6rem)",
        app_height: "calc(100vh - 4rem)",
      },
      maxWidth: {
        header_account: "13rem",
        xl_width: "calc(100vw - 16rem)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    // ...
  ],
};
