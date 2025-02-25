import { useEffect, useRef, useState } from "preact/hooks";
import { JSX } from "preact";
import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  DecodeHintType,
  Result,
} from "@zxing/library";

interface BarcodeScannerProps {
  onBarcodeDetected: (barcode: string) => void;
  onClose: () => void;
}

export default function BarcodeScanner(
  { onBarcodeDetected, onClose }: BarcodeScannerProps,
): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(true);

  // Function to play a beep sound using Web Audio API
  const playBeepSound = () => {
    try {
      const audioContext =
        new (globalThis.window.AudioContext ||
          (globalThis.window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(1800, audioContext.currentTime);
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Set volume
      gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

      // Start and stop the beep
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.15);

      // Clean up
      setTimeout(() => {
        gainNode.disconnect();
        oscillator.disconnect();
      }, 200);
    } catch (e) {
      console.error("Error playing beep sound:", e);
    }
  };

  useEffect(() => {
    if (!videoRef.current) return;

    // Configure ZXing
    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
      BarcodeFormat.CODE_39,
      BarcodeFormat.CODE_128,
      BarcodeFormat.QR_CODE,
    ]);

    const codeReader = new BrowserMultiFormatReader(hints);

    // Start continuous scanning
    codeReader.decodeFromConstraints(
      {
        video: { facingMode: "environment" },
      },
      videoRef.current,
      (result: Result | null, error: Error | undefined) => {
        if (result && scanning) {
          // Barcode detected
          console.log("Barcode detected:", result.getText());
          setScanning(false);

          // Play success sound
          playBeepSound();

          // Call the callback with the detected barcode
          onBarcodeDetected(result.getText());

          // Close the scanner after a short delay
          setTimeout(() => {
            onClose();
          }, 1500);
        }

        if (error && error.name !== "NotFoundException") {
          console.error("Barcode detection error:", error);
        }
      },
    ).catch((err: Error) => {
      console.error("Error starting barcode scanner:", err);
      setError(
        "Could not access camera. Please ensure you've granted camera permissions.",
      );
    });

    // Cleanup function
    return () => {
      codeReader.reset();
    };
  }, [onBarcodeDetected, onClose, scanning]);

  return (
    <div class="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div class="p-4 bg-blue-600 text-white flex justify-between items-center">
          <h3 class="text-lg font-semibold">Scan Barcode</h3>
          <button
            onClick={onClose}
            class="text-white hover:text-gray-200 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="relative bg-black">
          {error
            ? (
              <div class="p-4 text-center text-red-600 bg-red-100">
                {error}
              </div>
            )
            : (
              <>
                <video
                  ref={videoRef}
                  class="w-full h-64 object-cover"
                  playsInline
                  muted
                />
                <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div class="w-64 h-48 border-2 border-blue-500 rounded-lg">
                  </div>
                </div>
                <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
                  Position barcode within the box
                </div>
              </>
            )}
        </div>

        <div class="p-4">
          <p class="text-sm text-gray-600 mb-4">
            Hold your device so that the barcode appears in the box above.
          </p>
          <button
            onClick={onClose}
            class="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
