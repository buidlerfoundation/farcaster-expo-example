import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  mask: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: "rgba(0, 0, 0, .6)",
    padding: 10,
    justifyContent: "flex-end",
  },
  tokenId: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
    alignSelf: "flex-end",
  },
  name: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default styles;
