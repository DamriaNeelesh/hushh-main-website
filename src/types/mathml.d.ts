type MathMlElements = {
  math: any;
  maction: any;
  menclose: any;
  merror: any;
  mfenced: any;
  mfrac: any;
  mi: any;
  mmultiscripts: any;
  mn: any;
  mo: any;
  mover: any;
  mpadded: any;
  mphantom: any;
  mprescripts: any;
  mroot: any;
  mrow: any;
  ms: any;
  mspace: any;
  msqrt: any;
  mstyle: any;
  msub: any;
  msubsup: any;
  msup: any;
  mtable: any;
  mtd: any;
  mtext: any;
  mtr: any;
  munder: any;
  munderover: any;
  semantics: any;
};

declare global {
  namespace JSX {
    interface IntrinsicElements extends MathMlElements {}
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends MathMlElements {}
  }
}

export {};
