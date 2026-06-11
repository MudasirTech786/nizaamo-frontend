"use client";

import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

import { lookupAsset } from "@/services/inventoryAssetService";

export default function ScannerPage() {
  const scannerRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [asset, setAsset] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    startScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, []);

  const startScanner = () => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
        rememberLastUsedCamera: true,
      },
      false
    );

    scannerRef.current = scanner;

    scanner.render(
      async (decodedText) => {
        try {
          setLoading(true);
          setError("");

          const response =
            await lookupAsset(decodedText);

          setAsset(
            response.data || response
          );

          await scanner.clear();
        } catch (err) {
          setError(
            "Asset not found."
          );
        } finally {
          setLoading(false);
        }
      },
      () => {}
    );
  };

  const handleRescan = () => {
    setAsset(null);
    setError("");

    document.getElementById("reader").innerHTML = "";

    startScanner();
  };

  return (
    <div className="p-6">

      <div className="flex items-center justify-between mb-6">

        <h1 className="text-2xl font-bold">
          Asset Scanner
        </h1>

        {asset && (
          <button
            onClick={handleRescan}
            className="px-4 py-2 rounded-lg border"
          >
            Scan Again
          </button>
        )}

      </div>

      {!asset && (
        <div
          id="reader"
          className="max-w-md"
        />
      )}

      {loading && (
        <div className="mt-4">
          Looking up asset...
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}

      {asset && (
        <div className="mt-6 border rounded-xl p-6">

          <h2 className="text-xl font-bold">
            {asset.asset_code}
          </h2>

          <div className="mt-4 space-y-2">

            <div>
              <strong>Item:</strong>{" "}
              {asset.item?.name}
            </div>

            <div>
              <strong>Status:</strong>{" "}
              {asset.status}
            </div>

            <div>
              <strong>Serial:</strong>{" "}
              {asset.serial_number || "-"}
            </div>

            <div>
              <strong>QR UUID:</strong>{" "}
              {asset.qr_uuid}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}