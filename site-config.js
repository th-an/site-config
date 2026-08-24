// Central Route Registry for Google Site Embeds
// Maintain all subpage paths in one place for instant site-wide updates

window.SITE_CONFIG = {
  base: "https://sites.google.com/view/s-agenticaiexplorer",
  routes: {
    // 1. Main Hubs
    home: "/home",
    projects: "/projects",
    architecture: "/architecture",
    lessonsLearnt: "/projects/lessons-learnt",
    mcp: "/projects/mcp",

    // 2. Feature Inventories
    cryptoTax: "/projects/mcp/crypto-tax-mcp",
    cryptoTaxMCP: "/projects/mcp/crypto-tax-mcp",

    // 3. Architecture Deep Dives
    cryptoTaxArch: "/architecture/a-crypto-mcp",
    csrdArch: "/architecture/a-csrd-mcp",
    doraArch: "/architecture/a-dora-mcp",
    estateArch: "/architecture/a-estate-mcp",
    tisaxArch: "/architecture/a-tisax-mcp",

    // 4. Lessons Learnt & Retrospectives
    cryptoTaxLessons: "/projects/lessons-learnt/l-crypto-tax",
    csrdLessons: "/projects/lessons-learnt/l-csrd",
    doraLessons: "/projects/lessons-learnt/l-dora",
    estateLessons: "/projects/lessons-learnt/l-estate",
    tisaxLessons: "/projects/lessons-learnt/l-tisax"
  }
};