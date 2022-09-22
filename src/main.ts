import './style.css';
import { InitCanvasAndContext } from './utils';

const { context: ctx } = InitCanvasAndContext('#myCanvas', [600, 400]);

const x: number = 50;
const y: number = 50;
const width: number = 150;
const height: number = 150;

ctx.fillStyle = '#FFFFFF';
ctx.fillRect(x, y, width, height);
