"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import CommonDataTable from "@/app/components/CommonTable";

import {
  Download,
  Search,
  RefreshCcw,
} from "lucide-react";

export default function ContactLeadsPage() {

  const [rows, setRows] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  // =========================
  // ✅ TABLE COLUMNS
  // =========================
  const columns = [

    {
      field: "id",
      headerName: "ID",
      width: 80,
    },

    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    {
      field: "phone",
      headerName: "Phone",
      width: 170,
    },

    {
      field: "message",
      headerName: "Message",
      flex: 1.5,
    },

    {
      field: "createdAt",
      headerName:
        "Created At",
      width: 170,
    },
  ];

  // =========================
  // ✅ FETCH CONTACTS
  // =========================
  async function fetchContacts() {

    try {

      setLoading(true);

      const res = await fetch(
        "/api/contact"
      );

      const data =
        await res.json();

      // ✅ FORMAT ROWS
      const formattedRows =
        data.contacts.map(
          (item, index) => ({

            id:
              index + 1,

            name:
              item.name,

            email:
              item.email,

            phone:
              item.phone,

            message:
              item.message,

            createdAt:
              new Date(
                item.createdAt
              ).toLocaleDateString(
                "en-IN"
              ),
          })
        );

      setRows(
        formattedRows
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {

    fetchContacts();

  }, []);

  // =========================
  // ✅ SEARCH FILTER
  // =========================
  const filteredRows =
    useMemo(() => {

      return rows.filter(
        (item) => {

          return (

            item.name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            item.email
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            item.phone
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )
          );
        }
      );

    }, [rows, search]);

  // =========================
  // ✅ EXPORT CSV
  // =========================
  function exportCSV() {

    const headers = [
      "Name",
      "Email",
      "Phone",
      "Message",
      "Created At",
    ];

    const csvRows =
      filteredRows.map(
        (row) => [

          row.name,

          row.email,

          row.phone,

          row.message,

          row.createdAt,
        ]
      );

    const csvContent = [

      headers.join(","),

      ...csvRows.map(
        (e) => e.join(",")
      ),
    ].join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type:
          "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.setAttribute(
      "download",
      "contact-leads.csv"
    );

    document.body.appendChild(
      link
    );

    link.click();

    document.body.removeChild(
      link
    );
  }

  return (

    <div className="space-y-6">

      {/* ========================= */}
      {/* ✅ TOP HEADER */}
      {/* ========================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        {/* LEFT */}
        <div>

          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">

            Contact Leads

          </h1>

          <p className="text-gray-500 mt-2">

            Manage all customer enquiries from your website

          </p>

        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3">

          {/* SEARCH */}
          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="h-12 w-full sm:w-72 pl-11 pr-4 rounded-2xl border border-gray-200 bg-white dark:bg-[#18181b] dark:border-white/10 outline-none focus:ring-2 focus:ring-black dark:text-white"
            />

          </div>

          {/* REFRESH */}
          <button
            onClick={
              fetchContacts
            }
            className="h-12 px-5 rounded-2xl border border-gray-200 bg-white dark:bg-[#18181b] dark:border-white/10 flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition"
          >

            <RefreshCcw
              size={18}
            />

            Refresh

          </button>

          {/* EXPORT */}
          <button
            onClick={
              exportCSV
            }
            className="h-12 px-5 rounded-2xl bg-black text-white flex items-center justify-center gap-2 hover:opacity-90 transition"
          >

            <Download
              size={18}
            />

            Export CSV

          </button>

        </div>

      </div>
      {/* ========================= */}
      {/* ✅ TABLE */}
      {/* ========================= */}

      <div className="bg-white dark:bg-[#18181b] rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden p-3">

        <CommonDataTable
          rows={filteredRows}
          columns={columns}
          loading={loading}
          checkboxSelection
        />

      </div>

    </div>
  );
}