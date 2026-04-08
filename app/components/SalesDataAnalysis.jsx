"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { TrendingUp } from "lucide-react";

const monthlySales = [
  { month: "Oct", sales: 245 },
  { month: "Nov", sales: 278 },
  { month: "Dec", sales: 312 },
  { month: "Jan", sales: 289 },
  { month: "Feb", sales: 334 },
  { month: "Mar", sales: 398 },
];

const brandShare = [
  { name: "Toyota", value: 18.2 },
  { name: "VW", value: 14.5 },
  { name: "Hyundai", value: 12.8 },
  { name: "Ford", value: 11.3 },
  { name: "Honda", value: 9.7 },
  { name: "Others", value: 33.5 },
];

const evTrend = [
  { month: "Oct", value: 12.5 },
  { month: "Nov", value: 13.8 },
  { month: "Dec", value: 14.2 },
  { month: "Jan", value: 15.7 },
  { month: "Feb", value: 16.9 },
  { month: "Mar", value: 18.2 },
];

export default function SalesDataAnalysis() {
  return (
    <section className="container mx-auto px-6 py-16">
      
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-4xl font-bold text-neutral-900 mb-2">
          Sales Data Analysis
        </h2>
        <p className="text-neutral-600">
          Monthly trends and market performance
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Monthly Sales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg shadow-neutral-200/50 border border-neutral-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-neutral-900 mb-1">
                Monthly Sales
              </h3>

              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-neutral-900">
                  398K
                </span>

                <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  +19.2%
                </span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlySales}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#999" fontSize={12} />
              <YAxis stroke="#999" fontSize={12} />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />

              <Area
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Brand Share */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg shadow-neutral-200/50 border border-neutral-100"
        >
          <div className="mb-6">
            <h3 className="font-bold text-neutral-900 mb-1">
              Market Share by Brand
            </h3>
            <p className="text-sm text-neutral-500">
              Top 5 manufacturers
            </p>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={brandShare}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#999" fontSize={11} />
              <YAxis stroke="#999" fontSize={12} />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />

              <Bar
                dataKey="value"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* EV Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg shadow-neutral-200/50 border border-neutral-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-neutral-900 mb-1">
                EV Market Share
              </h3>

              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-neutral-900">
                  18.2%
                </span>

                <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  +5.7%
                </span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={evTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#999" fontSize={12} />
              <YAxis stroke="#999" fontSize={12} />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

      </div>
    </section>
  );
}