import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import Quill, { QuillOptions } from "quill";
import { Delta, Op } from "quill/core";
import { Button } from "@/components/ui/button";
import { PiTextAa } from "react-icons/pi";
import { ImageIcon, Smile, X } from "lucide-react";
import { MdSend } from "react-icons/md";
import Hint from "@/components/Hint";
import { cn } from "@/lib/utils";

import "quill/dist/quill.snow.css";
import EmojiPopover from "./EmojiPopover";
import Image from "next/image";

type EditorValue = {
  image: File | null;
  body: string;
};

interface EditorProps {
  variant?: "create" | "update";
  onSubmit: ({ image, body }: EditorValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  innerRef?: RefObject<Quill | null>;
}

const Editor = ({
  variant = "create",
  onSubmit,
  onCancel,
  placeholder = "Share something with your team...",
  defaultValue = [],
  disabled = false,
  innerRef,
}: EditorProps) => {
  const submitRef = useRef(onSubmit);
  const disabledRef = useRef(disabled);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const imageRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
  const [isToolbarVisible, setToolbarVisible] = useState<boolean>(true);

  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    disabledRef.current = disabled;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["link", "blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ direction: "rtl" }, { direction: "ltr" }],
          [{ align: [] }],
          [{ color: [] }, { background: [] }],
          [{ size: ["small", false, "large", "huge"] }],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                const text = quill.getText();
                const addedImage = imageRef.current?.files![0] || null;

                const isEmpty =
                  !addedImage &&
                  text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

                if (isEmpty) return;

                const body = JSON.stringify(quill.getContents());
                submitRef.current?.({
                  image: addedImage,
                  body,
                });

                setImage(null);
                imageRef.current!.value = "";
              },
            },
            shift_enter: {
              key: "Enter",
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n");
              },
            },
          },
        },
      },
    };

    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;
    quillRef.current.focus();

    if (innerRef) {
      innerRef.current = quill;
    }

    quill.setContents(defaultValueRef.current);
    setText(quill.getText());

    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });

    return () => {
      quill.off(Quill.events.TEXT_CHANGE);
      if (container) {
        container.innerHTML = "";
      }
      if (quillRef.current) {
        quillRef.current = null;
      }
      if (innerRef) {
        innerRef.current = null;
      }
    };
  }, [innerRef]);

  const onEmojiSelect = (emoji: string) => {
    const quill = quillRef.current;
    quill?.insertText(quill.getSelection()?.index || 0, emoji);
  };

  const toggleToolbar = () => {
    setToolbarVisible((prev) => !prev);
    const toolbarElement = containerRef.current?.querySelector(".ql-toolbar");
    if (toolbarElement) {
      toolbarElement.classList.toggle("hidden");
    }
  };

  const isEmpty = !image && text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

  return (
    <div className="flex flex-col">
      <input
        type="file"
        ref={imageRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => setImage(e.target.files![0])}
      />
      <div
        className={cn(
          "flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white mb-2",
          disabled && "opacity-50"
        )}
      >
        <div ref={containerRef} className="h-full ql-custom" />
        {!!image && (
          <div className="p-2">
            <div className="relative size-[62px] flex items-center justify-center group/image">
              <Hint label="Remove Image">
                <button
                  onClick={() => {
                    setImage(null);
                    imageRef.current!.value = "";
                  }}
                  className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[4] border-2 border-white items-center justify-center"
                >
                  <X className="size-3.5" />
                </button>
              </Hint>
              <Image
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                fill
                className="rounded-xl overflow-hidden border object-contain"
              />
            </div>
          </div>
        )}
        <div className="flex px-2 pb-2 z-[5]">
          <Hint
            label={isToolbarVisible ? "Hide Formatting" : "Show Formatting"}
          >
            <Button
              disabled={disabled}
              size="iconSm"
              variant="ghost"
              onClick={toggleToolbar}
            >
              <PiTextAa className="size-4" />
            </Button>
          </Hint>
          <EmojiPopover onEmojiSelect={onEmojiSelect}>
            <Button disabled={disabled} size="iconSm" variant="ghost">
              <Smile className="size-4" />
            </Button>
          </EmojiPopover>
          {variant === "create" && (
            <Hint label="Image">
              <Button
                disabled={disabled}
                size="iconSm"
                variant="ghost"
                onClick={() => imageRef.current?.click()}
              >
                <ImageIcon className="size-4" />
              </Button>
            </Hint>
          )}
          {variant === "update" && (
            <div className="ml-auto flex items-center gap-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onCancel}
                disabled={disabled}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  onSubmit({
                    image,
                    body: JSON.stringify(quillRef.current?.getContents()),
                  });
                }}
                disabled={disabled || isEmpty}
                className="bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              >
                Save
              </Button>
            </div>
          )}
          {variant === "create" && (
            <Button
              size="iconSm"
              disabled={disabled || isEmpty}
              onClick={() => {
                onSubmit({
                  image,
                  body: JSON.stringify(quillRef.current?.getContents()),
                });
              }}
              className={cn(
                "ml-auto",
                isEmpty
                  ? "bg-white hover:bg-white text-muted-foreground"
                  : "bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              )}
            >
              <MdSend className="size-4" />
            </Button>
          )}
        </div>
        {variant === "create" && (
          <div
            className={cn(
              "px-2 pb-1 text-[10px] text-muted-foreground flex justify-end opacity-0 transition",
              !isEmpty && "opacity-100"
            )}
          >
            <kbd>
              <strong>Shift + Enter</strong> To Send
            </kbd>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
