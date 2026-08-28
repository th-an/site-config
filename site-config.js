// Central Route Registry for Google Site Embeds
// Maintain all subpage paths in one place for instant site-wide updates

window.GLOBAL_SITE_BASE = "https://sites.google.com/view/s-agenticaiexplorer";

window.SITE_CONFIG = {
  base: "https://sites.google.com/view/s-agenticaiexplorer",
  routes: {
    home: "/home",
    projects: "/projects",
    architecture: "/architecture",
    lessonsLearnt: "/lessons-learnt",
    mcp: "/projects/mcp",

    cryptoTax: "/projects/mcp/crypto-tax-mcp",
    cryptoTaxMCP: "/projects/mcp/crypto-tax-mcp",
    cryptoTaxArch: "/architecture/a-crypto-mcp",

    csrdBafin: "/projects/mcp/csrdbafin-compliant-mcp",
    csrdBafinMCP: "/projects/mcp/csrdbafin-compliant-mcp",
    csrdBafinArch: "/architecture/a-csrd-bafin-mcp",
    csrdArch: "/architecture/a-csrd-mcp",

    // Lessons Learned paths (verify these exist on your Google Site)
    cryptoTaxLessons: "/lessons-learnt/l-crypto-tax",
    csrdLessons: "/lessons-learnt/l-csrd",
    csrdLessonsShort: "/lessons-learnt/l-csrd-mcp",
  }
};