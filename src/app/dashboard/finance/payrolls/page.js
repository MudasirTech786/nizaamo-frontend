"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import api from "@/lib/api";
import Link from "next/link";
import toast from "react-hot-toast";

import {
    Wallet,
    Plus,
    Users,
    Briefcase,
    ArrowUpRight,
} from "lucide-react";

export default function PayrollRunsPage() {

    const [loading, setLoading] =
        useState(true);

    const [payrolls, setPayrolls] =
        useState([]);

    const [showCrewModal,
        setShowCrewModal] =
        useState(false);

    const [showEmployeeModal,
        setShowEmployeeModal] =
        useState(false);

    const [crewForm,
        setCrewForm] =
        useState({
            start_date: "",
            end_date: "",
        });

    const [employeeForm,
        setEmployeeForm] =
        useState({
            start_date: "",
            end_date: "",
        });

    const fetchPayrolls =
        async () => {

            try {

                setLoading(true);

                const res =
                    await api.get(
                        "/payrolls"
                    );

                setPayrolls(
                    res.data?.data || []
                );

            } catch {

                toast.error(
                    "Failed to load payrolls"
                );

            } finally {

                setLoading(false);

            }
        };

    useEffect(() => {

        fetchPayrolls();

    }, []);

    const generateCrewPayroll =
        async () => {

            try {

                await api.post(
                    "/payrolls/generate-crew",
                    crewForm
                );

                toast.success(
                    "Crew payroll generated"
                );

                setShowCrewModal(false);

                fetchPayrolls();

            } catch {

                toast.error(
                    "Failed to generate payroll"
                );

            }
        };

    const generateEmployeePayroll =
        async () => {

            try {

                await api.post(
                    "/payrolls/generate-employee",
                    employeeForm
                );

                toast.success(
                    "Employee payroll generated"
                );

                setShowEmployeeModal(false);

                fetchPayrolls();

            } catch {

                toast.error(
                    "Failed to generate payroll"
                );

            }
        };

    if (loading) {

        return (
            <Layout>
                <div className="
          py-32
          text-center
        ">
                    Loading Payrolls...
                </div>
            </Layout>
        );
    }

    return (
        <Layout>

            <div className="
        max-w-7xl
        mx-auto
        px-6
        pb-20
      ">

                {/* HERO */}

                <div className="py-6">

                    <div className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            shadow-sm
            overflow-hidden
          ">

                        <div className="
              h-1
              bg-blue-600
            " />

                        <div className="p-8">

                            <div className="
                flex
                items-center
                justify-between
              ">

                                <div>

                                    <div className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-1.5
                    rounded-full
                    bg-blue-50
                    text-blue-700
                    text-sm
                    font-semibold
                  ">
                                        <Wallet size={14} />
                                        Payroll
                                    </div>

                                    <h1 className="
                    mt-4
                    text-4xl
                    font-bold
                  ">
                                        Payroll Runs
                                    </h1>

                                    <p className="
                    mt-2
                    text-gray-500
                  ">
                                        Generate and
                                        manage payrolls
                                    </p>

                                </div>

                                <div className="
                  flex
                  gap-3
                ">

                                    <button
                                        onClick={() =>
                                            setShowCrewModal(
                                                true
                                            )
                                        }
                                        className="
                      inline-flex
                      items-center
                      gap-2
                      px-5
                      py-3
                      rounded-xl
                      bg-blue-600
                      text-white
                    "
                                    >
                                        <Users size={18} />
                                        Crew Payroll
                                    </button>

                                    <button
                                        onClick={() =>
                                            setShowEmployeeModal(
                                                true
                                            )
                                        }
                                        className="
                      inline-flex
                      items-center
                      gap-2
                      px-5
                      py-3
                      rounded-xl
                      bg-emerald-600
                      text-white
                    "
                                    >
                                        <Briefcase
                                            size={18}
                                        />
                                        Employee Payroll
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                {/* PAYROLL TABLE */}

                <div
                    className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            shadow-sm
            overflow-hidden
          "
                >

                    <div className="
            px-6
            py-5
            border-b
            border-gray-100
          ">

                        <h2
                            className="
                text-lg
                font-semibold
              "
                        >
                            Payroll Runs
                        </h2>

                    </div>

                    <div className="
            overflow-x-auto
          ">

                        <table className="w-full">

                            <thead>

                                <tr className="
                  bg-gray-50
                  border-b
                ">

                                    <th className="p-4 text-left">
                                        Reference
                                    </th>

                                    <th className="p-4 text-left">
                                        Type
                                    </th>

                                    <th className="p-4 text-left">
                                        Period
                                    </th>

                                    <th className="p-4 text-left">
                                        Gross Amount
                                    </th>

                                    <th className="p-4 text-left">
                                        Net Amount
                                    </th>

                                    <th className="p-4 text-left">
                                        Status
                                    </th>

                                    <th className="p-4 text-left">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {payrolls.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan={7}
                                            className="
                        p-10
                        text-center
                        text-gray-500
                      "
                                        >
                                            No payroll runs found
                                        </td>

                                    </tr>

                                ) : (

                                    payrolls.map(
                                        (payroll) => (

                                            <tr
                                                key={payroll.id}
                                                className="
                          border-b
                          hover:bg-gray-50
                        "
                                            >

                                                <td className="p-4">

                                                    <div>

                                                        <p className="
                              font-semibold
                              text-gray-900
                            ">
                                                            {payroll.reference}
                                                        </p>

                                                        <p className="
                              text-xs
                              text-gray-500
                            ">
                                                            ID #{payroll.id}
                                                        </p>

                                                    </div>

                                                </td>

                                                <td className="
                          p-4
                          capitalize
                        ">
                                                    {payroll.type}
                                                </td>

                                                <td className="p-4">

                                                    <div className="
                            text-sm
                          ">

                                                        <div>
                                                            {payroll.period_start}
                                                        </div>

                                                        <div className="
                              text-gray-400
                            ">
                                                            to
                                                        </div>

                                                        <div>
                                                            {payroll.period_end}
                                                        </div>

                                                    </div>

                                                </td>

                                                <td className="
                          p-4
                          font-semibold
                        ">
                                                    Rs{" "}
                                                    {Number(
                                                        payroll.gross_amount
                                                    ).toLocaleString()}
                                                </td>

                                                <td className="
                          p-4
                          font-semibold
                        ">
                                                    Rs{" "}
                                                    {Number(
                                                        payroll.net_amount
                                                    ).toLocaleString()}
                                                </td>

                                                <td className="p-4">

                                                    <span
                                                        className={`
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-semibold

                              ${payroll.status ===
                                                                "paid"
                                                                ? "bg-emerald-50 text-emerald-700"
                                                                : payroll.status ===
                                                                    "approved"
                                                                    ? "bg-blue-50 text-blue-700"
                                                                    : "bg-amber-50 text-amber-700"
                                                            }
                            `}
                                                    >
                                                        {payroll.status}
                                                    </span>

                                                </td>

                                                <td className="p-4">

                                                    <Link
                                                        href={`/dashboard/finance/payrolls/${payroll.id}`}
                                                        className="
                              inline-flex
                              items-center
                              gap-2
                              text-blue-600
                              font-medium
                            "
                                                    >
                                                        Open

                                                        <ArrowUpRight
                                                            size={14}
                                                        />
                                                    </Link>

                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* CREW PAYROLL MODAL */}

                {showCrewModal && (

                    <div className="
            fixed
            inset-0
            z-50
            bg-black/50
            flex
            items-center
            justify-center
            p-4
          ">

                        <div className="
              bg-white
              rounded-2xl
              w-full
              max-w-lg
              shadow-xl
            ">

                            <div className="
                p-6
                border-b
              ">

                                <h3 className="
                  text-xl
                  font-bold
                ">
                                    Generate Crew Payroll
                                </h3>

                            </div>

                            <div className="
                p-6
                space-y-4
              ">

                                <div>

                                    <label className="
                    block
                    mb-2
                    text-sm
                    font-medium
                  ">
                                        Start Date
                                    </label>

                                    <input
                                        type="date"
                                        value={
                                            crewForm.start_date
                                        }
                                        onChange={(e) =>
                                            setCrewForm({
                                                ...crewForm,
                                                start_date:
                                                    e.target.value,
                                            })
                                        }
                                        className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                    "
                                    />

                                </div>

                                <div>

                                    <label className="
                    block
                    mb-2
                    text-sm
                    font-medium
                  ">
                                        End Date
                                    </label>

                                    <input
                                        type="date"
                                        value={
                                            crewForm.end_date
                                        }
                                        onChange={(e) =>
                                            setCrewForm({
                                                ...crewForm,
                                                end_date:
                                                    e.target.value,
                                            })
                                        }
                                        className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                    "
                                    />

                                </div>

                            </div>

                            <div className="
                p-6
                border-t
                flex
                justify-end
                gap-3
              ">

                                <button
                                    onClick={() =>
                                        setShowCrewModal(
                                            false
                                        )
                                    }
                                    className="
                    px-5
                    py-3
                    rounded-xl
                    border
                  "
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={
                                        generateCrewPayroll
                                    }
                                    className="
                    px-5
                    py-3
                    rounded-xl
                    bg-blue-600
                    text-white
                  "
                                >
                                    Generate
                                </button>

                            </div>

                        </div>

                    </div>

                )}

                {/* EMPLOYEE PAYROLL MODAL */}

                {showEmployeeModal && (

                    <div className="
            fixed
            inset-0
            z-50
            bg-black/50
            flex
            items-center
            justify-center
            p-4
          ">

                        <div className="
              bg-white
              rounded-2xl
              w-full
              max-w-lg
              shadow-xl
            ">

                            <div className="
                p-6
                border-b
              ">

                                <h3 className="
                  text-xl
                  font-bold
                ">
                                    Generate Employee Payroll
                                </h3>

                            </div>

                            <div className="
                p-6
                space-y-4
              ">

                                <div>

                                    <label className="
                    block
                    mb-2
                    text-sm
                    font-medium
                  ">
                                        Start Date
                                    </label>

                                    <input
                                        type="date"
                                        value={
                                            employeeForm.start_date
                                        }
                                        onChange={(e) =>
                                            setEmployeeForm({
                                                ...employeeForm,
                                                start_date:
                                                    e.target.value,
                                            })
                                        }
                                        className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                    "
                                    />

                                </div>

                                <div>

                                    <label className="
                    block
                    mb-2
                    text-sm
                    font-medium
                  ">
                                        End Date
                                    </label>

                                    <input
                                        type="date"
                                        value={
                                            employeeForm.end_date
                                        }
                                        onChange={(e) =>
                                            setEmployeeForm({
                                                ...employeeForm,
                                                end_date:
                                                    e.target.value,
                                            })
                                        }
                                        className="
                      w-full
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3
                    "
                                    />

                                </div>

                            </div>

                            <div className="
                p-6
                border-t
                flex
                justify-end
                gap-3
              ">

                                <button
                                    onClick={() =>
                                        setShowEmployeeModal(
                                            false
                                        )
                                    }
                                    className="
                    px-5
                    py-3
                    rounded-xl
                    border
                  "
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={
                                        generateEmployeePayroll
                                    }
                                    className="
                    px-5
                    py-3
                    rounded-xl
                    bg-emerald-600
                    text-white
                  "
                                >
                                    Generate
                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </Layout>

    );
}