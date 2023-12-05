import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {
    // paddingHorizontal: 15,
    // paddingVertical: 12,
  },
  container: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#242424",
  },
  contentWrap: {
    marginLeft: 10,
    flex: 1,
  },
  nameWrap: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 5,
  },
  name: {
    fontWeight: "700",
    color: "#ffffff",
    fontSize: 15,
    lineHeight: 18,
  },
  username: {
    color: "#acacac",
    fontSize: 15,
    lineHeight: 18,
  },
  reactions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  reactionItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  reactionCount: {
    color: "#616164",
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 16,
    marginLeft: 10,
  },
  replies: {
    paddingLeft: 15,
  },
});

export default styles;
