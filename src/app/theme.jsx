import { extendTheme } from "@chakra-ui/react";

const PRIMARY_COLOR = "linear-gradient(135deg, #171b29 0%, #8f8570 58%, #b7a789 100%)";
const SECONDARY_COLOR = "#f8f6f1";

const theme = {
  colors: {
    primary: PRIMARY_COLOR,
    gradient: PRIMARY_COLOR,
    secondary: "#ABABAB",
    _white: "#FFFFFF",
    _black: "#171b29",
    _darkgray: "#292929",
    _gray: "#5f5f5f",
    _lightgray: "#ECE7DF",
    _lightestgray: "#F7F7F7",
    _green: "#157c00",
    _lightgreen: "#eeffeb",
    _red: "#E53E3E",
    _lightred: "#FAEAEA",
    _orange: "#FF9600",
    _lightorange: "#d7c39a",
    _purple: "#8f8570",
    _lightpurple: "#f3efe6",
    _blue: "#171b29",
    _lightblue: "#f5f2eb",
    blue: {
      50: "#f4f6fb",
      100: "#e8ecf4",
      200: "#d1d9e7",
      300: "#aab7cf",
      400: "#7f91b3",
      500: "#171b29",
      600: "#131723",
      700: "#0f1420",
      800: "#0a0f18",
      900: "#05070f",
    },
    purple: {
      50: "#faf8f2",
      100: "#f3efe6",
      200: "#e8e0d1",
      300: "#d7ccb8",
      400: "#c3b290",
      500: "#8f8570",
      600: "#7a705d",
      700: "#615846",
      800: "#484133",
      900: "#302b22",
    },
    primaryGradient: {
      start: PRIMARY_COLOR,
      end: SECONDARY_COLOR,
    },
  },
  fonts: {
    body: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
    heading: "Playfair Display, Georgia, Times New Roman, serif",
    text: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
  },
  styles: {
    global: {
      "*": {
        borderColor: "_lightgray",
      },
    },
  },
  components: {
    Drawer: {
      variants: {
        alwaysOpen: {
          parts: ["dialog, dialogContainer"],
          dialog: {
            pointerEvents: "auto",
          },
          dialogContainer: {
            pointerEvents: "none",
          },
        },
      },
    },
  },
  breakpoints: {
    md: "62em",
  },
  shadows: {
    outline: "0 0 0 3px rgba(23, 27, 41, 0.12)",
  },
};

const extendedTheme = extendTheme(theme);

export default extendedTheme;
