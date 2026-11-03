module.exports = {
    getToolAdvice: (query) => {
        if (query.includes("ban")) return "Suggested Tool: WA-Void-Strike (Mass Report Engine)";
        if (query.includes("hack")) return "Suggested Tool: Session-Hijack v2.1";
        if (query.includes("ddos")) return "Suggested Tool: Layer 7 Flood Bot";
        return "Searching dark-web database for relevant exploit...";
    }
};
