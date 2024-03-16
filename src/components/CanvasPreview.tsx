import { useRef, useEffect } from "react";

type CanvasPreviewProps = {
    src: string[] | null;
};

function CanvasPreview(props: CanvasPreviewProps) {
    const { src } = props;
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas || !src) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear previous drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate image height and canvas height based on number of images

        // Loop through each image URL and draw it onto the canvas
        src.forEach((url, index) => {
            const imageHeight = 1080;
            canvas.height = src.length * imageHeight;

            const img = new Image();
            img.onload = () => {
                // Calculate position to draw the image
                const x = 0;
                const y = index * imageHeight;

                // Draw the image
                ctx.drawImage(img, x, y, canvas.width, imageHeight);
            };
            img.src = url;
        });
    }, [src]);
    return (
        <div className="">
            <canvas ref={ref} width={1980} className="max-w-lg" />
        </div>
    );
}

export default CanvasPreview;
