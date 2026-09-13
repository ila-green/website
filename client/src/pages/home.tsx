import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  Leaf,
  FileText,
  FileBarChart,
  GraduationCap,
  Store,
  Building2,
  PartyPopper,
  Recycle,
  Filter,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Lightbulb,
  Cog,
  TrendingUp,
  Search,
  Handshake,
  Clock,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

// import heroImage from "@assets/stock_images/professional_office__2c521617.jpg";
import heroImageDesktop from "@assets/stock_images/ila-green-landing-bg-large.png";
import heroImageMobile from "@assets/stock_images/ila-green-landing-bg-mobile.png";

function CountUpNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1600,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasAnimated) return;

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [hasAnimated, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-lg border-b"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6">
        <nav className="flex items-center justify-between gap-4 h-16 md:h-20">
          <a
            href="#"
            className="flex items-center gap-2"
            data-testid="link-logo"
            aria-label="Ila Green home"
          >
            <img
              src="/Logo.png"
              alt="Ila Green"
              className="w-32 h-32 object-contain"
            />
          </a>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-services"
            >
              Why ILA Green
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-process"
            >
              How We Work
            </button>
            {/* <button
              onClick={() => scrollToSection("pilot")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-pilot"
            >
              Pilot Engagements
            </button> */}
            <Link href="/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-faq">
              FAQ
            </Link>
            <Button
              onClick={() => scrollToSection("contact")}
              data-testid="button-contact-nav"
            >
              Contact Us
            </Button>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </nav>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-b">
            <button
              onClick={() => scrollToSection("services")}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
              data-testid="link-services-mobile"
            >
              Why ILA Green
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
              data-testid="link-process-mobile"
            >
              How We Work
            </button>
            {/* <button
              onClick={() => scrollToSection("pilot")}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
              data-testid="link-pilot-mobile"
            >
              Pilot Engagements
            </button> */}
            <Link href="/faq" className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors" data-testid="link-faq-mobile">
              FAQ
            </Link>
            <Button
              className="w-full mt-2"
              onClick={() => scrollToSection("contact")}
              data-testid="button-contact-mobile"
            >
              Contact Us
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Image layer. Mobile: a plain `height` bounded by clamp() — tied to viewport height, not
          image aspect ratio, and floored/capped so text always has room in the first viewport.
          (Two earlier approaches were both broken: `aspect-ratio` + `max-height` together make
          Chrome shrink the box's WIDTH to preserve the ratio once height is capped; and a
          padding-top-percentage box can't be capped by max-height at all, since padding always
          wins over height/max-height regardless of the box's specified height.)
          Desktop: padding-top hack reproduces the image's native ratio exactly, uncropped.
          Mobile crop is anchored to the bottom of the source image (object-bottom) so what's
          cut off is the empty sky at the top, not the monument/volunteers lower in the frame. */}
      <div className="relative w-full h-[clamp(420px,78svh,620px)] md:h-0 md:pt-[56.27%]">
        <picture>
          <source media="(min-width: 768px)" srcSet={heroImageDesktop} />
          <img
            src={heroImageMobile}
            alt="ILA Green waste management operations"
            className="absolute inset-0 w-full h-full object-cover object-bottom"
            loading="eager"
          />
        </picture>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:hidden" />
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-end md:items-center">
        <div className="relative w-full max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6 py-10 md:py-20 lg:py-24">
          <div className="max-w-5xl text-left">
            <Badge className="mb-4 md:mb-6 bg-white/10 text-white border-white/20 backdrop-blur-md" data-testid="badge-trust">
              <Leaf className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="sm:hidden">Delhi NCR Waste Management Partner</span>
              <span className="hidden sm:inline">Delhi NCR's Execution-Led Circular Waste Management Partner</span>
            </Badge>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 md:mb-6 text-white"
              data-testid="text-hero-headline"
            >
              Measured Waste Reduction{" "}
              <br />
              <span className="text-green-400">Credible Evidence-backed Impact</span>
            </h1>

            <p
              className="text-lg md:text-xl text-white/90 max-w-2xl mb-6 md:mb-8"
              data-testid="text-hero-subheadline"
            >
              Circular waste management and ESG sustainable solutions.
              {/* We focus on supporting organisations with audit, recover and measure waster through evidence-backed operational systems. */}
              {/* Execution-led waste audits and ESG reporting for Delhi NCR organisations.
              We focus on measurable & practical interventions at the source, not
              theoretical sustainability claims. */}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-lg px-8"
                onClick={() => {
                  const element = document.getElementById("contact");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                data-testid="button-hero-cta"
              >
                Request Engagement
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-white/10 text-white border-white/30 backdrop-blur-md hover:bg-white/20"
                onClick={() => {
                  const element = document.getElementById("process");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                data-testid="button-hero-secondary"
              >
                How We Work
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" /> */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

function ImpactIntroSection() {
  return (
    <section className="py-16 md:py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Reducing Landfill Burden Through Measured Action</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Delhi's landfills are operating far beyond capacity. We help organisations reduce the waste they contribute through 
            on-ground audits, verified recycling, and transparent reporting.
          </p>
        </div>
      </div>
    </section>
  );
}

function WhyIlaGreenSection() {
  const services = [
    {
      icon: ClipboardList,
      title: "On-Site Waste Audits",
      description: "Physical assessment of waste generated at your premises (offices, commercial spaces, or venues). Waste is measured by category using a weight-based evaluation method.",
      features: [
        "Complete waste stream mapping",
        "Weight-based measurement by category",
        "Visual and documentary evidence",
      ],
    },
    {
      icon: Recycle,
      title: "Circular Waste Strategy",
      description: "Practical, on-ground interventions to reduce landfill dependency. Segregation at source, verified recycling, and transparent reporting.",
      features: [
        "Segregation at source",
        "Verified recycling partners",
        "Transparent reporting with documentary evidence",
      ],
    },
    {
      icon: Filter,
      title: "Structured Segregation and Recycling",
      description: "On-site segregation supported by trained project workers. Recyclable waste channeled through verified vendors with statutory registrations.",
      features: [
        "Trained segregation support",
        "Verified recycling partners",
        "Vendor compliance documentation",
      ],
    },
    {
      icon: FileText,
      title: "Impact Reporting",
      description: "Data-backed impact reports suitable for ESG/CSR reporting & disclosures, and stakeholder communication. All data supported by on-ground measurement.",
      features: [
        "Waste diverted from landfill (%)",
        "Carbon impact reduction estimates",
        "Audit-ready documentation",
      ],
    },
    // {
    //   icon: TrendingUp,
    //   title: "Pilot Engagements Available",
    //   description: "Short-term pilot projects to establish baseline data, test workflows, and deliver a complete impact report at a reduced commercial model.",
    //   features: [
    //     "Baseline waste data establishment",
    //     "Process validation and refinement",
    //     "Full impact report included",
    //   ],
    // },
  ];

  return (
    <section id="services" className="py-16 md:py-20 lg:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-services-title">
            Why ILA Green
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="text-center" data-testid="metric-waste">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-1">
              <CountUpNumber value={210.8} decimals={1} suffix=" kg" />
            </div>
            <div className="text-sm md:text-base text-muted-foreground font-medium">
              Total Waste Collected
            </div>
          </div>

          <div className="text-center" data-testid="metric-recyclables">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-1">
              <CountUpNumber value={32.3} decimals={1} suffix=" kg" />
            </div>
            <div className="text-sm md:text-base text-muted-foreground font-medium">
              Total Recyclables Segregated
            </div>
          </div>

          <div className="text-center" data-testid="metric-recovery-rate">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-1">
              <CountUpNumber value={56.2} decimals={1} prefix="+" suffix="%" />
            </div>
            <div className="text-sm md:text-base text-muted-foreground font-medium">
              Relative Improvement in Recovery Rate
            </div>
          </div>

          <div className="text-center" data-testid="metric-recovery-hour">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-1">
              <CountUpNumber value={11.57} decimals={2} suffix=" kg/hr" />
            </div>
            <div className="text-sm md:text-base text-muted-foreground font-medium">
              Average Recyclables Recovered per Operating Hour
            </div>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <br /><br />
          <p className="text-lg text-muted-foreground" data-testid="text-services-subtitle">
            ILA Green provides execution-led waste management services combined with data-backed impact reporting.<br/>
            <span className="text-sm mt-2 inline-block">Note: ILA Green does not handle e-waste.</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="p-6 md:p-8 hover-elevate transition-all duration-300"
              data-testid={`card-service-${index}`}
            >
              <service.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl md:text-2xl font-semibold mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoWeWorkWithSection() {
  const clientTypes = [
    {
      icon: Building2,
      title: "Corporate Offices & IT Parks",
      description: "Business parks, corporate campuses, and co-working spaces looking to reduce landfill dependency and meet ESG reporting requirements.",
    },
    {
      icon: GraduationCap,
      title: "Educational Institutions",
      description: "Schools, colleges, and universities seeking to implement sustainable waste management practices.",
    },
    {
      icon: Store,
      title: "Retail & Commercial Establishments",
      description: "Retail chains and commercial venues preparing for ESG disclosures and stakeholder reporting.",
    },
    {
      icon: PartyPopper,
      title: "Corporate Events & Concerts",
      description: "Event organizers and venues aiming to minimize waste and demonstrate sustainability impact through measurable outcomes.",
    },
  ];

  return (
    <section id="who-we-serve" className="py-16 md:py-20 lg:py-24 bg-muted/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-clients-title">
            Who We Work With
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-clients-subtitle">
            ILA Green currently serves organisations that want real, defensible sustainability outcomes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {clientTypes.map((client, index) => (
            <Card
              key={client.title}
              className="p-6 md:p-8 hover:shadow-lg transition-all duration-300"
              data-testid={`card-client-${index}`}
            >
              <client.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl md:text-2xl font-semibold mb-3">
                {client.title}
              </h3>
              <p className="text-muted-foreground">
                {client.description}
              </p>
            </Card>
          ))}
        </div>
        
        <div className="mt-12">
          <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
            <h3 className="text-xl font-semibold mb-3">Our services are ideal for organisations that:</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Are preparing for ESG disclosures or audits</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Need verifiable CSR contributions</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Want to reduce landfill dependency</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Prefer on-ground execution over desk-based consulting</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function PilotEngagementSection() {
  return (
    <section id="pilot" className="py-16 md:py-20 lg:py-24 bg-muted/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4">Limited Availability</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Pilot Engagements
          </h2>
          <p className="text-lg text-muted-foreground">
            To build robust, scalable processes, ILA Green offers limited pilot engagements at a <strong>discounted commercial model</strong>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-primary" />
              Why Pilots?
            </h3>
            <p className="text-muted-foreground mb-4">
              Pilot projects allow both ILA Green and the client to:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Establish baseline waste data</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Test segregation and vendor workflows</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Identify operational gaps</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Align reporting formats with requirements</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              What a Pilot Includes
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span><strong>Defined short-term engagement</strong> with clear scope</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span><strong>Full on-site audit</strong> and segregation support</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span><strong>Waste measurement</strong> by category</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span><strong>Recycling</strong> through verified vendors</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span><strong>End-of-pilot ESG/CSR impact report</strong></span>
              </li>
            </ul>
          </Card>
        </div>

        <Card className="p-6 md:p-8 text-center bg-gradient-to-r from-primary/10 to-primary/5">
          <p className="text-lg mb-4">
            Pilot clients receive the same execution standards and reporting discipline as full-scale engagements.
          </p>
          <Button size="lg" onClick={() => {
            const element = document.getElementById("contact");
            if (element) element.scrollIntoView({ behavior: "smooth" });
          }}>
            Request Pilot Engagement
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Card>
      </div>
    </section>
  );
}

function WhyChooseSection() {
  const values = [
    {
      icon: CheckCircle2,
      title: "Physical Audits",
      description: "On-ground execution, not abstract consulting. We work at your premises with real, measured data.",
    },
    {
      icon: BarChart3,
      title: "Measured Data",
      description: "Weight-based evaluations and verified processing. Every metric is backed by documentary evidence.",
    },
    {
      icon: Cog,
      title: "Verified Processing",
      description: "All recycling vendors are checked for statutory registrations and compliance documentation.",
    },
    {
      icon: TrendingUp,
      title: "Transparent Reporting",
      description: "Audit-ready reports suitable for ESG/CSR reporting & disclosures, and stakeholder communication.",
    },
  ];

  return (
    <section id="why-us" className="py-16 md:py-20 lg:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-whyus-title">
            Why ILA Green
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-whyus-subtitle">
            ILA Green was founded with a clear intent: to bridge the gap between on-ground waste handling and credible sustainability reporting. 
            <strong className="block mt-2">Practical impact, measurable outcomes, and credible reporting — not theoretical sustainability claims.</strong>
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-8">
          {values.map((value, index) => (
            <Card
              key={value.title}
              className="p-6 md:p-8 hover:shadow-lg transition-shadow"
              data-testid={`card-value-${index}`}
            >
              <value.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>

        {/* <Card className="p-6 md:p-8 bg-card border-2">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Geography: Delhi NCR Only</h3>
              <p className="text-muted-foreground">
                ILA Green currently operates exclusively in Delhi NCR. This focused geography allows us to maintain operational control, 
                verify vendors closely, and deliver consistent execution quality. Expansion will be considered only after processes are proven and refined.
              </p>
            </div>
          </div>
        </Card> */}
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Understand",
      points: ["Waste generation", "Waste streams", "Collection points", "Waste movement", "Stakeholders"],
    },
    {
      number: "02",
      icon: Lightbulb,
      title: "Waste Strategy",
      points: ["Segregation plan", "Colour coding", "Signage", "SoPs", "Collection route"],
    },
    {
      number: "03",
      icon: Cog,
      title: "Operate",
      points: ["Collection", "Segregation", "Quality checks", "Weighing"],
    },
    {
      number: "04",
      icon: Handshake,
      title: "Coordinate",
      points: ["Aggregator", "Recycler", "MCD / DDA", "EPR partners"],
    },
    {
      number: "05",
      icon: FileBarChart,
      title: "Reporting",
      points: ["Dashboard", "Evidence", "Impact", "Recommendations"],
    },
  ];

  return (
    <section id="process" className="py-16 md:py-20 lg:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-process-title">
            How We Work
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-process-subtitle">
            A structured 5-step approach ensuring credibility, traceability, and audit readiness
          </p>
        </div>
        
        {/* Process Visual Strip */}
        <div className="mb-12 flex justify-center">
          <Card className="inline-block p-4 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-2 text-sm font-medium flex-wrap justify-center">
              <span className="flex items-center gap-1">
                <ClipboardList className="w-4 h-4 text-primary" />
                Audit
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="flex items-center gap-1">
                <Lightbulb className="w-4 h-4 text-primary" />
                Design
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="flex items-center gap-1">
                <Cog className="w-4 h-4 text-primary" />
                Execution
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="flex items-center gap-1">
                <Recycle className="w-4 h-4 text-primary" />
                Recovery
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="flex items-center gap-1">
                <FileBarChart className="w-4 h-4 text-primary" />
                Report
              </span>
            </div>
          </Card>
        </div>
        
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative" data-testid={`step-${index}`}>
                <Card className="p-5 sm:p-6 text-left sm:text-center relative z-10 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-3 sm:flex-col sm:gap-0 sm:mb-0">
                    <div className="inline-flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-primary text-primary-foreground font-bold text-sm sm:text-lg sm:mb-4 flex-shrink-0">
                      {step.number}
                    </div>
                    <step.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary sm:mx-auto sm:mb-3 flex-shrink-0" />
                    <h3 className="text-base sm:text-xl font-semibold sm:mb-3">{step.title}</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1.5 text-left">
                    {step.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", company: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-20 lg:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Get Started
          </h2>
          <p className="text-lg text-muted-foreground">
            Ready to reduce landfill waste and build credible ESG/CSR impact? Let's talk.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6">Send Us a Query</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tell us about your waste management needs..."
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Query"}
              </Button>

              {submitStatus === "success" && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                  Thank you! Your query has been sent successfully. We'll get back to you within 24-48 hours.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                  Sorry, there was an error sending your query. Please email us directly at info@ilagreen.com
                </div>
              )}
            </form>
          </Card> */}

          <Card className="p-8 bg-primary/5 border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Request Information</h3>
            <p className="text-muted-foreground mb-6">
              {/* Interested in a pilot engagement or want to learn more about our services?  */}
              Want to learn more about our services? 
              Reach out via phone, email, or LinkedIn, and we'll respond promptly to discuss your needs.
            </p>
            
            <div className="space-y-4">
              <Card className="p-4 bg-background">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  What to Expect
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2 ml-7">
                  <li>• Initial feasibility discussion</li>
                  <li>• Site assessment planning</li>
                  {/* <li>• Pilot engagement options</li> */}
                  <li>• Transparent commercial discussion</li>
                </ul>
              </Card>

              <Card className="p-4 bg-background">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Response Time
                </h4>
                <p className="text-sm text-muted-foreground ml-7">
                  We typically respond within 24-48 hours to all inquiries.
                </p>
              </Card>
            </div>

            {/* <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                <strong>Pilot engagements are limited.</strong> Contact us early to secure a slot that works for your timeline.
              </p>
            </div> */}
          </Card>

          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <a
                href="tel:+919654129577"
                className="group flex items-start gap-4 -m-2 p-2 rounded-lg hover:bg-muted/60 transition-colors"
              >
                <div className="p-3 bg-primary/10 rounded-lg">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">
                    +91 9654129577
                  </span>
                </div>
              </a>

              <a
                href="mailto:info@ilagreen.com"
                className="group flex items-start gap-4 -m-2 p-2 rounded-lg hover:bg-muted/60 transition-colors"
              >
                <div className="p-3 bg-primary/10 rounded-lg">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <span className="text-muted-foreground group-hover:text-primary transition-colors break-all">
                    info@ilagreen.com
                  </span>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/ilagreen/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 -m-2 p-2 rounded-lg hover:bg-muted/60 transition-colors"
              >
                <div className="p-3 bg-primary/10 rounded-lg">
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">LinkedIn</h4>
                  <span className="text-muted-foreground group-hover:text-primary transition-colors break-all">
                    linkedin.com/in/ilagreen
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Location</h4>
                  <p className="text-muted-foreground">
                    Delhi NCR, India
                  </p>
                </div>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <img src="/Logo.png" alt="Ila Green" className="w-32 h-32 object-contain" />
            </a>
            <p className="text-sm text-muted-foreground max-w-md mb-4">
              Execution-led waste audits and ESG reporting for organisations. Reducing landfill burden through measured action.
              {/* Execution-led waste audits and ESG reporting for Delhi NCR organisations. 
              Reducing landfill burden through measured action. */}
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:+919654129577" className="flex items-center gap-2 hover:text-primary transition-colors">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 9654129577
              </a>
              <a href="mailto:info@ilagreen.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@ilagreen.com
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>On-Site Waste Audits</li>
              <li>Structured Segregation</li>
              <li>Verified Recycling</li>
              <li>ESG/CSR Reporting</li>
              {/* <li>Pilot Engagements</li> */}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-primary transition-colors">Why ILA Green</button></li>
              <li><button onClick={() => document.getElementById('process')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-primary transition-colors">How We Work</button></li>
              {/* <li><button onClick={() => document.getElementById('pilot')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-primary transition-colors">Pilot Engagements</button></li> */}
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-primary transition-colors">Contact</button></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t space-y-3">
          <div className="text-xs text-muted-foreground bg-muted/30 p-4 rounded-lg">
            <p className="font-semibold mb-1">Important Disclaimer:</p>
            <p>
              ESG and CSR impact figures are project-specific, based on on-ground measurement and verified processing data. 
              Outcomes may vary by site and operations. ILA Green does not handle e-waste.
            </p>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <p data-testid="text-copyright">
              &copy; {currentYear} ILA Green. All rights reserved. Delhi NCR, India.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  useEffect(() => {
    // Jump instantly rather than animate: an in-progress smooth scroll can be
    // stalled by the metrics count-up reflowing text in the sections it scrolls past.
    if (window.location.hash) {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ImpactIntroSection />
        <WhyIlaGreenSection />
        <WhoWeWorkWithSection />
        {/* <WhyChooseSection /> */}
        <ProcessSection />
        {/* <PilotEngagementSection /> */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
