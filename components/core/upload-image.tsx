import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"

import { cn } from "@/lib/utils"

import { Icons } from "../icons"
import { Button } from "../ui/button"

type Props = {
  label: string
  onImageChange?: (file: File) => void
  children?: ({
    file,
    fileUrl,
  }: {
    file: File
    fileUrl: string
  }) => React.ReactNode
}

const UploadImage = ({ label, onImageChange, children }: Props) => {
  const [filePreview, setFilePreview] = React.useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files

    onImageChange?.(acceptedFiles[0])

    // convert file to base64
    const reader = new FileReader()

    reader.onabort = () => console.log("file reading was aborted")
    reader.onerror = () => console.log("file reading has failed")

    reader.onload = () => {
      const binaryStr = reader.result
      setFilePreview(binaryStr as string)
    }

    reader.readAsDataURL(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      <div {...getRootProps()}>
        <span className="mb-1 block text-lg tracking-wide">{label}</span>

        <input {...getInputProps()} />
        <div
          className={cn(
            "grid h-20 place-content-center rounded-md border border-dashed text-center transition-all",
            isDragActive && "h-32"
          )}
        >
          <span className="opacity-80">
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <>
                <p>
                  Drag &apos;n&apos; drop some files here, or click to select
                  files
                </p>
                <i>allowed files are png and jpg max size is 5mb</i>
              </>
            )}
          </span>
        </div>

        {children?.({ file: new File([], ""), fileUrl: filePreview || "" })}
      </div>

      {filePreview && (
        <div className="relative mt-2">
          <Button
            variant="link"
            className="absolute right-2 top-2 bg-background/95 "
            onClick={() => setFilePreview(null)}
          >
            <Icons.trash className="h-4 w-4" />
          </Button>
          <img src={filePreview} alt="preview" />
        </div>
      )}
    </>
  )
}

export default UploadImage
