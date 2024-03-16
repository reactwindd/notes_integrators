import { useState } from "react";
import ImagePreview from "./components/ImagePreview";
import CanvasPreview from "./components/CanvasPreview";

function App() {
    const [urls, setURLs] = useState<string[] | null>(null);

    function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (files) {
            const fileArray = Array.from(files);
            Promise.all(
                fileArray.map((file) => URL.createObjectURL(file))
            ).then((newUrls) =>
                setURLs((urls) => [...(urls ?? []), ...newUrls])
            );
        }
    }

    function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
        const files = event.clipboardData.files;
        if (files) {
            const fileArray = Array.from(files);
            Promise.all(
                fileArray.map((file) => URL.createObjectURL(file))
            ).then((newUrls) => {
                setURLs((urls) => [...(urls ?? []), ...newUrls]);
            });
        }
    }

    function handleDrop(event: React.DragEvent<HTMLDivElement>) {
        event.stopPropagation();
        event.preventDefault();
        const files = event.dataTransfer.files;

        if (files) {
            const fileArray = Array.from(files);
            if (
                files[0].name.split(".").pop() != "png" &&
                files[0].name.split(".").pop() != "jpg" &&
                files[0].name.split(".").pop() != "jpeg"
            ) {
                console.log(files[0].name.split(".").pop());
                return alert("Only PNG and JPG files are allowed");
            }

            Promise.all(
                fileArray.map((file) => URL.createObjectURL(file))
            ).then((newUrls) => {
                setURLs((urls) => [...(urls ?? []), ...newUrls]);
            });
        }
    }

    return (
        <div
            onPaste={handlePaste}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="flex flex-col gap-4 p-8"
        >
            <form>
                <div className="flex justify-center items-center rounded-xl bg-zinc-800 border-zinc-700 border-[1px] p-8">
                    <label htmlFor="upload">
                        <span className="px-4 py-2 bg-zinc-900 rounded-lg border-zinc-700 border-[1px]">
                            Ctrl
                        </span>{" "}
                        +{" "}
                        <span className="px-4 py-2 bg-zinc-900 rounded-lg border-zinc-700 border-[1px]">
                            V
                        </span>{" "}
                        to Upload
                    </label>
                    <input
                        type="file"
                        name="upload"
                        id="upload"
                        accept="image/png, image/jpeg"
                        multiple
                        onChange={handleUpload}
                        className="hidden"
                    />
                </div>
            </form>
            <div className="grid grid-cols-3 gap-4">
                {urls ? (
                    urls.map((url, index) => (
                        <ImagePreview
                            key={index}
                            src={url}
                            onClick={(e) => {
                                e.preventDefault();

                                setURLs(
                                    urls
                                        .slice(0, index)
                                        .concat(urls.slice(index + 1))
                                );
                            }}
                        />
                    ))
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
            <CanvasPreview src={urls} />
        </div>
    );
}

export default App;
