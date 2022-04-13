module.exports = {
  content: ["./src/pages/**/*.{js,jsx}", "./src/components/**/*.{js,jsx}"],
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
        shadow: "#919295",
      },
      width: {
        'input': '19rem',
      },
      minHeight: {
        'content': 'calc(100vh - 144px)',
      }
    },
  },
};
