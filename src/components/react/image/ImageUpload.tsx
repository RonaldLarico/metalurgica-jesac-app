import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import "../../../styles/global.css";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
);

interface Props {
  onUploaded?: () => void;
}

export default function ImageUpload({ onUploaded }: Props) {
  const [files, setFiles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="w-full max-w-xl mx-auto space-y-2 cursor-pointer">
      {error && (
        <div className="rounded-md bg-red-100 text-red-700 px-4 py-2 text-sm">
          {error}
        </div>
      )}

      <FilePond
        name="image"
        files={files}
        onupdatefiles={setFiles}
        allowMultiple
        maxFiles={5}
        acceptedFileTypes={[
          "image/png",
          "image/jpeg",
          "image/webp",
          "video/mp4",
          "image/gif",
        ]}
        fileValidateTypeLabelExpectedTypes="Solo imágenes PNG, JPG, WEBP, GIF o videos MP4"
        maxFileSize="100MB"
        labelMaxFileSizeExceeded="El archivo es muy pesado"
        labelMaxFileSize="Tamaño máximo: 100MB"
        labelIdle='Arrastra imágenes o <span class="filepond--label-action">haz click aquí</span>'
        server={{
          process: {
            url: "/api/image/upload",
            method: "POST",
            withCredentials: true,

            onload: (response) => response,

            onerror: () => {
              setError("Error al subir una imagen.");
              return null;
            },
          },
        }}
        onprocessfiles={() => {
          onUploaded?.();
          setFiles([]);
          setError(null);
        }}
        onwarning={(errorCode: any) => {
          switch (errorCode) {
            case "MAX_FILES_EXCEEDED":
              setError("Solo puedes subir un máximo de 5 imágenesss.");
              break;

            case "FILE_TYPE_NOT_ALLOWED":
              setError("Formato de archivo no permitido.");
              break;

            case "FILE_SIZE_TOO_LARGE":
              setError("El archivo supera el tamaño máximo permitido.");
              break;

            default:
              setError("Solo puedes subir un máximo de 5 imágenes.");
          }
        }}
        credits={false}
      />
    </div>
  );
}
