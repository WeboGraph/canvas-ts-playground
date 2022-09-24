import './style.css';
import { Canvas, CanvasArgs } from './utils/canvas';

const canvasArgs: CanvasArgs = {
  selector: '#myCanvas',
  context_type: '2d'
}

const canvas = new Canvas(canvasArgs);

canvas.draw((ctx: CanvasRenderingContext2D) => {
  const x: number = 0;
  const y: number = 0;
  const width: number = 150;
  const height: number = 150;

  ctx.fillStyle = 'hotpink';
  ctx.fillRect(x, y, width, height);
});
