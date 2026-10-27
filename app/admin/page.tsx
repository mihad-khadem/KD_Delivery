
const stats = [
  {
    title: "Order Received",
    value: "716",
    subtitle: "Times",
    color: "bg-[#d9f2a8]",
  },
  {
    title: "Order Delivered",
    value: "692",
    subtitle: "Times",
    color: "bg-[#78c77b]",
  },
  {
    title: "Net Order Delivered",
    value: "1525",
    subtitle: "Times",
    color: "bg-[#79c87d]",
  },
  {
    title: "Net Earnings",
    value: "10230",
    subtitle: "Revenue",
    color: "bg-[#e4f5dc]",
  },
];

const orders = [
  {
    time: "20:45",
    customer: "Sheikhur Rahman",
    phone: "01832 72 219",
    items: "18 - Chicken Burger × 1, 18 - Veg Burger × 1",
    delivery: "Nikhil Sano",
    estimate: "03:57",
    status: "Taken",
  },
  {
    time: "20:32",
    customer: "Anika Sharma",
    phone: "018 321 71 01",
    items: "P13 - Pizza Margherita × 1, B19 - Chicken Burger × 1",
    delivery: "Alex Mat",
    estimate: "07:04",
    status: "Pending",
  },
  {
    time: "20:29",
    customer: "Wasim Mahfuz",
    phone: "018 320 82 22",
    items: "B19 - Chicken Burger × 2, P02 - Pepsi 250 ml × 1",
    delivery: "Robin Roy",
    estimate: "05:20",
    status: "Done",
  },
];

const orderedItems = [
  { name: "P13 - Pizza Margherita", category: "Pizza", quantity: 2, icon: "🍕" },
  { name: "B19 - Chicken Burger", category: "Burger", quantity: 1, icon: "🍔" },
  { name: "S63 - Apple Smoothie", category: "Drink", quantity: 2, icon: "🥤" },
  { name: "B14 - Veg Burger", category: "Burger", quantity: 1, icon: "🍔" },
  { name: "M60 - Blueberry Mojito", category: "Drink", quantity: 1, icon: "🧋" },
];

const chartBars = [
  { hour: "10 AM", onTime: 30, delayed: 12, cancelled: 5 },
  { hour: "11 AM", onTime: 48, delayed: 8, cancelled: 4 },
  { hour: "12 PM", onTime: 68, delayed: 14, cancelled: 6 },
  { hour: "1 PM", onTime: 82, delayed: 10, cancelled: 5 },
  { hour: "2 PM", onTime: 58, delayed: 15, cancelled: 4 },
  { hour: "3 PM", onTime: 64, delayed: 9, cancelled: 6 },
  { hour: "4 PM", onTime: 50, delayed: 11, cancelled: 3 },
  { hour: "5 PM", onTime: 43, delayed: 8, cancelled: 5 },
  { hour: "6 PM", onTime: 55, delayed: 12, cancelled: 4 },
];

function Panel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between px-4 pb-2 pt-4">
        <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function LiveMap() {
  return (
    <div className="relative h-[210px] overflow-hidden bg-[#e8eee7] sm:h-[230px]">
      <svg
        viewBox="0 0 400 250"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-label="Illustrative delivery map"
        role="img"
      >
        <rect width="400" height="250" fill="#edf1e9" />
        <path d="M-20 45 L420 205 M-20 120 L420 20 M30 -20 L190 270 M155 -20 L320 270 M330 -20 L220 270" stroke="#ffffff" strokeWidth="15" fill="none" />
        <path d="M-20 45 L420 205 M-20 120 L420 20 M30 -20 L190 270 M155 -20 L320 270 M330 -20 L220 270" stroke="#d8e2d6" strokeWidth="2" fill="none" />
        <path d="M15 250 Q85 190 125 135 T205 70 T400 35" stroke="#83cfa7" strokeWidth="4" fill="none" />
        <path d="M10 20 Q120 55 180 145 T410 220" stroke="#c5d5c5" strokeWidth="3" fill="none" />
        <path d="M80 0 L95 250 M270 0 L245 250 M0 175 L400 155" stroke="#dce5d9" strokeWidth="5" fill="none" />
        <circle cx="125" cy="135" r="7" fill="#50b97a" stroke="white" strokeWidth="3" />
        <circle cx="205" cy="70" r="7" fill="#50b97a" stroke="white" strokeWidth="3" />
        <circle cx="310" cy="170" r="7" fill="#e17d7d" stroke="white" strokeWidth="3" />
        <circle cx="85" cy="205" r="7" fill="#e17d7d" stroke="white" strokeWidth="3" />
      </svg>
      <div className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-3 py-2 text-xs text-gray-600 shadow-sm">
        <span className="mr-1 text-green-600">●</span> Active
        <span className="ml-3 mr-1 text-red-400">●</span> Delivery stops
      </div>
    </div>
  );
}

