type ImagePreviewProps = {
    src: string;
    alt?: string;
    onClick: (event: React.MouseEvent) => void;
};

import { TrashIcon } from "@heroicons/react/24/outline";

function ImagePreview(props: ImagePreviewProps) {
    return (
        <div className="w-full h-full border-[1px] border-zinc-700 rounded-lg shadow-lg overflow-hidden relative">
            <button
                className="flex justify-center items-center absolute top-0 right-0 bg-zinc-800 hover:bg-red-700 hover:text-zinc-800 rounded-xl p-4 m-2 border-[1px] border-zinc-700 transition"
                onClick={props.onClick}
            >
                <TrashIcon className="h-6 w-6 text-white" />
            </button>
            <img src={props.src} alt={props.alt} className="" />
        </div>
    );
}

export default ImagePreview;
