import { COLORS } from "@/lib/theme";

export default function SiteFooter() {
  return (
    <footer style={{ background: COLORS.slate, color: COLORS.paperDim }}>
      <div className="px-6 md:px-12 py-16 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Column 1 — Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="NEC Logo" className="w-8 h-8 object-contain" />
            <span className="font-bold text-sm" style={{ color: COLORS.paper }}>Netreshwori Engineering Consultancy</span>
          </div>
          <p className="text-xs leading-relaxed mb-5" style={{ color: COLORS.textDim }}>
            Delivering reliable, sustainable and modern engineering design and
            consultancy services across Nepal.
          </p>
          <div className="flex gap-3">
            {/* Replace href="#" with real profile links once available */}
            <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full flex items-center justify-center text-xs" style={{ background: COLORS.slateSoft, color: COLORS.orange }}>f</a>
            <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full flex items-center justify-center text-xs" style={{ background: COLORS.slateSoft, color: COLORS.orange }}>in</a>
            <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full flex items-center justify-center text-xs" style={{ background: COLORS.slateSoft, color: COLORS.orange }}>ig</a>
          </div>
        </div>

        {/* Column 2 — Services */}
        <div>
          <div className="text-xs font-bold tracking-widest mb-4" style={{ color: COLORS.orange, fontFamily: "'JetBrains Mono'" }}>SERVICES</div>
          <ul className="space-y-2 text-sm">
            <li><a href="/services">Planning &amp; Design</a></li>
            <li><a href="/services">Project Management</a></li>
            <li><a href="/services">Operations &amp; Services</a></li>
          </ul>
        </div>

        {/* Column 3 — Quick Links */}
        <div>
          <div className="text-xs font-bold tracking-widest mb-4" style={{ color: COLORS.orange, fontFamily: "'JetBrains Mono'" }}>QUICK LINKS</div>
          <ul className="space-y-2 text-sm">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/projects">Our Projects</a></li>
            <li><a href="/careers">Careers</a></li>
          </ul>
        </div>

        {/* Column 4 — Contact */}
        <div>
          <div className="text-xs font-bold tracking-widest mb-4" style={{ color: COLORS.orange, fontFamily: "'JetBrains Mono'" }}>CONTACT</div>
          <ul className="space-y-2 text-sm">
            <li>Sitapaila, Kathmandu, Nepal</li>
            <li><a href="tel:+9779851217152">+977-9851217152</a></li>
            <li><a href="mailto:NetreshworiConsultancy@gmail.com">NetreshworiConsultancy@gmail.com</a></li>
          </ul>
        </div>
      </div>

      <div
        className="px-6 md:px-12 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs"
        style={{ borderTop: `1px solid ${COLORS.slateLine}`, color: COLORS.textDim }}
      >
        <span>© 2026 Netreshwori Engineering Consultancy Pvt. Ltd. — Reg. No. 148074/72/73. All Rights Reserved.</span>
        <span className="flex gap-4">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms &amp; Conditions</a>
        </span>
      </div>
    </footer>
  );
}