function OrderChart() {
  return (
    <div className="px-3 pb-3 pt-2">
      <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-gray-500">
        <span><span className="mr-1 text-teal-500">●</span>On time</span>
        <span><span className="mr-1 text-amber-400">●</span>Delayed</span>
        <span><span className="mr-1 text-red-400">●</span>Cancelled</span>
      </div>

      <div className="flex h-[160px] items-end justify-between gap-1 border-b border-l border-gray-100 px-1">
        {chartBars.map((bar) => (
          <div key={bar.hour} className="flex h-full flex-1 flex-col justify-end">
            <div className="flex h-full items-end justify-center gap-[2px]">
              <div
                className="w-[5px] rounded-t bg-teal-400"
                style={{ height: `${bar.onTime}%` }}
              />
              <div
                className="w-[5px] rounded-t bg-amber-400"
                style={{ height: `${bar.delayed}%` }}
              />
              <div
                className="w-[5px] rounded-t bg-red-400"
                style={{ height: `${bar.cancelled}%` }}
              />
            </div>
            <span className="mt-2 -rotate-45 origin-top-left whitespace-nowrap text-[8px] text-gray-400">
              {bar.hour}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-gray-400">
        Order time
      </p>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen space-y-4 bg-[#f0f6ef] p-1 sm:p-2">
      {/* Welcome message */}
      <section className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white px-4 py-3 shadow-sm">
        <p className="text-sm text-gray-600">
          Hello Admin, <span className="font-semibold text-gray-800">Welcome here</span>
        </p>
        <p className="text-xs text-gray-400">
          Dashboard overview
        </p>
      </section>

      {/* Statistics + map + chart */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="grid grid-cols-2 gap-3 xl:col-span-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className={`${stat.color} flex min-h-[112px] flex-col justify-between rounded-xl p-4 shadow-sm`}
            >
              <p className="max-w-[130px] text-xs font-medium text-gray-700">
                {stat.title}
              </p>
              <div>
                <p className="text-2xl font-extrabold tracking-tight text-gray-800 sm:text-3xl">
                  {stat.value}
                </p>
                <p className="text-[10px] text-gray-600">{stat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <Panel title="Live Map" className="xl:col-span-4">
          <LiveMap />
        </Panel>

        <Panel title="Today's Net Order Statistics" className="xl:col-span-4">
          <OrderChart />
        </Panel>
      </section>

      {/* Orders + ordered items */}
      <section className="grid grid-cols-1 items-start gap-4 xl:grid-cols-12">
        <Panel title="Order List" className="xl:col-span-8">
          <div className="overflow-x-auto px-3 pb-3">
            <table className="w-full min-w-[700px] text-left text-xs">
              <thead>
                <tr className="border-y border-gray-100 text-[10px] uppercase tracking-wide text-gray-400">
                  <th className="py-3 pr-3">Time</th>
                  <th className="py-3 pr-3">Customer Details</th>
                  <th className="py-3 pr-3">Items</th>
                  <th className="py-3 pr-3">Delivery</th>
                  <th className="py-3 pr-3">Est. Time</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.time} className="border-b border-gray-50 last:border-0">
                    <td className="py-4 pr-3 text-gray-600">{order.time}</td>
                    <td className="py-4 pr-3">
                      <p className="font-semibold text-gray-700">{order.customer}</p>
                      <p className="mt-1 text-[10px] text-gray-400">{order.phone}</p>
                    </td>
                    <td className="max-w-[180px] py-4 pr-3 leading-5 text-gray-500">
                      {order.items}
                    </td>
                    <td className="py-4 pr-3 text-gray-600">{order.delivery}</td>
                    <td className="py-4 pr-3 text-gray-500">{order.estimate}</td>
                    <td className="py-4">
                      <span
                        className={`rounded-md px-2 py-1 text-[10px] font-semibold ${
                          order.status === "Done"
                            ? "bg-green-50 text-green-700"
                            : order.status === "Pending"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-red-50 text-red-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Ordered Items" className="xl:col-span-4">
          <div className="divide-y divide-gray-50 px-4">
            {orderedItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 py-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0f6ef] text-xl">
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-gray-700">
                    {item.name}
                  </p>
                  <p className="mt-1 text-[10px] text-gray-400">
                    {item.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400">Quantity</p>
                  <p className="text-sm font-bold text-gray-700">
                    {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <p className="pb-3 text-center text-[10px] text-gray-400">
        KD Delivery Admin Dashboard · Demo data
      </p>
    </div>
  );
}
