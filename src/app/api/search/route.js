import { NextResponse } from "next/server";
import { getContentIndexer } from "../../_components/utils/contentIndexer";

let searchIndexCache = null;
let lastCacheTime = null;
const CACHE_DURATION = 10 * 60 * 1000;

async function getSearchIndex() {
  const now = Date.now();
  if (!searchIndexCache || !lastCacheTime || now - lastCacheTime > CACHE_DURATION) {
    const indexer = getContentIndexer();
    searchIndexCache = await indexer.buildSearchIndex();
    lastCacheTime = now;
  }

  return searchIndexCache;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const type = searchParams.get("type");
    const limit = Number.parseInt(searchParams.get("limit") || "20", 10);

    const index = await getSearchIndex();
    const indexer = getContentIndexer();

    if (!query.trim()) {
      const recentContent = index
        .filter((item) => item.type === "blog")
        .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
        .slice(0, 10);

      return NextResponse.json({
        success: true,
        query: "",
        results: recentContent,
        totalResults: recentContent.length,
        indexSize: index.length,
        timestamp: new Date().toISOString(),
      });
    }

    const results = indexer.searchContent(query, {
      type,
      limit: Number.isFinite(limit) ? limit : 20,
    });

    return NextResponse.json({
      success: true,
      query,
      results,
      totalResults: results.length,
      indexSize: index.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Search API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Search API error",
        query: "",
        results: [],
        totalResults: 0,
      },
      { status: 500 },
    );
  }
}
