"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 117; // 40 + 77 frames

const CanvasSequence = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [opacity, setOpacity] = useState(0.4);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        // Apply crisp-edges for pixel art sharp lines as requested
        canvas.style.imageRendering = "crisp-edges"; // FireFox
        // @ts-ignore
        canvas.style.imageRendering = "-webkit-optimize-contrast"; // Chrome/Safari

        ctx.imageSmoothingEnabled = false;

        /* ── 1. Load all 117 images ── */
        const images: HTMLImageElement[] = [];
        let loadedCount = 0;
        let ready = false;

        // We'll track the last drawn frame to optimize
        let lastFrameIndex = -1;

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.decoding = "sync";

            // Priority loading for the first chunk and the transition area
            if (i <= 45) {
                img.fetchPriority = "high";
            }

            // Determine source based on frame number
            // Frames 1-40: Perspective Shift
            // Frames 41-117: High-Density Fan (mapped to 1-77)
            if (i <= 40) {
                img.src = `/assets/Perspective Shift/ezgif-frame-${String(i).padStart(3, "0")}.png`;
            } else {
                const fanIndex = i - 40;
                img.src = `/assets/High-Density Fan/ezgif-frame-${String(fanIndex).padStart(3, "0")}.png`;
            }

            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    ready = true;
                    handleResize();
                    // Initial draw
                    draw(0);
                }
            };

            images[i - 1] = img;
        }

        /* ── 2. Draw logic with centering and containment ── */
        function drawImageCentered(img: HTMLImageElement, globalAlpha = 1) {
            if (!img || !img.complete || !canvas || !ctx) return;

            const { width, height } = canvas;
            // Assuming 1920x1080 source aspect ratio (16:9)
            const imgAspect = 16 / 9;
            const canvasAspect = width / height;

            let drawWidth, drawHeight, offsetX, offsetY;

            // "Cover" fit logic
            if (canvasAspect > imgAspect) {
                drawWidth = width;
                drawHeight = width / imgAspect;
                offsetX = 0;
                offsetY = (height - drawHeight) / 2;
            } else {
                drawHeight = height;
                drawWidth = height * imgAspect;
                offsetX = (width - drawWidth) / 2;
                offsetY = 0;
            }

            ctx.globalAlpha = globalAlpha;
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            ctx.globalAlpha = 1.0; // Reset
        }

        function draw(index: number, progress: number = 0) {
            if (!ready || !ctx) return;

            // Clear only if needed (though we usually overdraw)
            // ctx.fillStyle = "#FEF3B3";
            // ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

            // Cross-fade Logic around Frame 40 (Index 39 -> 40)
            // We want a smooth blend when we are essentially "between" these frames visually.
            // Since we drive by discrete frames usually, let's check if we are at the boundary.

            // Actually, simply drawing the target frame is usually enough for rapid scrolling,
            // but for the "handoff", let's see if we are transitioning from 39 to 40.

            // Simplification: just draw the current frame. 
            // The "0.2s crossfade" requested by user implies blending.
            // Let's implement blending if the calculated float frame is close to the boundary.
            // Frame 40 is index 39. Frame 41 is index 40.

            // Transition zone: slightly before index 40 to slightly after?
            // User said: "0.2s cross-fade ... between Frame 40 and 41".

            // Calculate a "sub-frame" progress to allow blending
            const totalFrames = FRAME_COUNT - 1;
            const floatIndex = progress * totalFrames;

            // If we are exactly between index 39 and 40 (roughly 39.5), blend them.
            // Let's define a blend range: 39.0 to 40.0.

            if (floatIndex > 39 && floatIndex < 40) {
                // We are transitioning from Perspective Shift end (39) to Fan start (40)
                const blendFactor = floatIndex - 39; // 0.0 to 1.0

                // Draw Frame 40 (Index 39) as base
                drawImageCentered(images[39], 1);

                // Draw Frame 41 (Index 40) on top with opacity
                drawImageCentered(images[40], blendFactor);

            } else {
                // Standard draw
                // Ensure we clamp index
                const safeIndex = Math.min(Math.max(Math.round(floatIndex), 0), FRAME_COUNT - 1);
                drawImageCentered(images[safeIndex]);
            }
        }

        /* ── 3. Scroll Sync ── */
        let ticking = false;

        function updateAnimation() {
            if (!ready) {
                ticking = false;
                return;
            }

            // Map animation to the total height of Hero + ProblemSolution + HowItWorks + Quiz + Stats.
            // Hero is 300vh. Other sections are roughly ~800-1000px each.
            // Let's estimate the total "active" scroll distance for the animation to be around 400vh - 500vh to cover the flow.
            // If we want it to span ALL these components, we can just map it to a large fixed scroll range, 
            // or dynamically calculate it if we had refs (harder here).
            // Let's try mapping to 500vh (approx 5 * window height).

            const scrollY = window.scrollY;
            const viewHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const maxScroll = docHeight - viewHeight;

            // Define segment: Hero (approx 300vh) -> Frames 0-40
            // Rest of page -> Frames 40-117
            // Note: Hero is min-h-[300vh], but let's treat the first ~3 screens of scroll as the "Hero Phase"
            const heroScrollLimit = viewHeight * 3;

            let targetFrame = 0;

            if (scrollY <= heroScrollLimit) {
                // Phase 1: Perspective Shift (0-40)
                const p = scrollY / heroScrollLimit;
                targetFrame = p * 40;
            } else {
                // Phase 2: Fan Out (40-117)
                const scrollPastHero = scrollY - heroScrollLimit;
                const remainingScroll = maxScroll - heroScrollLimit;

                // Safety check to avoid divide by zero if page is short
                if (remainingScroll > 0) {
                    const p = scrollPastHero / remainingScroll;
                    targetFrame = 40 + (p * (117 - 40));
                } else {
                    targetFrame = 117;
                }
            }

            // Convert back to 0-1 progress for the draw function
            const progress = Math.max(0, Math.min(1, targetFrame / (FRAME_COUNT - 1)));

            // Opacity: User requested "background video is too bright. Reduce transparency".
            // We'll set global alpha in draw, or just opacity of container.
            // Let's drop container opacity to 0.4 as a baseline for "translucent" look.
            setOpacity(0.4);

            draw(0, progress);

            ticking = false;
        }

        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(updateAnimation);
                ticking = true;
            }
        }

        /* ── 4. Resize Handling ── */
        function handleResize() {
            if (!canvas || !ctx) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Re-apply crisp settings after resize reset
            ctx.imageSmoothingEnabled = false;
            canvas.style.imageRendering = "crisp-edges";
            // @ts-ignore
            canvas.style.imageRendering = "-webkit-optimize-contrast";

            if (ready) {
                // Force a redraw
                window.requestAnimationFrame(() => updateAnimation());
            }
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
                zIndex: -1, // Fixed behind everything 
                background: "#FEF3B3", // Base color
                overflow: "hidden",
                pointerEvents: "none",
                opacity: opacity // Apply requested opacity reduction
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    willChange: "transform", // Performance hint
                }}
            />
            {/* Global Gradient Orbs - Retaining the "Initial Blend" throughout the scroll */}
            <div className="absolute top-1/4 left-[15%] w-[35rem] h-[35rem] bg-[#1D59BB]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-[15%] w-[35rem] h-[35rem] bg-[#75BAFF]/10 rounded-full blur-[120px] pointer-events-none" />
        </div>
    );
};

export default CanvasSequence;
