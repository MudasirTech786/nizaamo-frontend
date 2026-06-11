"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

import {
  getAssets,
} from "@/services/inventoryAssetService";

export default function LabelsPage() {

  const [assets, setAssets] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      const response =
        await getAssets();

      setAssets(
        response.data || []
      );
    } finally {
      setLoading(false);
    }
  };

  const printLabels = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-[#070B14] p-6">

    <div className="max-w-7xl mx-auto">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="
            text-3xl
            font-black
            text-white
          ">
            Asset Labels
          </h1>

          <p className="
            text-white/50
            mt-1
          ">
            Print QR labels for tracked assets
          </p>

        </div>

        <button
          onClick={printLabels}
          className="
            px-5
            py-3
            rounded-2xl
            bg-cyan-500
            text-black
            font-semibold
            shadow-lg
            shadow-cyan-500/20
            hover:scale-[1.02]
            transition-all
            no-print
          "
        >
          Print Labels
        </button>

      </div>

      <div className="
        mb-6
        rounded-3xl
        border
        border-white/[0.05]
        bg-white/[0.03]
        backdrop-blur-xl
        p-5
      ">

        <div className="text-white/50 text-sm">
          Total Assets
        </div>

        <div className="
          text-4xl
          font-black
          text-cyan-300
          mt-2
        ">
          {assets.length}
        </div>

      </div>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-5
      ">

        {assets.map(asset => (

          <div
            key={asset.id}
            className="
              rounded-3xl
              border
              border-white/[0.06]
              bg-white/[0.03]
              backdrop-blur-xl
              p-5
              flex
              flex-col
              items-center
              text-center
            "
          >

            <div className="
              text-cyan-300
              font-black
              text-xl
            ">
              {asset.asset_code}
            </div>

            <div className="
              text-white/70
              text-sm
              mt-1
              mb-4
            ">
              {asset.item?.name}
            </div>

            <div className="
              bg-white
              rounded-xl
              p-3
            ">

              <QRCodeSVG
                value={asset.qr_uuid}
                size={140}
              />

            </div>

            {asset.serial_number && (

              <div className="
                mt-4
                text-xs
                text-white/40
              ">
                SN: {asset.serial_number}
              </div>

            )}

          </div>

        ))}

      </div>

    </div>

  </div>
);
}