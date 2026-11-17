export function SiteFooter() {
  return (
    <footer className="mt-auto">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>MHZ Design Office · Web licenses, domain-locked, updates included.</p>
        <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </footer>
  );
}
