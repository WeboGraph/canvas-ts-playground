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

export function CenterCoordinateSystem(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
  const x = canvas.width / 2;
  const y = canvas.height / 2;

  context.translate(x, y);
}

export class AnimationLoop {
  #ctx: CanvasRenderingContext2D;
  #frameDistance: number;
  #last: number = 0;
  #raf: number = 0;
  #animations: Function[] = [];

  constructor(ctx: CanvasRenderingContext2D, framerate: number) {
    this.#ctx = ctx;
    this.#frameDistance = 1000 / framerate;
  }

  addAnimation(callback: Function): void {
    this.#animations.push(callback);
  }
  removeAnimation(callback: Function): void {
    const index = this.#animations.indexOf(callback);

    if (index > -1) {
      this.#animations.splice(index, 1);
    }
  }

  stop(): void {
    cancelAnimationFrame(this.#raf);
  }
  run(time: number = 0): void {
    const delta = time - this.#last;

    if (delta >= this.#frameDistance) {
      this.#last = time;
      this.#animations.forEach((cb: Function) => cb(this.#ctx));
    }

    this.#raf = requestAnimationFrame(this.run.bind(this));
  }
}
