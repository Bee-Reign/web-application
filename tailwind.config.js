module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/layouts/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        beereign_bg: "#0F1421",
        beereign_yellow: "#EDD224",
        beereign_grey: "#2C303B",
        beereign_silver: "#54545C",
        beereign_ligth: "#505058",
        beereign_clear: "#F3F4F6",
        beereign_green: "#28A745",
        beereign_hover: "#E0F3FF",
        shadow: "#919295",
      },
      width: {
        input: "19rem",
      },
      spacing: {
        side_height: "calc(100vh - 4rem)",
        tab_height: "calc(100vh - 9rem)",
      },
      minHeight: {
        tab_height: "calc(100vh - 9rem)",
        xl_height: "calc(100vh - 6rem)",
      },
      maxWidth: {
        header_account: "13rem",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    // ...
  ],
};
