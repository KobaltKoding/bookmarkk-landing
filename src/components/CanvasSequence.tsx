import { useEffect, useRef } from "react";

const FRAME_COUNT = 240;

const CanvasSequence = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ── 1. Load all 240 images ── */
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    let ready = false;
    let currentFrame = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/sequence/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          ready = true;
          resize();
          draw(0);
        }
      };
      img.onerror = () => {
        loadedCount++;
      };
      images[i - 1] = img;
    }

    /* ── 2. Draw a frame on the canvas ── */
    function draw(index: number) {
      const img = images[index];
      if (!img || !img.complete || !canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // "contain" fit — image centered, aspect ratio preserved
      const scale = Math.min(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight
      );
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;
      ctx.drawImage(img, x, y, w, h);
    }

    /* ── 3. Map scroll position → frame index ── */
    function onScroll() {
      if (!ready) return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const maxScroll = docHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));
      const frame = Math.round(progress * (FRAME_COUNT - 1));

      if (frame !== currentFrame) {
        currentFrame = frame;
        requestAnimationFrame(() => draw(frame));
      }
    }

    /* ── 4. Keep canvas sized to window ── */
    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (ready) draw(currentFrame);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        background: "#050505",
        display: "block",
      }}
    />
  );
};

export default CanvasSequence;
