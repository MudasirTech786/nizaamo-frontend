"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";

import {
    Wallet,
    DollarSign,
    TrendingUp,
    Receipt,
} from "lucide-react";

export default function PayrollDetailPage() {

    const params = useParams();

    const payrollId = params.id;

    const [loading, setLoading] =
        useState(true);

    const [payroll, setPayroll] =
        useState(null);

    const [items, setItems] =
        useState([]);

    const fetchPayroll =
        async () => {

            try {

                setLoading(true);

                const [payrollRes,
                    itemsRes] =
                    await Promise.all([

                        api.get(
                            `/payrolls/${payrollId}`
                        ),

                        api.get(
                            `/payrolls/${payrollId}/items`
                        ),

                    ]);

                setPayroll(
                    payrollRes.data
                );

                setItems(
                    itemsRes.data || []
                );

            } catch {

                toast.error(
                    "Failed to load payroll"
                );

            } finally {

                setLoading(false);

            }
        };

    useEffect(() => {

        if (payrollId) {
            fetchPayroll();
        }

    }, [payrollId]);

    const approvePayroll =
        async () => {

            try {

                await api.post(
                    `/payrolls/${payrollId}/approve`
                );

                toast.success(
                    "Payroll approved"
                );

                fetchPayroll();

            } catch {

                toast.error(
                    "Approval failed"
                );

            }
        };

    const markPaid =
        async () => {

            try {

                await api.post(
                    `/payrolls/${payrollId}/mark-paid`
                );

                toast.success(
                    "Payroll marked paid"
                );

                fetchPayroll();

            } catch {

                toast.error(
                    "Operation failed"
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
                    Loading Payroll...
                </div>
            </Layout>
        );
    }

    if (!payroll) {

        return (
            <Layout>
                <div className="
          py-32
          text-center
        ">
                    Payroll not found
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
                                        <Wallet size={14} />
                                        Payroll
                                    </div>

                                    <h1 className="
                    mt-4
                    text-4xl
                    font-bold
                  ">
                                        {payroll.reference}
                                    </h1>

                                    <p className="
                    mt-2
                    text-gray-500
                  ">
                                        {payroll.period_start}
                                        {" "}to{" "}
                                        {payroll.period_end}
                                    </p>

                                </div>

                                <div className="
                  flex
                  gap-3
                ">

                                </div>

                                                  {payroll.status ===
                    "draft" && (

                    <button
                      onClick={
                        approvePayroll
                      }
                      className="
                        px-5
                        py-3
                        rounded-xl
                        bg-blue-600
                        text-white
                        font-medium
                      "
                    >
                      Approve Payroll
                    </button>

                  )}

                  {payroll.status !==
                    "paid" && (

                    <button
                      onClick={
                        markPaid
                      }
                      className="
                        px-5
                        py-3
                        rounded-xl
                        bg-emerald-600
                        text-white
                        font-medium
                      "
                    >
                      Mark Paid
                    </button>

                  )}

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
            title="Gross Amount"
            value={
              payroll.gross_amount
            }
            icon={
              <DollarSign
                size={18}
              />
            }
          />

          <SummaryCard
            title="Deductions"
            value={
              payroll.deduction_amount
            }
            icon={
              <Receipt
                size={18}
              />
            }
          />

          <SummaryCard
            title="Bonuses"
            value={
              payroll.bonus_amount
            }
            icon={
              <TrendingUp
                size={18}
              />
            }
          />

          <SummaryCard
            title="Net Amount"
            value={
              payroll.net_amount
            }
            icon={
              <Wallet
                size={18}
              />
            }
          />

        </div>

        {/* PAYROLL INFO */}

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
            Payroll Information
          </h2>

          <div className="
            grid
            md:grid-cols-2
            gap-6
          ">

            <div>

              <label className="
                text-xs
                text-gray-500
              ">
                Reference
              </label>

              <p className="
                mt-1
                font-medium
              ">
                {payroll.reference}
              </p>

            </div>

            <div>

              <label className="
                text-xs
                text-gray-500
              ">
                Type
              </label>

              <p className="
                mt-1
                font-medium
                capitalize
              ">
                {payroll.type}
              </p>

            </div>

            <div>

              <label className="
                text-xs
                text-gray-500
              ">
                Period Start
              </label>

              <p className="
                mt-1
                font-medium
              ">
                {payroll.period_start}
              </p>

            </div>

            <div>

              <label className="
                text-xs
                text-gray-500
              ">
                Period End
              </label>

              <p className="
                mt-1
                font-medium
              ">
                {payroll.period_end}
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
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold

                    ${
                      payroll.status ===
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

              </div>

            </div>

          </div>

        </div>
        

                {/* PAYROLL ITEMS */}

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
              Payroll Items
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
                    Description
                  </th>

                  <th className="p-4 text-left">
                    Person Type
                  </th>

                  <th className="p-4 text-left">
                    Quantity
                  </th>

                  <th className="p-4 text-left">
                    Rate
                  </th>

                  <th className="p-4 text-left">
                    Gross
                  </th>

                  <th className="p-4 text-left">
                    Net
                  </th>

                  <th className="p-4 text-left">
                    Paid
                  </th>

                </tr>

              </thead>

              <tbody>

                {items.length === 0 ? (

                  <tr>

                    <td
                      colSpan={7}
                      className="
                        p-10
                        text-center
                        text-gray-500
                      "
                    >
                      No payroll items found
                    </td>

                  </tr>

                ) : (

                  items.map((item) => (

                    <tr
                      key={item.id}
                      className="
                        border-b
                        hover:bg-gray-50
                      "
                    >

                      <td className="p-4">
                        {item.description}
                      </td>

                      <td
                        className="
                          p-4
                          capitalize
                        "
                      >
                        {item.person_type}
                      </td>

                      <td className="p-4">
                        {item.quantity}
                      </td>

                      <td className="p-4">
                        Rs{" "}
                        {Number(
                          item.rate
                        ).toLocaleString()}
                      </td>

                      <td className="p-4">
                        Rs{" "}
                        {Number(
                          item.gross_amount
                        ).toLocaleString()}
                      </td>

                      <td className="p-4 font-semibold">
                        Rs{" "}
                        {Number(
                          item.net_amount
                        ).toLocaleString()}
                      </td>

                      <td className="p-4">

                        {item.is_paid ? (

                          <span
                            className="
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-semibold
                              bg-emerald-50
                              text-emerald-700
                            "
                          >
                            Paid
                          </span>

                        ) : (

                          <span
                            className="
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-semibold
                              bg-amber-50
                              text-amber-700
                            "
                          >
                            Pending
                          </span>

                        )}

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

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
            text-gray-900
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