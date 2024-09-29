declare module 'react-qr-scanner' {
  import { Component } from 'react';

  interface QrScannerProps {
    onScan: (data: string | null) => void;
    onError: (error: any) => void;
    style?: React.CSSProperties;
    facingMode?: 'user' | 'environment';
    // Ajoutez d'autres props si nécessaire
  }

  export default class QrScanner extends Component<QrScannerProps> {}
}