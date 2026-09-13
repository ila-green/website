import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

function Navigation() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <nav className="flex items-center justify-between gap-4 h-16 md:h-20">
          <Link href="/">
            <a className="flex items-center gap-2" aria-label="Ila Green home">
              <img
                src="/Logo.png"
                alt="Ila Green"
                className="w-32 h-32 object-contain"
              />
            </a>
          </Link>

          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default function FAQPage() {
  const faqs = [
    {
      q: "Is this work eligible under India's CSR framework?",
      a: "ILA Green's interventions support environmental sustainability objectives aligned with Schedule VII of the Companies Act, subject to how the client integrates outcomes into their broader CSR strategy. Final applicability rests with the client's CSR committee and auditors."
    },
    {
      q: "Can your reports be used in ESG disclosures or annual reports?",
      a: "Yes. Our reports are structured to support internal ESG reporting, sustainability disclosures, and stakeholder communication. All data is supported by on-ground measurement and vendor documentation."
    },
    {
      q: "How is the data collected and verified?",
      a: "Data is collected through on-site audits, waste segregation, and weight-based measurement. It is cross-verified with vendor processing confirmations and internal validation checks."
    },
    {
      q: "Will this disrupt our daily operations?",
      a: "No. Audits and segregation are planned to minimise disruption. Engagements are designed to integrate with existing workflows wherever possible."
    },
    {
      q: "Do you handle e-waste?",
      a: "No. ILA Green does not handle e-waste or e-waste reporting."
    },
    {
      q: "How long does an engagement last?",
      a: "Engagements are typically scope-defined (One-time/ Monthly/ Annual). Timelines are agreed upfront based on site size, waste profile, and demand."
    },
    {
      q: "Do you guarantee zero landfill waste?",
      a: "No. We work towards maximum landfill diversion that is practically achievable for each site. All outcomes are reported transparently."
    },
    {
      q: "What about pricing and commercials?",
      a: "Commercials are defined based on site size, waste profile, duration, and reporting requirements."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Clear answers to common questions about our services and approach
            </p>
          </div>

          <div className="space-y-4 mb-12">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6 md:p-8">
                <h3 className="font-semibold text-lg mb-3 flex items-start gap-2">
                  <span className="text-primary mt-1">Q{index + 1}.</span>
                  {faq.q}
                </h3>
                <p className="text-muted-foreground pl-8">
                  {faq.a}
                </p>
              </Card>
            ))}
          </div>

          <Card className="p-6 md:p-8 bg-primary/5 border-primary/20 text-center">
            <h3 className="text-xl font-semibold mb-3">Still have questions?</h3>
            <p className="text-muted-foreground mb-4">
              We're here to help. Contact us for more information about our services.
            </p>
            <Link href="/#contact">
              <Button size="lg">
                Get in Touch
              </Button>
            </Link>
          </Card>
        </div>
      </main>
    </div>
  );
}
