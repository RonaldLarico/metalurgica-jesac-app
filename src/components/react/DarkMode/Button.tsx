import { useRef, type FC } from "react";

interface ActionButtonProps {
  text: string;
  color?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: string;
  fileInput?: boolean;
  onFileChange?: (file: File) => void;
  accept?: string;
  loading?: boolean;
  disabled?: boolean;
}

const ActionButton: FC<ActionButtonProps> = ({
  text,
  color = `
    bg-transparent
    border border-(--color-secondary)/50
    text-(--color-secondary)
    hover:bg-(--color-secondary)/30
  `,
  onClick,
  icon,
  fileInput = false,
  onFileChange,
  accept = "image/*",
  loading,
  disabled,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      {fileInput && (
        <input
          type="file"
          accept={accept}
          hidden
          ref={fileInputRef}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            e.stopPropagation();
            const file = e.target.files?.[0];
            if (file && onFileChange) onFileChange(file);
          }}
        />
      )}

      <button
        onClick={(e) => {
          if (fileInput) e.stopPropagation();
          if (fileInput) fileInputRef.current?.click();
          else if (onClick) onClick(e);
        }}
        disabled={disabled || loading}
        className={`
          cursor-pointer
          px-2 py-1
          text-sm font-medium
          border
          transition-colors duration-200
          inline-flex items-center gap-1
          disabled:opacity-50
          disabled:cursor-not-allowed
          ${color}
        `}
      >
        {loading ? (
          <span className="flex items-center gap-1 text-(--color-primary)">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Actualizando…
          </span>
        ) : (
          <>
            {icon && <span>{icon}</span>}
            {text}
          </>
        )}
      </button>
    </>
  );
};

export default ActionButton;
