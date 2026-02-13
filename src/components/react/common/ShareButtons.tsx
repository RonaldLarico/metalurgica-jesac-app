import React, { useState } from "react";
import {
  Facebook,
  LinkedIn,
  Telegram,
  Share,
  WhatsAppIcon,
  XIcon,
} from "../../../icons/icon";
import type { ShareButtonsProps, SharePlatform } from "./type";
import CopyButton from "./CopyButton";

const ShareButtons: React.FC<ShareButtonsProps> = ({
  url,
  title = "",
  targetId,
  type,
}) => {
  const isService = type === "SERVICE";

  const [showIcons, setShowIcons] = useState(false);

  const logShare = async (platform: SharePlatform) => {
    try {
      await fetch("/api/blog/share-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          targetId,
          type,
        }),
      });
    } catch (error) {
      console.error("Error guardando log de share:", error);
    }
  };

  const buttonSize = isService ? "w-5 h-5" : "w-10 h-10";
  const iconSize = "w-5 h-5";

  const baseIconClass = `
    flex items-center justify-center 
    ${buttonSize} 
    rounded-lg 
    transition-all duration-200 ease-in-out 
    hover:scale-125
  `;

  const getButtonClass = (brandClasses: string) => {
    if (isService) {
      return `
      ${baseIconClass}
      bg-gray-100 hover:bg-gray-200 
      dark:bg-gray-800 dark:hover:bg-gray-700
      text-gray-700 dark:text-gray-200
    `;
    }

    return `
    ${baseIconClass} 
    ${brandClasses} 
    text-white 
    shadow-md hover:shadow-xl
  `;
  };

  const handleShareClick = (
    e: React.MouseEvent,
    platform: SharePlatform,
    href: string,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    logShare(platform);
    window.open(href, "_blank");
  };

  return (
    <div className="grid mb-6 gap-3 relative">
      <div
        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold text-sm cursor-pointer"
        onClick={(e) => {
          if (isService) {
            e.stopPropagation();
            e.preventDefault();
            setShowIcons((prev) => !prev);
          }
        }}
      >
        <Share className="w-5 h-5" />
        Compartir
      </div>
      {(!isService || showIcons) && (
        <div className="flex gap-3">
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              title,
            )}%20${encodeURIComponent(url)}`}
            onClick={(e) =>
              handleShareClick(e, "WHATSAPP", e.currentTarget.href)
            }
            className={getButtonClass("bg-green-500 hover:bg-green-600")}
          >
            <WhatsAppIcon className={iconSize} />
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              url,
            )}`}
            onClick={(e) =>
              handleShareClick(e, "FACEBOOK", e.currentTarget.href)
            }
            className={getButtonClass("bg-blue-600 hover:bg-blue-700")}
          >
            <Facebook className={iconSize} />
          </a>

          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              url,
            )}&title=${encodeURIComponent(
              title,
            )}&summary=${encodeURIComponent(title)}`}
            onClick={(e) =>
              handleShareClick(e, "LINKEDIN", e.currentTarget.href)
            }
            className={getButtonClass("bg-blue-500 hover:bg-blue-600")}
          >
            <LinkedIn className={iconSize} />
          </a>

          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(
              url,
            )}&text=${encodeURIComponent(title)}`}
            onClick={(e) =>
              handleShareClick(e, "TELEGRAM", e.currentTarget.href)
            }
            className={getButtonClass("bg-blue-400 hover:bg-blue-500")}
          >
            <Telegram className={iconSize} />
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              title,
            )}&url=${encodeURIComponent(url)}`}
            onClick={(e) => handleShareClick(e, "X", e.currentTarget.href)}
            className={getButtonClass("bg-black hover:bg-gray-900")}
          >
            <XIcon className={iconSize} />
          </a>

          <CopyButton
            url={url}
            targetId={targetId}
            logShare={logShare}
            type={type}
          />
        </div>
      )}
    </div>
  );
};

export default ShareButtons;
