import Modal from "./Modal";
import ActionButton from "./Button";

export default function ConfirmModal({
  open,
  message,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal open={open} onClose={onCancel}>
      <div
        className="
          max-w-sm mx-auto p-6
          border border-(--card-border)
          bg-(--login-bg)
          text-center
        "
      >
        <p
          className="
            mb-6 text-sm
            text-slate-700 dark:text-slate-200
          "
        >
          {message}
        </p>

        <div className="flex justify-center gap-4">
          <ActionButton
            text="Cancelar"
            color="
              bg-transparent
              border border-(--card-border)
              text-(--color-primary)
              hover:bg-(--color-primary)/10
            "
            onClick={onCancel}
          />

          <ActionButton
            text="Eliminar"
            color="
              bg-transparent
              border border-(--color-secondary)
              text-(--color-secondary)
              hover:bg-(--color-secondary)
              hover:text-black
            "
            onClick={onConfirm}
          />
        </div>
      </div>
    </Modal>
  );
}
