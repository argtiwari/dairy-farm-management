import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CowDetailPanel } from "@/components/cows/cow-detail-panel";

type CowDetailPageProps = {
  params: Promise<{
    cowId: string;
  }>;
};

export default async function CowDetailPage({ params }: CowDetailPageProps) {
  const { cowId } = await params;

  return (
    <main className="min-h-screen bg-[#f8faf7] px-4 py-5 text-slate-900 sm:px-6">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        <header className="rounded-[24px] border border-emerald-100 bg-white p-4 shadow-sm sm:p-5">
          <Link className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700" href="/cows">
            <ArrowLeft className="h-4 w-4" />
            Back to animals
          </Link>
          <h1 className="mt-3 text-2xl font-black text-slate-950">Cow profile</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Review the animal quickly, then jump to milk, health, pregnancy, or vaccination details.
          </p>
        </header>

        <CowDetailPanel cowId={cowId} />
      </section>
    </main>
  );
}
