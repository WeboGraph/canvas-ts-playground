export type CanvasArgs = {
  selector: string,
  context_type?: '2d' | 'webgl',
  resolution?: [width: number, height: number],
}

export class Canvas {
  #ctx: RenderingContext | null;
  #element: HTMLCanvasElement;

  constructor({ selector, context_type, resolution }: CanvasArgs) {
    this.#element = document.querySelector(selector) as HTMLCanvasElement;
    this.#ctx = this.#element.getContext(context_type || '2d');

    if (!resolution) {
      const { width, height} = this.#element.getBoundingClientRect();
      resolution = [width, height];
    }

    this.#element.width = resolution[0];
    this.#element.height = resolution[1];

    console.log(this.#element.width)
  }

  draw(callback: Function): void {
    callback(this.#ctx);
  }
}

export class AnimationLoop {
  #canvas: Canvas;
  #frameDistance: number;
  #last: number = 0;
  #raf: number = 0;
  #animations: Function[] = [];

  constructor(canvas: Canvas, framerate: number) {
    this.#canvas = canvas;
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
      this.#animations.forEach(this.#canvas.draw);
    }

    this.#raf = requestAnimationFrame(this.run.bind(this));
  }
}
