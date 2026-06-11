<div className="bg-white rounded-3xl border border-slate-200 p-8">

    <div className="flex items-center justify-between mb-6">

        <div>

            <div className="
    mb-5
    rounded-2xl
    bg-blue-50
    border
    border-blue-100
    p-4
">

                <div className="
        flex
        justify-between
        items-center
    ">

                    <span className="
            text-sm
            font-medium
            text-slate-600
        ">
                        Selected Inventory
                    </span>

                    <span className="
            text-lg
            font-black
            text-blue-600
        ">
                        Rs {
                            shootExpenses

                                .filter(expense =>
                                    selectedExpenses.includes(
                                        expense.id
                                    )
                                )

                                .reduce(
                                    (sum, expense) =>
                                        sum +
                                        Number(
                                            expense.amount || 0
                                        ),
                                    0
                                )

                                .toLocaleString()
                        }
                    </span>

                </div>

            </div>

            <h2 className="text-xl font-bold">
                Inventory
            </h2>

            <p className="text-sm text-slate-500 mt-1">
                Checked crew members will automatically be added to this invoice.
            </p>

        </div>

    </div>

    {!shoot?.inventory_usages?.length ? (

        <div className="text-center text-slate-400 py-8">
            No crew members found for this shoot
        </div>

    ) : (

        <div className="space-y-3">

            <div className="
    mb-4
    rounded-2xl
    bg-slate-50
    p-4
">

                <div className="
        flex
        justify-between
        text-sm
    ">

                    <span>
                        Selected Crew Members
                    </span>

                    <span className="
            font-bold
            text-blue-600
        ">
                        Rs {
                            shoot?.inventory_usages

                                ?.filter(member =>
                                    selectedInventory.includes(
                                        member.id
                                    )
                                )

                                ?.reduce(
                                    (sum, member) =>
                                        sum +
                                        Number(
                                            item.item?.daily_rental_value || 0
                                        ) *
                                        Number(
                                            item.quantity || 1
                                        ),
                                    0
                                )

                                ?.toLocaleString()
                        }
                    </span>

                </div>

            </div>
            {shoot?.inventory_usages?.map(member => (

                <label
                    key={member.id}
                    className={`
        flex
        items-center
        justify-between
        rounded-2xl
        border
        p-4
        cursor-pointer
        transition-all
                                        ${selectedInventory.includes(
                        member.id
                    )
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }
    `}
                >

                    <div className="flex items-center gap-4">

                        <input
                            type="checkbox"
                            className="
        h-5
        w-5
        rounded
        border-slate-300
        text-blue-600
    "
                            checked={
                                selectedInventory.includes(
                                    member.id
                                )
                            }
                            onChange={() => {

                                setSelectedInventory(
                                    prev =>
                                        prev.includes(
                                            member.id
                                        )
                                            ? prev.filter(
                                                id =>
                                                    id !== member.id
                                            )
                                            : [
                                                ...prev,
                                                member.id
                                            ]
                                );

                            }}
                        />

                        <div>

                            <div className="font-semibold">
                                {item.item?.name}
                            </div>

                            <div className="text-sm text-slate-500">
                                Qty: {item.quantity}
                            </div>

                        </div>

                    </div>

                    <div className="font-bold text-blue-600">
                        Rs{" "}
                        {(
                            Number(
                                item.item?.daily_rental_value || 0
                            ) *
                            Number(
                                item.quantity || 1
                            )
                        ).toLocaleString()}
                    </div>

                </label>

            ))}

        </div>

    )}

</div>