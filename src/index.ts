import { Buffer } from "buffer";

export class BufferList {
  private buf: Buffer = Buffer.alloc(0);
  private options: { flexible: boolean };

  /**
   * 
   * @param options.flexible if the requested buffer size is more than the available buffer, return leftover buffer
   */
  constructor(options: { flexible: boolean }) {
    this.options = options;
  }

  get length(): number {
    return this.buf.length;
  }

  read(n: number): Buffer {
    if (n === 0) {
      return Buffer.alloc(0);
    }
    if (n < 0) {
      throw new Error("invalid length");
    }

    const chunk = this.buf.subarray(0, n);
    this.buf = this.buf.subarray(n);

    if (chunk.length < n) {
      if (!this.options.flexible) {
        throw new Error("Not enough buffer");
      }
    }

    return chunk;
  }

  push(chunk: Buffer): void {
    if (!chunk.length) return;
    this.buf = Buffer.concat([this.buf, chunk]);
  }
}

export default BufferList;