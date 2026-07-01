// import {
//   Beef,
//   Milk,
//   Wallet,
//   ShieldAlert,
// } from "lucide-react";

// export function FarmOverview() {

//   return (

//     <section className="grid grid-cols-2 gap-4">

//       <StatCard
//         title="Animals"
//         value="42"
//         icon={<Beef size={22} />}
//       />

//       <StatCard
//         title="Today's Milk"
//         value="315L"
//         icon={<Milk size={22} />}
//       />

//       <StatCard
//         title="Profit"
//         value="₹21.5k"
//         icon={<Wallet size={22} />}
//       />

//       <StatCard
//         title="Alerts"
//         value="3"
//         icon={<ShieldAlert size={22} />}
//       />

//     </section>

//   );

// }

// function StatCard({
//   title,
//   value,
//   icon,
// }: {
//   title: string;
//   value: string;
//   icon: React.ReactNode;
// }) {
//   return (
//     <div className="rounded-3xl bg-white p-5 shadow-sm border border-[#E8EFE8]">

//       <div className="flex items-center justify-between">

//         <div>

//           <p className="text-sm text-slate-500">
//             {title}
//           </p>

//           <h2 className="mt-3 text-3xl font-black text-slate-900">
//             {value}
//           </h2>

//         </div>

//         <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">

//           {icon}

//         </div>

//       </div>

//     </div>
//   );
// }