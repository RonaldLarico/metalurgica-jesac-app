declare module '@ffmpeg/ffmpeg' {
  interface FFmpegOptions {
    log?: boolean;
    corePath?: string;
  }

  interface FFmpegInstance {
    isLoaded: () => boolean;
    load: () => Promise<void>;
    FS: (command: string, ...args: any[]) => any;
    run: (...args: string[]) => Promise<void>;
  }

  const FFmpeg: {
    createFFmpeg: (options?: FFmpegOptions) => FFmpegInstance;
    fetchFile: (file: string | File | Buffer) => Promise<Uint8Array>;
  };

  export default FFmpeg;
}