import { useNavigation } from "@react-navigation/native";
import React, { memo, useCallback, useMemo } from "react";
import { useWindowDimensions, Linking, TextProps } from "react-native";
import Html, {
  defaultSystemFonts,
  defaultHTMLElementModels,
  MixedStyleRecord,
} from "react-native-render-html";

type RenderHTMLProps = {
  html: string;
  onLinkPress?: () => void;
  defaultTextProps?: TextProps;
  embeds?: boolean;
  onOpenBrowser?: () => void;
};

const RenderHTML = ({
  html,
  onLinkPress,
  defaultTextProps = {},
  embeds,
  onOpenBrowser,
}: RenderHTMLProps) => {
  const { width } = useWindowDimensions();
  const handleLinkPress = useCallback(
    (e, href) => {
      e.stopPropagation();
      if (embeds) return;
      onLinkPress?.();
      Linking.openURL(href);
    },
    [embeds]
  );
  const renderersProps = useMemo(
    () => ({
      a: {
        onPress: handleLinkPress,
      },
    }),
    [handleLinkPress]
  );
  const tagsStyles = useMemo<MixedStyleRecord>(
    () => ({
      a: {
        color: "#0584FE",
        textDecorationLine: "none",
      },
      h1: {
        fontSize: 26,
        lineHeight: 34,
      },
      h2: {
        fontSize: 24,
        lineHeight: 30,
      },
      h3: {
        fontSize: 22,
        lineHeight: 26,
      },
      h4: {
        fontSize: 20,
        lineHeight: 22,
      },
    }),
    []
  );
  const classesStyles = useMemo<MixedStyleRecord>(
    () => ({
      "message-text": {
        whiteSpace: "pre",
        color: "#000000",
        fontSize: 15,
        lineHeight: 24,
        marginTop: 5,
      },
      "mention-string": {
        color: "#0584FE",
        textDecorationLine: "none",
      },
    }),
    []
  );
  const systemFonts = useMemo(() => [...defaultSystemFonts], []);
  return (
    <Html
      systemFonts={systemFonts}
      contentWidth={width}
      source={{ html }}
      tagsStyles={tagsStyles}
      defaultTextProps={{ ...defaultTextProps, allowFontScaling: false }}
      renderersProps={renderersProps}
      classesStyles={classesStyles}
      ignoredDomTags={["t"]}
      customHTMLElementModels={{
        title: defaultHTMLElementModels.span,
      }}
    />
  );
};

export default memo(RenderHTML);
