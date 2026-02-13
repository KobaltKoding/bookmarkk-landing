import { useEffect, useRef } from "react";

const FRAME_COUNT = 80;

const CanvasSequence = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // Optimize for opaque background
    if (!ctx) return;

    // High quality smoothing as requested
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
      img.decoding = "sync"; // Require synchronous decoding

      // Prioritize pre-warming frames 20 through 60 (The Fan Peak)
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

      // Maintain 16:9 aspect ratio scaling within the canvas
      const imgAspect = 16 / 9;
      const canvasAspect = width / height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasAspect > imgAspect) {
        // Canvas is wider than 16:9
        drawHeight = height;
        drawWidth = height * imgAspect;
        offsetX = (width - drawWidth) / 2;
        offsetY = 0;
      } else {
        // Canvas is narrower than 16:9
        drawWidth = width;
        drawHeight = width / imgAspect;
        offsetX = 0;
        offsetY = (height - drawHeight) / 2;
      }

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    /* ── 3. Map scroll position → frame index (Linear Interpolation) ── */
    function onScroll() {
      if (!ready) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight;
      const maxScroll = docHeight - window.innerHeight;

      if (maxScroll <= 0) return;

      const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));

      // Linear mapping with no smoothing/easing as requested
      const frameIndex = Math.floor(progress * (FRAME_COUNT - 1));

      if (frameIndex !== currentFrameIndex) {
        currentFrameIndex = frameIndex;
        // Use requestAnimationFrame for smooth UI interaction
        requestAnimationFrame(() => draw(frameIndex));
      }
    }

    /* ── 4. Keep canvas sized to window ── */
    function handleResize() {
      if (!canvas || !ctx) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Re-apply smoothing after resize
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
        pointerEvents: "none"
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          // Technical requirements for high-fidelity and performance:
          imageRendering: "-webkit-optimize-contrast",
          willChange: "transform",
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden"
        }}
        className="aspect-video"
      />
    </div>
  );
};

export default CanvasSequence;
