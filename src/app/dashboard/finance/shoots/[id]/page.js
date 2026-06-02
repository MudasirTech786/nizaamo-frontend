"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";
import api from "@/lib/api";
import toast from "react-hot-toast";

import {
    Film,
    DollarSign,
    TrendingUp,
    Receipt,
    Users,
} from "lucide-react";

export default function ShootFinanceReportPage() {

    const params = useParams();

    const shootId = params.id;

    const [loading, setLoading] =
        useState(true);

    const [shoot, setShoot] =
        useState(null);

    const [finance, setFinance] =
        useState(null);

    const [expenses, setExpenses] =
        useState([]);

    const fetchReport =
        async () => {

            try {

                setLoading(true);

                const [
                    shootRes,
                    financeRes,
                    expenseRes,
                ] = await Promise.all([

                    api.get(
                        `/shoots/${shootId}`
                    ),

                    api.get(
                        `/shoots/${shootId}/finance`
                    ),

                    api.get(
                        `/shoots/${shootId}/expenses`
                    ),

                ]);

                setShoot(
                    shootRes.data
                );

                setFinance(
                    financeRes.data
                );

                setExpenses(
                    expenseRes.data?.data || []
                );

            } catch {

                toast.error(
                    "Failed to load report"
                );

            } finally {

                setLoading(false);

            }
        };

    useEffect(() => {

        if (shootId) {
            fetchReport();
        }

    }, [shootId]);

    if (loading) {

        return (
            <Layout>
                <div className="
          py-32
          text-center
        ">
                    Loading Report...
                </div>
            </Layout>
        );
    }

    if (!shoot || !finance) {

        return (
            <Layout>
                <div className="
          py-32
          text-center
        ">
                    Report not found
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
                items-start
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
                                        <Film size={14} />
                                        Production Report
                                    </div>

                                    <h1 className="
                    mt-4
                    text-4xl
                    font-bold
                  ">
                                        {shoot.title}
                                    </h1>

                                    <p className="
                    mt-2
                    text-gray-500
                  ">
                                        Financial performance
                                        report
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* SUMMARY CARDS */}

                <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-5
          mb-6
        ">

                    <SummaryCard
                        title="Revenue"
                        value={finance.revenue}
                        icon={
                            <DollarSign
                                size={18}
                            />
                        }
                    />

                    <SummaryCard
                        title="Total Cost"
                        value={finance.total_cost}
                        icon={
                            <Receipt
                                size={18}
                            />
                        }
                    />

                    <SummaryCard
                        title="Profit"
                        value={finance.profit}
                        icon={
                            <TrendingUp
                                size={18}
                            />
                        }
                    />

                    <SummaryCard
                        title="Crew Cost"
                        value={finance.crew_cost}
                        icon={
                            <Users
                                size={18}
                            />
                        }
                    />

                </div>

                {/* PRODUCTION INFO */}

                <div className="
          bg-white
          border
          border-gray-200
          rounded-2xl
          shadow-sm
          p-6
          mb-6
        ">

                    <h2 className="
            text-lg
            font-semibold
            mb-5
          ">
                        Production Information
                    </h2>

                    <div className="
            grid
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
          ">

                        <div>

                            <label className="
                text-xs
                text-gray-500
              ">
                                Production Title
                            </label>

                            <p className="
                mt-1
                font-medium
              ">
                                {shoot.title}
                            </p>

                        </div>

                        <div>

                            <label className="
                text-xs
                text-gray-500
              ">
                                Client
                            </label>

                            <p className="
                mt-1
                font-medium
              ">
                                {shoot.client_name ||
                                    "No Client"}
                            </p>

                        </div>

                        <div>

                            <label className="
                text-xs
                text-gray-500
              ">
                                Location
                            </label>

                            <p className="
                mt-1
                font-medium
              ">
                                {shoot.location}
                            </p>

                        </div>

                        <div>

                            <label className="
                text-xs
                text-gray-500
              ">
                                Status
                            </label>

                            <div className="
                mt-2
              ">

                                <span
                                    className="
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    bg-blue-50
                    text-blue-700
                    capitalize
                  "
                                >
                                    {shoot.status}
                                </span>

                            </div>

                        </div>

                        <div>

                            <label className="
                text-xs
                text-gray-500
              ">
                                Start Date
                            </label>

                            <p className="
                mt-1
                font-medium
              ">
                                {shoot.start_datetime}
                            </p>

                        </div>

                        <div>

                            <label className="
                text-xs
                text-gray-500
              ">
                                End Date
                            </label>

                            <p className="
                mt-1
                font-medium
              ">
                                {shoot.end_datetime}
                            </p>

                        </div>

                        <div>

                            <label className="
                text-xs
                text-gray-500
              ">
                                Budget
                            </label>

                            <p className="
                mt-1
                font-medium
              ">
                                Rs{" "}
                                {Number(
                                    shoot.client_budget || 0
                                ).toLocaleString()}
                            </p>

                        </div>

                        <div>

                            <label className="
                text-xs
                text-gray-500
              ">
                                Invoice Amount
                            </label>

                            <p className="
                mt-1
                font-medium
              ">
                                Rs{" "}
                                {Number(
                                    shoot.client_invoice_amount || 0
                                ).toLocaleString()}
                            </p>

                        </div>

                    </div>

                </div>

                {/* COST BREAKDOWN */}

                <div className="
          bg-white
          border
          border-gray-200
          rounded-2xl
          shadow-sm
          overflow-hidden
          mb-6
        ">

                    <div className="
            px-6
            py-5
            border-b
            border-gray-100
          ">

                        <h2 className="
              text-lg
              font-semibold
            ">
                            Cost Breakdown
                        </h2>

                    </div>

                    <div className="
            p-6
          ">

                        <div className="
              grid
              md:grid-cols-2
              xl:grid-cols-5
              gap-4
            ">

                            <BreakdownCard
                                title="Crew Cost"
                                value={finance.crew_cost}
                            />

                            <BreakdownCard
                                title="Logistics Cost"
                                value={
                                    finance.logistics_cost
                                }
                            />

                            <BreakdownCard
                                title="Inventory Cost"
                                value={
                                    finance.inventory_cost
                                }
                            />

                            <BreakdownCard
                                title="Repair Cost"
                                value={
                                    finance.repair_cost
                                }
                            />

                            <BreakdownCard
                                title="Expense Cost"
                                value={
                                    finance.expense_cost
                                }
                            />

                        </div>

                    </div>

                </div>

                {/* EXPENSE RECORDS */}

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

                        <h2 className="
              text-lg
              font-semibold
            ">
                            Expense Records
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
                                        Category
                                    </th>

                                    <th className="p-4 text-left">
                                        Description
                                    </th>

                                    <th className="p-4 text-left">
                                        Amount
                                    </th>

                                    <th className="p-4 text-left">
                                        Created
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {expenses.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan={4}
                                            className="
                        p-10
                        text-center
                        text-gray-500
                      "
                                        >
                                            No expenses found
                                        </td>

                                    </tr>

                                ) : (

                                    expenses.map((expense) => (

                                        <tr
                                            key={expense.id}
                                            className="
                        border-b
                        hover:bg-gray-50
                      "
                                        >

                                            <td className="p-4">

                                                <span
                                                    className="
                            px-3
                            py-1
                            rounded-full
                            bg-blue-50
                            text-blue-700
                            text-xs
                            font-semibold
                          "
                                                >
                                                    {expense.category}
                                                </span>

                                            </td>

                                            <td className="p-4">
                                                {expense.description}
                                            </td>

                                            <td className="
                        p-4
                        font-semibold
                      ">
                                                Rs{" "}
                                                {Number(
                                                    expense.amount
                                                ).toLocaleString()}
                                            </td>

                                            <td className="p-4">
                                                {new Date(
                                                    expense.created_at
                                                ).toLocaleDateString()}
                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </Layout>

    );
}

function SummaryCard({
    title,
    value,
    icon,
}) {

    return (

        <div
            className="
        bg-white
        border
        border-gray-200
        rounded-2xl
        p-6
        shadow-sm
      "
        >

            <div className="
        flex
        items-center
        justify-between
      ">

                <div>

                    <p className="
            text-sm
            text-gray-500
          ">
                        {title}
                    </p>

                    <h3 className="
            mt-3
            text-3xl
            font-bold
          ">
                        Rs{" "}
                        {Number(
                            value || 0
                        ).toLocaleString()}
                    </h3>

                </div>

                <div
                    className="
            w-12
            h-12
            rounded-xl
            bg-blue-50
            text-blue-600
            flex
            items-center
            justify-center
          "
                >
                    {icon}
                </div>

            </div>

        </div>

    );
}

function BreakdownCard({
    title,
    value,
}) {

    return (

        <div
            className="
        border
        border-gray-200
        rounded-xl
        p-5
      "
        >

            <p className="
        text-sm
        text-gray-500
      ">
                {title}
            </p>

            <h4 className="
        mt-3
        text-2xl
        font-bold
      ">
                Rs{" "}
                {Number(
                    value || 0
                ).toLocaleString()}
            </h4>

        </div>

    );
}