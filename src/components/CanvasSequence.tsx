"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 80;

const CanvasSequence = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        /* ── 1. Load all 80 images ── */
        const images: HTMLImageElement[] = [];
        let loadedCount = 0;
        let ready = false;
        let currentFrameIndex = 0;

        const FRAME_BASE_URL = "/assets/book-animation/frame-";

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.decoding = "sync";

            if (i >= 20 && i <= 60) {
                img.fetchPriority = "high";
            }

            img.src = `${FRAME_BASE_URL}${String(i).padStart(3, "0")}.jpg`;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    ready = true;
                    handleResize();
                    draw(0);
                }
            };

            images[i - 1] = img;
        }

        /* ── 2. Draw a frame on the canvas ── */
        function draw(index: number) {
            const img = images[index];
            if (!img || !img.complete || !canvas || !ctx) return;

            const { width, height } = canvas;
            const imgAspect = 16 / 9;
            const canvasAspect = width / height;

            let drawWidth, drawHeight, offsetX, offsetY;

            // Always match width to ensure full horizontal coverage
            drawWidth = width;
            drawHeight = width / imgAspect;
            offsetX = 0;
            offsetY = (height - drawHeight) / 2;

            ctx.fillStyle = "#050505";
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }

        /* ── 3. Refined rAF Scroll Sync ── */
        let ticking = false;
        let latestScrollY = 0;

        function updateAnimation() {
            if (!ready) {
                ticking = false;
                return;
            }

            const docHeight = document.documentElement.scrollHeight;
            const maxScroll = docHeight - window.innerHeight;

            if (maxScroll <= 0) {
                ticking = false;
                return;
            }

            const progress = Math.max(0, Math.min(1, latestScrollY / maxScroll));
            const frameIndex = Math.floor(progress * (FRAME_COUNT - 1));

            if (frameIndex !== currentFrameIndex) {
                currentFrameIndex = frameIndex;
                draw(frameIndex);
            }

            // Fade in canvas after hero section
            const heroEnd = window.innerHeight * 0.3;
            const fadeRange = window.innerHeight * 0.5;
            const fadeProgress = Math.max(0, Math.min(1, (latestScrollY - heroEnd) / fadeRange));
            setOpacity(fadeProgress);

            ticking = false;
        }

        function onScroll() {
            latestScrollY = window.scrollY || document.documentElement.scrollTop;

            if (!ticking) {
                window.requestAnimationFrame(updateAnimation);
                ticking = true;
            }
        }

        /* ── 4. Keep canvas sized to window ── */
        function handleResize() {
            if (!canvas || !ctx) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            if (ready) draw(currentFrameIndex);
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 0,
                background: "#050505",
                overflow: "hidden",
                pointerEvents: "none",
                contain: "paint",
                willChange: "transform",
                transform: "translate3d(0,0,0)",
                opacity: opacity,
                transition: "opacity 0.15s ease-out"
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    // imageRendering: "pixelated",
                    willChange: "transform",
                    transform: "translate3d(0,0,0)",
                    backfaceVisibility: "hidden"
                }}
                className="aspect-video"
            />
            {/* Dark overlay for text readability */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0, 0, 0, 0.5)",
                    pointerEvents: "none"
                }}
            />
        </div>
    );
};

export default CanvasSequence;
