import './style.css';
import { InitCanvasAndContext, AnimationLoop } from './utils/canvas';

const { context } = InitCanvasAndContext('#myCanvas', [600, 400]);
const loop = new AnimationLoop(context, 30);

function draw(ctx: CanvasRenderingContext2D): void {
  const x: number = 0;
  const y: number = 0;
  const width: number = 150;
  const height: number = 150;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(x, y, width, height);
}

loop.addAnimation(draw);
loop.run();
