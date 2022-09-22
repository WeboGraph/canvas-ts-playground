interface CanvasAndContext {
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
}

type CanvasResolution = [width: number, height: number];

export function InitCanvasAndContext(selector: string, [width, height]: CanvasResolution): CanvasAndContext {
  const canvas: HTMLCanvasElement = document.querySelector(selector) as HTMLCanvasElement;
  const context: RenderingContext | null = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  return { canvas, context } as CanvasAndContext;
}

export function animationLoop(loop: FrameRequestCallback): void {
  loop(0);
  requestAnimationFrame(loop);
}
