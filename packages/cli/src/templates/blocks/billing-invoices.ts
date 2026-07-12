// deno-lint-ignore-file
export const template = `import { cn } from '@/lib/utils'

interface Invoice { id: string; date: string; amount: string; status: 'paid' | 'pending' | 'failed' | 'refunded'; description?: string; downloadUrl?: string }

export function BillingInvoices({ invoices, currentPlan, onUpgrade, className }: { invoices: Invoice[]; currentPlan?: { name: string; price: string; nextBilling: string }; onUpgrade?: () => void; className?: string }) {
  const statusStyles: Record<Invoice['status'], string> = {
    paid: 'bg-emerald-500/10 text-emerald-600',
    pending: 'bg-amber-500/10 text-amber-600',
    failed: 'bg-rose-500/10 text-rose-600',
    refunded: 'bg-muted text-muted-foreground',
  }
  return (
    <div className={cn('mx-auto max-w-5xl space-y-6 p-6', className)}>
      <div><h1 className="text-2xl font-bold tracking-tight">Billing & invoices</h1><p className="mt-1 text-sm text-muted-foreground">Manage your subscription and download past invoices.</p></div>
      {currentPlan && (
        <div className="rounded-xl border bg-card p-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Current plan</span>
            <h2 className="mt-1 text-lg font-bold">{currentPlan.name}</h2>
            <p className="text-sm text-muted-foreground">{currentPlan.price} · Next billing on {currentPlan.nextBilling}</p>
          </div>
          <button onClick={onUpgrade} className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Upgrade plan</button>
        </div>
      )}
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b"><h2 className="text-base font-semibold">Invoice history</h2></div>
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              {['Invoice', 'Date', 'Amount', 'Status', ''].map(h => <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id} className="border-t hover:bg-accent/20">
                <td className="px-6 py-3.5 text-sm font-medium font-mono">{inv.id}</td>
                <td className="px-6 py-3.5 text-sm text-muted-foreground">{inv.date}</td>
                <td className="px-6 py-3.5 text-sm font-semibold tabular-nums">{inv.amount}</td>
                <td className="px-6 py-3.5"><span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold capitalize', statusStyles[inv.status])}>{inv.status}</span></td>
                <td className="px-6 py-3.5 text-right">{inv.downloadUrl && <a href={inv.downloadUrl} className="text-xs font-medium text-primary hover:underline">Download</a>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
`;
