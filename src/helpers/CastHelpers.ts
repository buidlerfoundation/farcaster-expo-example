import { ICast, ICastV1 } from "@/models";

export const regexUrl =
  /(\b(?:https?:\/\/)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,256}((?:\/\S*)?(?:\?\S*)?\b)?([&/#]*)?)/gim;

export const insertHttpIfNeed = (str?: string) => {
  if (!str) return "";
  if (str.includes("http")) {
    return str;
  }
  return `https://${str}`;
};

export const normalizeContentUrl = (string: string, boldUrl?: string) => {
  return string
    .split(" ")
    .map((str) => {
      if (str.includes("..") || (str.includes("@") && !str.includes("/")))
        return str;
      const href = insertHttpIfNeed(str.match(regexUrl)?.[0]);
      return str.replace(
        regexUrl,
        `<a href='${insertHttpIfNeed(
          str.match(regexUrl)?.[0]
        )}' class='mention-string ${
          href === boldUrl ? "text-smb" : ""
        }' target='_blank' onclick='event.stopPropagation();'>$1</a>`
      );
    })
    .join(" ");
};

export const normalizeContentCast = (cast: ICast) => {
  if (!cast.text) return "";
  let res = cast.text
    .split("\n")
    .map((str) => normalizeContentUrl(str))
    .join("\n");
  cast.mentioned_profiles.forEach((el) => {
    const regex = new RegExp(`@${el.username}`, "gim");
    res = res.replace(
      regex,
      `<a href='https://warpcast.com/${el.username}' class="mention-string" target='_blank' onclick='event.stopPropagation();'>@${el.username}</a>`
    );
  });
  return `<div class='message-text'>${res}</div>`;
};

export const normalizeContentCastV1 = (cast: ICastV1) => {
  if (!cast.text) return "";
  let res = cast.text
    .split("\n")
    .map((str) => normalizeContentUrl(str))
    .join("\n");
  cast.mentionedProfiles?.forEach((el) => {
    const regex = new RegExp(`@${el.username}`, "gim");
    res = res.replace(
      regex,
      `<a href='https://warpcast.com/${el.username}' class="mention-string" target='_blank' onclick='event.stopPropagation();'>@${el.username}</a>`
    );
  });
  return `<div class='message-text'>${res}</div>`;
};
