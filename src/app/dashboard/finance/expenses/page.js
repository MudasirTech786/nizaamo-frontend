"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import api from "@/lib/api";
import toast from "react-hot-toast";

import {
    Plus,
    Pencil,
    Trash2,
    Receipt,
    Search,
} from "lucide-react";

export default function ShootExpensesPage() {

    const [loading, setLoading] =
        useState(true);

    const [expenses, setExpenses] =
        useState([]);

    const [shoots, setShoots] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [showCreate, setShowCreate] =
        useState(false);

    const [showEdit, setShowEdit] =
        useState(false);

    const [selectedExpense,
        setSelectedExpense] =
        useState(null);

    const [form, setForm] =
        useState({
            shoot_id: "",
            category: "",
            description: "",
            amount: "",
        });

    const fetchData = async () => {

        try {

            setLoading(true);

            const [expensesRes, shootsRes] =
                await Promise.all([
                    api.get("/shoot-expenses"),
                    api.get("/shoots"),
                ]);

            setExpenses(
                expensesRes.data?.data || []
            );

            setShoots(
                shootsRes.data || []
            );

        } catch (error) {

            toast.error(
                "Failed to load expenses"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        fetchData();

    }, []);

    const resetForm = () => {

        setForm({
            shoot_id: "",
            category: "",
            description: "",
            amount: "",
        });

    };

    const createExpense = async () => {

        try {

            await api.post(
                "/shoot-expenses",
                form
            );

            toast.success(
                "Expense created"
            );

            setShowCreate(false);

            resetForm();

            fetchData();

        } catch {

            toast.error(
                "Failed to create expense"
            );

        }
    };

    const openEdit = (expense) => {

        setSelectedExpense(expense);

        setForm({
            shoot_id: expense.shoot_id,
            category: expense.category,
            description:
                expense.description,
            amount: expense.amount,
        });

        setShowEdit(true);
    };

    const updateExpense = async () => {

        try {

            await api.put(
                `/shoot-expenses/${selectedExpense.id}`,
                form
            );

            toast.success(
                "Expense updated"
            );

            setShowEdit(false);

            fetchData();

        } catch {

            toast.error(
                "Failed to update expense"
            );

        }
    };

    const deleteExpense = async (id) => {

        if (
            !confirm(
                "Delete this expense?"
            )
        ) {
            return;
        }

        try {

            await api.delete(
                `/shoot-expenses/${id}`
            );

            toast.success(
                "Expense deleted"
            );

            fetchData();

        } catch {

            toast.error(
                "Failed to delete expense"
            );

        }
    };

    const filteredExpenses =
        expenses.filter((expense) =>
            expense.description
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    if (loading) {

        return (
            <Layout>
                <div className="
          py-32
          text-center
        ">
                    Loading Expenses...
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
                    font-semibold
                    text-sm
                  ">
                                        <Receipt size={14} />
                                        Expenses
                                    </div>

                                    <h1 className="
                    mt-4
                    text-4xl
                    font-bold
                  ">
                                        Shoot Expenses
                                    </h1>

                                    <p className="
                    mt-2
                    text-gray-500
                  ">
                                        Manage production
                                        expenses and costs
                                    </p>

                                </div>

                                <button
                                    onClick={() =>
                                        setShowCreate(true)
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
                    font-medium
                  "
                                >
                                    <Plus size={18} />
                                    Add Expense
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
                {/* FILTERS */}

                <div
                    className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            p-5
            shadow-sm
            mb-6
          "
                >

                    <div className="
            flex
            flex-col
            md:flex-row
            gap-4
          ">

                        <div className="
              relative
              flex-1
            ">

                            <Search
                                size={18}
                                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
                            />

                            <input
                                type="text"
                                placeholder="Search expenses..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                className="
                  w-full
                  pl-10
                  pr-4
                  py-3
                  border
                  border-gray-200
                  rounded-xl
                  outline-none
                  focus:ring-2
                  focus:ring-blue-100
                "
                            />

                        </div>

                    </div>

                </div>

                {/* TABLE */}

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

                                    <th className="
                    p-4
                    text-left
                  ">
                                        Category
                                    </th>

                                    <th className="
                    p-4
                    text-left
                  ">
                                        Shoot
                                    </th>

                                    <th className="
                    p-4
                    text-left
                  ">
                                        Description
                                    </th>

                                    <th className="
                    p-4
                    text-left
                  ">
                                        Amount
                                    </th>

                                    <th className="
                    p-4
                    text-left
                  ">
                                        Created At
                                    </th>

                                    <th className="
                    p-4
                    text-left
                  ">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredExpenses.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan={6}
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

                                    filteredExpenses.map(
                                        (expense) => {

                                            const shoot =
                                                shoots.find(
                                                    (s) =>
                                                        s.id ===
                                                        expense.shoot_id
                                                );

                                            return (

                                                <tr
                                                    key={expense.id}
                                                    className="
                            border-b
                            hover:bg-gray-50
                          "
                                                >

                                                    <td className="
                            p-4
                          ">
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

                                                    <td className="
                            p-4
                          ">
                                                        {shoot?.title ||
                                                            `Shoot #${expense.shoot_id}`}
                                                    </td>

                                                    <td className="
                            p-4
                          ">
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

                                                    <td className="
                            p-4
                          ">
                                                        {new Date(
                                                            expense.created_at
                                                        ).toLocaleDateString()}
                                                    </td>

                                                    <td className="
                            p-4
                          ">

                                                        <div
                                                            className="
                                flex
                                items-center
                                gap-2
                              "
                                                        >

                                                            <button
                                                                onClick={() =>
                                                                    openEdit(
                                                                        expense
                                                                    )
                                                                }
                                                                className="
                                  p-2
                                  rounded-lg
                                  bg-amber-50
                                  text-amber-600
                                "
                                                            >
                                                                <Pencil
                                                                    size={16}
                                                                />
                                                            </button>

                                                            <button
                                                                onClick={() =>
                                                                    deleteExpense(
                                                                        expense.id
                                                                    )
                                                                }
                                                                className="
                                  p-2
                                  rounded-lg
                                  bg-red-50
                                  text-red-600
                                "
                                                            >
                                                                <Trash2
                                                                    size={16}
                                                                />
                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>

                                            );
                                        }
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>
                {/* CREATE MODAL */}

                {showCreate && (

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
              max-w-xl
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
                                    Add Expense
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
                                        Shoot
                                    </label>

                                    <select
                                        value={form.shoot_id}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                shoot_id:
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
                                    >
                                        <option value="">
                                            Select Shoot
                                        </option>

                                        {shoots.map(
                                            (shoot) => (
                                                <option
                                                    key={shoot.id}
                                                    value={shoot.id}
                                                >
                                                    {shoot.title}
                                                </option>
                                            )
                                        )}
                                    </select>

                                </div>

                                <div>

                                    <label className="
                    block
                    mb-2
                    text-sm
                    font-medium
                  ">
                                        Category
                                    </label>

                                    <input
                                        value={form.category}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                category:
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
                                        placeholder="Transport"
                                    />

                                </div>

                                <div>

                                    <label className="
                    block
                    mb-2
                    text-sm
                    font-medium
                  ">
                                        Description
                                    </label>

                                    <textarea
                                        value={form.description}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                description:
                                                    e.target.value,
                                            })
                                        }
                                        rows={4}
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
                                        Amount
                                    </label>

                                    <input
                                        type="number"
                                        value={form.amount}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                amount:
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
                                        setShowCreate(false)
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
                                    onClick={createExpense}
                                    className="
                    px-5
                    py-3
                    rounded-xl
                    bg-blue-600
                    text-white
                  "
                                >
                                    Create Expense
                                </button>

                            </div>

                        </div>

                    </div>

                )}

                {/* EDIT MODAL */}

                {showEdit && (

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
              max-w-xl
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
                                    Edit Expense
                                </h3>
                            </div>

                            <div className="
                p-6
                space-y-4
              ">

                                <select
                                    value={form.shoot_id}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            shoot_id:
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
                                >
                                    {shoots.map(
                                        (shoot) => (
                                            <option
                                                key={shoot.id}
                                                value={shoot.id}
                                            >
                                                {shoot.title}
                                            </option>
                                        )
                                    )}
                                </select>

                                <input
                                    value={form.category}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            category:
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

                                <textarea
                                    rows={4}
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            description:
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

                                <input
                                    type="number"
                                    value={form.amount}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            amount:
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

                            <div className="
                p-6
                border-t
                flex
                justify-end
                gap-3
              ">

                                <button
                                    onClick={() =>
                                        setShowEdit(false)
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
                                    onClick={updateExpense}
                                    className="
                    px-5
                    py-3
                    rounded-xl
                    bg-blue-600
                    text-white
                  "
                                >
                                    Update Expense
                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </Layout>
    );
}