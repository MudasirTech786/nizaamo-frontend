"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

import Layout from "@/components/Layout";
import api from "@/lib/api";

import toast from "react-hot-toast";

import {
    Package,
    Search,
    RefreshCw,
    Wrench,
    AlertTriangle,
    CheckCircle2,
    X,
} from "lucide-react";

export default function InventoryAssetsPage() {

    const [assets, setAssets] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("all");

    const [selectedAsset, setSelectedAsset] =
        useState(null);

    const [showModal, setShowModal] =
        useState(false);

    const fetchAssets = async () => {

        try {

            setLoading(true);

            const response =
                await api.get(
                    "/inventory/inventory-assets"
                );

            setAssets(
                response.data.data || []
            );

        } catch (error) {

            console.log(error);

            toast.error(
                "Failed to load assets"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchAssets();
    }, []);

    const updateStatus = async (
        assetId,
        status
    ) => {

        try {

            await api.post(
                `/inventory/inventory-assets/${assetId}/status`,
                {
                    status,
                }
            );

            toast.success(
                "Status updated"
            );

            fetchAssets();

            if (selectedAsset) {

                setSelectedAsset({
                    ...selectedAsset,
                    status,
                });
            }

        } catch (error) {

            console.log(error);

            toast.error(
                "Failed to update status"
            );
        }
    };

    const filteredAssets =
        useMemo(() => {

            let result =
                [...assets];

            if (
                statusFilter !== "all"
            ) {

                result = result.filter(
                    (asset) =>
                        asset.status ===
                        statusFilter
                );
            }

            if (search.trim()) {

                result = result.filter(
                    (asset) => {

                        const text = `
              ${asset.asset_code}
              ${asset.item?.name}
              ${asset.status}
            `.toLowerCase();

                        return text.includes(
                            search.toLowerCase()
                        );
                    }
                );
            }

            return result;

        }, [
            assets,
            search,
            statusFilter,
        ]);

    return (

        <Layout>

            <div className="
        mx-auto
        max-w-7xl
        pb-24
      ">

                <div className="
          flex
          flex-col
          gap-5
          md:flex-row
          md:items-center
          md:justify-between
        ">

                    <div className="flex gap-3">

                        <Link
                            href="/dashboard/inventory/assets/labels"
                            className="
            rounded-2xl
            border
            px-5
            py-3
            font-semibold
        "
                        >
                            Print Labels
                        </Link>

                        <Link
                            href="/dashboard/inventory/scanner"
                            className="
            rounded-2xl
            bg-green-600
            px-5
            py-3
            font-semibold
            text-white
        "
                        >
                            QR Scanner
                        </Link>

                    </div>

                    <div>

                        <h1 className="
              text-3xl
              font-bold
              text-gray-900
            ">

                            Inventory Assets

                        </h1>

                        <p className="
              mt-1
              text-sm
              text-gray-500
            ">

                            Individual asset tracking
                            and QR management

                        </p>

                    </div>

                    <button
                        onClick={fetchAssets}
                        className="
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-blue-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
            "
                    >

                        <RefreshCw size={18} />

                        Refresh

                    </button>

                </div>

                <div className="
    mt-8
    grid
    grid-cols-2
    md:grid-cols-4
    gap-4
">

                    <StatCard
                        title="Available"
                        value={
                            assets.filter(
                                a =>
                                    a.status ===
                                    "available"
                            ).length
                        }
                    />

                    <StatCard
                        title="In Use"
                        value={
                            assets.filter(
                                a =>
                                    a.status ===
                                    "in_use"
                            ).length
                        }
                    />

                    <StatCard
                        title="Repair"
                        value={
                            assets.filter(
                                a =>
                                    a.status ===
                                    "under_repair"
                            ).length
                        }
                    />

                    <StatCard
                        title="Damaged"
                        value={
                            assets.filter(
                                a =>
                                    a.status ===
                                    "damaged"
                            ).length
                        }
                    />

                </div>

                <div className="
          mt-8
          grid
          grid-cols-1
          gap-4
          md:grid-cols-2
        ">

                    <div className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-gray-200
            bg-white
            px-4
            py-3
          ">

                        <Search
                            size={18}
                            className="
                text-gray-400
              "
                        />

                        <input
                            value={search}
                            placeholder="
                Search assets...
              "
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            className="
                w-full
                bg-transparent
                outline-none
              "
                        />

                    </div>

                    <select
                        value={
                            statusFilter
                        }
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value
                            )
                        }
                        className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              px-4
              py-3
            "
                    >

                        <option value="all">
                            All Statuses
                        </option>

                        <option value="available">
                            Available
                        </option>

                        <option value="in_use">
                            In Use
                        </option>

                        <option value="returned">
                            Returned
                        </option>

                        <option value="damaged">
                            Damaged
                        </option>

                        <option value="under_repair">
                            Under Repair
                        </option>

                        <option value="written_off">
                            Written Off
                        </option>

                    </select>

                </div>

                <div className="mt-10">

                    {loading ? (

                        <div className="
              rounded-3xl
              border
              border-gray-200
              bg-white
              py-20
              text-center
            ">
                            Loading Assets...
                        </div>

                    ) : filteredAssets.length === 0 ? (

                        <div className="
              rounded-3xl
              border
              border-gray-200
              bg-white
              py-20
              text-center
            ">
                            No Assets Found
                        </div>

                    ) : (

                        <div className="
              grid
              grid-cols-1
              gap-4
              md:grid-cols-2
              xl:grid-cols-3
            ">

                            {filteredAssets.map(
                                (asset) => (

                                    <div
                                        key={asset.id}
                                        onClick={() => {

                                            setSelectedAsset(asset);

                                            setShowModal(true);

                                        }}
                                        className="
                      cursor-pointer
                      rounded-3xl
                      border
                      border-gray-200
                      bg-white
                      p-5
                      shadow-sm
                      transition
                      hover:border-blue-300
                    "
                                    >

                                        <div className="
                      flex
                      items-start
                      justify-between
                    ">

                                            <div>

                                                <h3 className="
                          text-lg
                          font-bold
                          text-gray-900
                        ">

                                                    {asset.asset_code}

                                                </h3>

                                                <p className="
                          mt-1
                          text-sm
                          text-gray-500
                        ">

                                                    {
                                                        asset.item?.name
                                                    }

                                                </p>

                                            </div>

                                            <Package
                                                size={22}
                                                className="
                          text-blue-500
                        "
                                            />

                                        </div>

                                        <div className="
                      mt-5
                      flex
                      flex-wrap
                      gap-2
                    ">

                                            <StatusBadge
                                                status={
                                                    asset.status
                                                }
                                            />

                                        </div>

                                        <div className="
                      mt-4
                      space-y-2
                      text-sm
                    ">

                                            <div>

                                                Asset Code:

                                                {" "}

                                                <span className="
                          font-semibold
                        ">
                                                    {
                                                        asset.asset_code
                                                    }
                                                </span>

                                            </div>

                                            <div>

                                                QR UUID:

                                                {" "}

                                                <span className="
                          text-xs
                          text-gray-500
                        ">
                                                    {
                                                        asset.qr_uuid
                                                    }
                                                </span>

                                                <div className="mt-4">

                                                    <QRCodeSVG
                                                        value={asset.qr_uuid}
                                                        size={60}
                                                    />

                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            </div>

            {showModal && selectedAsset && (

                <div className="
          fixed
          inset-0
          z-[9999]
          flex
          items-center
          justify-center
          bg-black/60
          p-4
        ">

                    <div
                        onClick={() => {

                            setShowModal(
                                false
                            );

                            setSelectedAsset(
                                null
                            );

                        }}
                        className="
              absolute
              inset-0
            "
                    />

                    <div className="
            relative
            w-full
            max-w-2xl
            rounded-[32px]
            bg-white
            p-6
            shadow-2xl
          ">

                        <div className="
              flex
              items-center
              justify-between
            ">

                            <h2 className="
                text-2xl
                font-black
              ">

                                Asset Details

                            </h2>

                            <button
                                onClick={() => {

                                    setShowModal(
                                        false
                                    );

                                    setSelectedAsset(
                                        null
                                    );

                                }}
                            >

                                <X size={20} />

                            </button>

                        </div>

                        <div className="
              mt-6
              space-y-5
            ">

                            <div>

                                <label className="
                  text-xs
                  font-semibold
                  uppercase
                  text-gray-500
                ">
                                    Asset Code
                                </label>

                                <p className="
                  mt-1
                  text-lg
                  font-bold
                ">
                                    {
                                        selectedAsset.asset_code
                                    }
                                </p>

                            </div>

                            <div>

                                <label className="
                  text-xs
                  font-semibold
                  uppercase
                  text-gray-500
                ">
                                    Equipment
                                </label>

                                <p className="
                  mt-1
                ">
                                    {
                                        selectedAsset.item?.name
                                    }
                                </p>

                            </div>

                            <div>

                                <label className="
                  text-xs
                  font-semibold
                  uppercase
                  text-gray-500
                ">
                                    Status
                                </label>

                                <div className="
                  mt-2
                ">

                                    <StatusBadge
                                        status={
                                            selectedAsset.status
                                        }
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="
                  text-xs
                  font-semibold
                  uppercase
                  text-gray-500
                ">
                                    QR UUID
                                </label>

                                <p className="
                  mt-1
                  break-all
                  text-sm
                  text-gray-600
                ">
                                    {
                                        selectedAsset.qr_uuid
                                    }
                                </p>

                            </div>

                        </div>

                        <div className="
              mt-8
            ">

                            <h3 className="
                mb-4
                text-lg
                font-bold
              ">

                                Asset Actions

                            </h3>

                            <div className="
                grid
                grid-cols-2
                gap-3
              ">

                                <button
                                    onClick={() =>
                                        updateStatus(
                                            selectedAsset.id,
                                            "available"
                                        )
                                    }
                                    className="
                    rounded-2xl
                    border
                    border-green-200
                    bg-green-50
                    px-4
                    py-3
                    font-semibold
                    text-green-700
                  "
                                >

                                    Available

                                </button>

                                <button
                                    onClick={() =>
                                        updateStatus(
                                            selectedAsset.id,
                                            "in_use"
                                        )
                                    }
                                    className="
                    rounded-2xl
                    border
                    border-blue-200
                    bg-blue-50
                    px-4
                    py-3
                    font-semibold
                    text-blue-700
                  "
                                >

                                    In Use

                                </button>

                                <button
                                    onClick={() =>
                                        updateStatus(
                                            selectedAsset.id,
                                            "returned"
                                        )
                                    }
                                    className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3
                    font-semibold
                    text-slate-700
                  "
                                >

                                    Returned

                                </button>

                                <button
                                    onClick={() =>
                                        updateStatus(
                                            selectedAsset.id,
                                            "damaged"
                                        )
                                    }
                                    className="
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    px-4
                    py-3
                    font-semibold
                    text-red-700
                  "
                                >

                                    Damaged

                                </button>

                                <button
                                    onClick={() =>
                                        updateStatus(
                                            selectedAsset.id,
                                            "under_repair"
                                        )
                                    }
                                    className="
                    rounded-2xl
                    border
                    border-yellow-200
                    bg-yellow-50
                    px-4
                    py-3
                    font-semibold
                    text-yellow-700
                  "
                                >

                                    <div className="
                    flex
                    items-center
                    justify-center
                    gap-2
                  ">

                                        <Wrench size={16} />

                                        Under Repair

                                    </div>

                                </button>

                                <button
                                    onClick={() =>
                                        updateStatus(
                                            selectedAsset.id,
                                            "written_off"
                                        )
                                    }
                                    className="
                    rounded-2xl
                    border
                    border-red-300
                    bg-red-100
                    px-4
                    py-3
                    font-semibold
                    text-red-800
                  "
                                >

                                    Written Off

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </Layout>

    );
}

function StatCard({
    title,
    value,
}) {
    return (
        <div className="
            rounded-2xl
            border
            bg-white
            p-5
        ">
            <div className="
                text-sm
                text-gray-500
            ">
                {title}
            </div>

            <div className="
                mt-2
                text-3xl
                font-black
            ">
                {value}
            </div>
        </div>
    );
}

function StatusBadge({
    status,
}) {

    const styles = {

        available: `
      bg-green-100
      text-green-700
    `,

        in_use: `
      bg-blue-100
      text-blue-700
    `,

        returned: `
      bg-slate-100
      text-slate-700
    `,

        damaged: `
      bg-red-100
      text-red-700
    `,

        under_repair: `
      bg-yellow-100
      text-yellow-700
    `,

        written_off: `
      bg-red-200
      text-red-900
    `,
    };

    const icons = {

        available:
            <CheckCircle2
                size={14}
            />,

        in_use:
            <Package
                size={14}
            />,

        returned:
            <RefreshCw
                size={14}
            />,

        damaged:
            <AlertTriangle
                size={14}
            />,

        under_repair:
            <Wrench
                size={14}
            />,

        written_off:
            <X
                size={14}
            />,
    };

    return (

        <div className={`
      inline-flex
      items-center
      gap-2
      rounded-full
      px-3
      py-1
      text-xs
      font-semibold
      ${styles[status]}
    `}>

            {icons[status]}

            {status
                ?.replaceAll(
                    "_",
                    " "
                )}

        </div>

    );


}